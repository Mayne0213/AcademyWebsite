import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const imageFile = formData.get('image') as File;
    const correctAnswers = formData.get('correctAnswers') as string;
    const questionScores = formData.get('questionScores') as string;
    const questionTypes = formData.get('questionTypes') as string;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: '이미지 파일이 필요합니다' },
        { status: 400 }
      );
    }

    // JSON 파싱 검증
    let parsedCorrectAnswers, parsedQuestionScores, parsedQuestionTypes;
    
    try {
      parsedCorrectAnswers = JSON.parse(correctAnswers);
      parsedQuestionScores = JSON.parse(questionScores);
      parsedQuestionTypes = JSON.parse(questionTypes);
    } catch (parseError) {
      console.error('FormData 파싱 오류:', parseError);
      return NextResponse.json(
        { success: false, message: '잘못된 데이터 형식입니다' },
        { status: 400 }
      );
    }

    // 임시 파일로 저장
    const tempDir = '/tmp';
    const tempImagePath = path.join(tempDir, `omr_${Date.now()}_${imageFile.name}`);
    
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      
      await writeFile(tempImagePath, buffer);

      // Python 스크립트 실행 - JSON 문자열을 직접 전달
      const scriptPath = path.join(process.cwd(), 'scripts', 'omr_grading.py');
      
      // JSON 문자열을 그대로 전달 (Python에서 json.loads로 파싱)
      const command = `python3 "${scriptPath}" "${tempImagePath}" '${correctAnswers}' '${questionScores}' '${questionTypes}'`;
      
      console.log('실행할 명령어:', command);
      
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        console.error('Python 스크립트 stderr:', stderr);
      }

      if (stderr && stderr.trim() !== '') {
        return NextResponse.json(
          { success: false, message: `Python 스크립트 오류: ${stderr}` },
          { status: 500 }
        );
      }

      // Python 스크립트 결과 파싱
      let result;
      try {
        result = JSON.parse(stdout);
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