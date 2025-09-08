'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, Play, Pause, Download, Scissors, Volume2, VolumeX } from 'lucide-react';

interface AudioSegment {
  startTime: number;
  endTime: number;
  questionNumber: number;
  blob?: Blob;
}

export default function ListeningPage() {
  const [mode, setMode] = useState<'split' | 'merge'>('split');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [segments, setSegments] = useState<AudioSegment[]>([]);
  const [currentSegment, setCurrentSegment] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [silenceThreshold, setSilenceThreshold] = useState(0.01);
  const [minSilenceDuration, setMinSilenceDuration] = useState(1.0);
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mergeFileInputRef = useRef<HTMLInputElement>(null);

  // 오디오 파일 업로드 처리
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setSegments([]);
      setCurrentSegment(null);
    } else {
      alert('MP3 파일만 업로드 가능합니다.');
    }
  }, []);

  // 무음 감지 및 오디오 분할
  const processAudio = useCallback(async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    try {
      // AudioContext 생성
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // 파일을 ArrayBuffer로 읽기
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // 오디오 데이터 분석
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      const duration = audioBuffer.duration;
      
      // 무음 구간 찾기
      const silencePoints = findSilencePoints(channelData, sampleRate, silenceThreshold, minSilenceDuration);
      
      // 17개 문제로 분할
      const newSegments = createSegments(silencePoints, duration);
      setSegments(newSegments);
      
    } catch (error) {
      console.error('오디오 처리 중 오류:', error);
      alert('오디오 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  }, [audioFile, silenceThreshold, minSilenceDuration]);

  // 무음 구간 찾기 함수
  const findSilencePoints = (
    channelData: Float32Array, 
    sampleRate: number, 
    threshold: number, 
    minDuration: number
  ): number[] => {
    const silencePoints: number[] = [];
    const minSilenceSamples = Math.floor(minDuration * sampleRate);
    let silenceStart = -1;
    
    for (let i = 0; i < channelData.length; i++) {
      const amplitude = Math.abs(channelData[i]);
      
      if (amplitude < threshold) {
        if (silenceStart === -1) {
          silenceStart = i;
        }
      } else {
        if (silenceStart !== -1) {
          const silenceLength = i - silenceStart;
          if (silenceLength >= minSilenceSamples) {
            silencePoints.push(silenceStart / sampleRate);
          }
          silenceStart = -1;
        }
      }
    }
    
    return silencePoints;
  };

  // 세그먼트 생성 함수 (무음 구간에 따라 분할 후 무음 제거)
  const createSegments = (silencePoints: number[], duration: number): AudioSegment[] => {
    const segments: AudioSegment[] = [];
    let currentStart = 0;
    let questionNumber = 1;
    
    // 무음 구간을 기점으로 분할
    for (const silencePoint of silencePoints) {
      // 최소 5초 이상의 세그먼트만 생성 (너무 짧은 구간 제외)
      if (silencePoint - currentStart >= 5) {
        segments.push({
          startTime: currentStart,
          endTime: silencePoint,
          questionNumber: questionNumber
        });
        currentStart = silencePoint;
        questionNumber++;
      }
    }
    
    // 마지막 세그먼트 추가 (마지막 무음 구간 이후 ~ 파일 끝)
    if (duration - currentStart >= 5) {
      segments.push({
        startTime: currentStart,
        endTime: duration,
        questionNumber: questionNumber
      });
    }
    
    // 첫 번째 세그먼트를 제외하고 나머지 세그먼트들에서 앞부분 무음 제거
    const processedSegments = segments.map((segment, index) => {
      if (index === 0) {
        // 첫 번째 세그먼트는 그대로 유지
        return segment;
      } else {
        // 나머지 세그먼트들에서 앞부분 무음 제거
        const adjustedStartTime = segment.startTime + minSilenceDuration;
        return {
          ...segment,
          startTime: adjustedStartTime
        };
      }
    });
    
    return processedSegments;
  };

  // 세그먼트 재생
  const playSegment = useCallback((segmentIndex: number) => {
    if (!audioRef.current || !segments[segmentIndex]) return;
    
    const segment = segments[segmentIndex];
    audioRef.current.currentTime = segment.startTime;
    audioRef.current.play();
    setCurrentSegment(segmentIndex);
    setIsPlaying(true);
  }, [segments]);

  // 재생 중지
  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSegment(null);
  }, []);

  // 세그먼트 다운로드
  const downloadSegment = useCallback(async (segmentIndex: number) => {
    if (!audioFile || !segments[segmentIndex]) return;
    
    const segment = segments[segmentIndex];
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    
    try {
      // 원본 오디오 파일을 다시 로드
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // 세그먼트에 해당하는 부분만 추출
      const startSample = Math.floor(segment.startTime * audioBuffer.sampleRate);
      const endSample = Math.floor(segment.endTime * audioBuffer.sampleRate);
      const segmentLength = endSample - startSample;
      
      // 새로운 오디오 버퍼 생성
      const newBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        segmentLength,
        audioBuffer.sampleRate
      );
      
      // 채널 데이터 복사
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const originalData = audioBuffer.getChannelData(channel);
        const newData = newBuffer.getChannelData(channel);
        for (let i = 0; i < segmentLength; i++) {
          newData[i] = originalData[startSample + i];
        }
      }
      
      // WAV 파일로 변환하여 다운로드
      const wavBlob = audioBufferToWav(newBuffer);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `문제_${segment.questionNumber}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('세그먼트 다운로드 중 오류:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    }
  }, [audioFile, segments]);

  // AudioBuffer를 WAV Blob으로 변환
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;
    const numberOfChannels = buffer.numberOfChannels;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    // WAV 헤더 작성
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);
    
    // 오디오 데이터 작성
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  // 모든 세그먼트 다운로드
  const downloadAllSegments = useCallback(async () => {
    for (let i = 0; i < segments.length; i++) {
      await downloadSegment(i);
      // 다운로드 간격을 두어 브라우저가 처리할 수 있도록 함
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }, [segments, downloadSegment]);

  // 병합 파일 업로드 처리
  const handleMergeFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const audioFiles = files.filter(file => {
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();
      
      // 파일 확장자와 MIME 타입 모두 확인
      return (
        // WAV 파일 (사파리에서는 MIME 타입이 다를 수 있음)
        fileType === 'audio/wav' || 
        fileType === 'audio/wave' ||
        fileType === 'audio/x-wav' ||
        fileName.endsWith('.wav') ||
        // MP3 파일
        fileType === 'audio/mpeg' || 
        fileType === 'audio/mp3' ||
        fileName.endsWith('.mp3')
      );
    });
    
    if (audioFiles.length === 0) {
      alert('WAV 또는 MP3 파일만 업로드 가능합니다.');
      return;
    }
    
    setMergeFiles(audioFiles);
  }, []);

  // 오디오 파일 병합 및 다운로드 (blank.wav 삽입)
  const mergeAudioFiles = useCallback(async () => {
    if (mergeFiles.length === 0) return;
    
    setIsProcessing(true);
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      // blank.wav 파일 로드
      const blankResponse = await fetch('/main/student/blank.wav');
      const blankArrayBuffer = await blankResponse.arrayBuffer();
      const blankBuffer = await audioContext.decodeAudioData(blankArrayBuffer);
      
      // 모든 오디오 파일을 AudioBuffer로 변환
      const audioBuffers: AudioBuffer[] = [];
      let maxChannels = 0;
      let maxSampleRate = 0;
      
      for (const file of mergeFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
        maxChannels = Math.max(maxChannels, audioBuffer.numberOfChannels);
        maxSampleRate = Math.max(maxSampleRate, audioBuffer.sampleRate);
      }
      
      // blank.wav도 같은 샘플레이트로 리샘플링 (필요시)
      const resampledBlankBuffer = audioContext.createBuffer(
        Math.min(blankBuffer.numberOfChannels, maxChannels),
        Math.floor(blankBuffer.length * maxSampleRate / blankBuffer.sampleRate),
        maxSampleRate
      );
      
      // blank.wav 리샘플링
      for (let channel = 0; channel < resampledBlankBuffer.numberOfChannels; channel++) {
        const sourceData = blankBuffer.getChannelData(Math.min(channel, blankBuffer.numberOfChannels - 1));
        const targetData = resampledBlankBuffer.getChannelData(channel);
        const ratio = blankBuffer.sampleRate / maxSampleRate;
        
        for (let i = 0; i < resampledBlankBuffer.length; i++) {
          const sourceIndex = Math.floor(i * ratio);
          targetData[i] = sourceData[Math.min(sourceIndex, sourceData.length - 1)];
        }
      }
      
      // 총 길이 계산 (원본 파일들 + blank.wav들)
      const totalLength = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0) + 
                         (audioBuffers.length - 1) * resampledBlankBuffer.length;
      
      // 병합된 오디오 버퍼 생성
      const mergedBuffer = audioContext.createBuffer(maxChannels, totalLength, maxSampleRate);
      
      // 각 채널별로 데이터 병합 (blank.wav 삽입)
      let offset = 0;
      for (let i = 0; i < audioBuffers.length; i++) {
        const buffer = audioBuffers[i];
        
        // 원본 파일 데이터 복사
        for (let channel = 0; channel < maxChannels; channel++) {
          const sourceData = buffer.getChannelData(Math.min(channel, buffer.numberOfChannels - 1));
          const targetData = mergedBuffer.getChannelData(channel);
          
          for (let j = 0; j < buffer.length; j++) {
            targetData[offset + j] = sourceData[j];
          }
        }
        offset += buffer.length;
        
        // 마지막 파일이 아니면 blank.wav 삽입
        if (i < audioBuffers.length - 1) {
          for (let channel = 0; channel < maxChannels; channel++) {
            const sourceData = resampledBlankBuffer.getChannelData(Math.min(channel, resampledBlankBuffer.numberOfChannels - 1));
            const targetData = mergedBuffer.getChannelData(channel);
            
            for (let j = 0; j < resampledBlankBuffer.length; j++) {
              targetData[offset + j] = sourceData[j];
            }
          }
          offset += resampledBlankBuffer.length;
        }
      }
      
      // WAV 파일로 변환하여 바로 다운로드
      const wavBlob = audioBufferToWav(mergedBuffer);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged_audio.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('오디오 병합 중 오류:', error);
      alert('오디오 병합 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  }, [mergeFiles]);


  return (
    <main className="flex flex-col p-4"> 
      <div className="flex justify-between items-center mb-8 text-2xl desktop:text-3xl font-sansKR-Bold">
        🎧 리스닝 생성
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 파일 업로드 및 설정 영역 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b flex justify-between items-center bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
            <h2 className="font-sansKR-SemiBold text-base smalltablet:text-lg tablet:text-xl">파일 업로드 및 설정</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setMode('split')}
                className={`px-4 py-2 rounded-lg font-sansKR-Medium transition-colors ${
                  mode === 'split' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                분할
              </button>
              <button
                onClick={() => setMode('merge')}
                className={`px-4 py-2 rounded-lg font-sansKR-Medium transition-colors ${
                  mode === 'merge' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                병합
              </button>
            </div>
          </div>
          <div className="p-6">
          
          {/* 모드 선택 */}
          <div className="mb-6">
          </div>

          {/* 분할 모드 */}
          {mode === 'split' && (
            <>
              {/* 파일 업로드 */}
              <div className="mb-6">
                <label className="block text-sm font-sansKR-Medium text-gray-700 mb-2">
                  MP3 파일 선택
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    {audioFile ? audioFile.name : 'MP3 파일을 선택하거나 드래그하세요'}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </>
          )}

          {/* 병합 모드 */}
          {mode === 'merge' && (
            <>
              {/* 병합 파일 업로드 */}
              <div className="mb-6">
                <label className="block text-sm font-sansKR-Medium text-gray-700 mb-2">
                  WAV/MP3 파일들 선택 (여러 개 선택 가능)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => mergeFileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    {mergeFiles.length > 0 
                      ? `${mergeFiles.length}개 파일 선택됨` 
                      : 'WAV/MP3 파일들을 선택하거나 드래그하세요'
                    }
                  </p>
                </div>
                <input
                  ref={mergeFileInputRef}
                  type="file"
                  accept="audio/wav,audio/wave,audio/x-wav,audio/mpeg,audio/mp3,.wav,.mp3"
                  multiple
                  onChange={handleMergeFileUpload}
                  className="hidden"
                />
              </div>

              {/* 선택된 파일 목록 */}
              {mergeFiles.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-sansKR-Medium text-gray-700 mb-2">
                    선택된 파일들
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {mergeFiles.map((file, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {index + 1}. {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* 분할 모드 설정 옵션 */}
          {mode === 'split' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-sansKR-Medium text-gray-700 mb-2">
                  무음 임계값: {silenceThreshold}
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={silenceThreshold}
                  onChange={(e) => setSilenceThreshold(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  낮을수록 더 작은 소리도 무음으로 인식합니다
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-sansKR-Medium text-gray-700 mb-2">
                  최소 무음 지속시간: {minSilenceDuration}초
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={minSilenceDuration}
                  onChange={(e) => setMinSilenceDuration(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  이 시간보다 긴 무음만 분할점으로 인식합니다 (0.5초 ~ 10초)
                </p>
              </div>
            </div>
          )}

          {/* 처리 버튼 */}
          {mode === 'split' && (
            <button
              onClick={processAudio}
              disabled={!audioFile || isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-sansKR-Medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  처리 중...
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4" />
                  오디오 분할하기
                </>
              )}
            </button>
          )}

          {mode === 'merge' && (
            <button
              onClick={mergeAudioFiles}
              disabled={mergeFiles.length === 0 || isProcessing}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-sansKR-Medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  병합 중...
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4" />
                  오디오 병합하기
                </>
              )}
            </button>
          )}

          {/* 오디오 플레이어 (분할 모드만) */}
          {mode === 'split' && audioUrl && (
            <div className="mt-6">
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                className="w-full"
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}
          </div>
        </div>

        {/* 결과 영역 */}
        {mode === 'split' ? (
          segments.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border h-full">
              <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-sansKR-SemiBold text-base smalltablet:text-lg tablet:text-xl">분할 결과</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      총 {segments.length}개로 분할됨
                    </p>
                  </div>
                  <button
                    onClick={downloadAllSegments}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-sansKR-Medium hover:bg-green-700 flex items-center gap-2 text-sm"
                  >
                    <Download className="h-4 w-4" />
                    전체 다운로드
                  </button>
                </div>
              </div>
              <div className="p-6 h-full flex flex-col">
                <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto min-h-0">
                  {segments.map((segment, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        currentSegment === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-sansKR-Medium text-lg">
                            문제 {segment.questionNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {segment.startTime.toFixed(1)}초 - {segment.endTime.toFixed(1)}초
                            ({(segment.endTime - segment.startTime).toFixed(1)}초)
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => playSegment(index)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            title="재생"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => downloadSegment(index)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            title="다운로드"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border h-full">
              <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
                <h2 className="font-sansKR-SemiBold text-base smalltablet:text-lg tablet:text-xl">분할 결과</h2>
              </div>
              <div className="text-center text-black py-8 h-full flex flex-col justify-center font-sansKR-SemiBold space-y-8">
                <div className="text-5xl">🎧</div>
                <p className='text-2xl'>오디오 파일을 업로드하고 분할 버튼을 클릭하세요</p>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm border h-full">
            <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
              <h2 className="font-sansKR-SemiBold text-base smalltablet:text-lg tablet:text-xl">병합 결과</h2>
            </div>
            <div className="text-center text-black py-8 h-full flex flex-col justify-center font-sansKR-SemiBold space-y-8">
              <div className="text-5xl">🔗</div>
              <p className='text-2xl'>오디오 파일들을 선택하고 병합 버튼을 클릭하세요</p>
              <p className='text-lg text-gray-600'>병합이 완료되면 자동으로 다운로드됩니다</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
