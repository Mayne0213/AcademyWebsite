import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    console.log('OMR API 호출 시작');
    
    const formData = await request.formData();
    console.log('FormData 파싱 완료');
    
    const imageFile = formData.get('image') as File;
    const correctAnswersStr = formData.get('correctAnswers') as string;
    const questionScoresStr = formData.get('questionScores') as string;
    const questionTypesStr = formData.get('questionTypes') as string;
    
    console.log('받은 데이터:');
    console.log('- imageFile:', imageFile?.name, imageFile?.size);
    console.log('- correctAnswers 길이:', correctAnswersStr?.length);
    console.log('- questionScores 길이:', questionScoresStr?.length);
    console.log('- questionTypes 길이:', questionTypesStr?.length);
    
    // JSON 파싱 시도
    let correctAnswers, questionScores, questionTypes;
    try {
      correctAnswers = JSON.parse(correctAnswersStr);
      questionScores = JSON.parse(questionScoresStr);
      questionTypes = JSON.parse(questionTypesStr);
      console.log('JSON 파싱 성공');
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      console.error('correctAnswers 원본:', correctAnswersStr);
      console.error('questionScores 원본:', questionScoresStr);
      console.error('questionTypes 원본:', questionTypesStr);
      return NextResponse.json(
        { success: false, message: `JSON 파싱 실패: ${parseError}` },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: '이미지 파일이 필요합니다' },
        { status: 400 }
      );
    }

    // 임시 파일로 저장
    const tempDir = '/tmp';
    const tempImagePath = path.join(tempDir, `omr_${Date.now()}_${imageFile.name}`);
    
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      
      await writeFile(tempImagePath, buffer);
      console.log('임시 이미지 파일 저장 완료:', tempImagePath);

      // Python 스크립트 실행
      const scriptPath = path.join(process.cwd(), 'scripts', 'omr_grading.py');
      console.log('Python 스크립트 경로:', scriptPath);
      
      const command = `python3 "${scriptPath}" "${tempImagePath}" '${JSON.stringify(correctAnswers)}' '${JSON.stringify(questionScores)}' '${JSON.stringify(questionTypes)}'`;
      console.log('실행할 명령어:', command);
      
      const { stdout, stderr } = await execAsync(command);
      
      console.log('Python 스크립트 stdout:', stdout);
      if (stderr) {
        console.error('Python 스크립트 stderr:', stderr);
      }

      if (stderr) {
        return NextResponse.json(
          { success: false, message: stderr },
          { status: 500 }
        );
      }

      // Python 스크립트 결과 파싱
      let result;
      try {
        result = JSON.parse(stdout);
        console.log('Python 결과 파싱 성공:', result);
      } catch (parseError) {
        console.error('Python 결과 파싱 실패:', parseError);
        console.error('Python stdout 원본:', stdout);
        return NextResponse.json(
          { success: false, message: `Python 결과 파싱 실패: ${parseError}` },
          { status: 500 }
        );
      }

      if (result.error) {
        return NextResponse.json(
          { success: false, message: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data: result });

    } finally {
      // 임시 파일 삭제
      try {
        await fs.unlink(tempImagePath);
        console.log('임시 파일 삭제 완료');
      } catch (cleanupError) {
        console.error('임시 파일 삭제 실패:', cleanupError);
      }
    }

  } catch (error) {
    console.error('OMR API 전체 오류:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: '잘못된 JSON 형식입니다' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'OMR 채점 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}