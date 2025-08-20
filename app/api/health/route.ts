import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - 서버가 응답하는지 확인
    return NextResponse.json(
      { 
        success: true, 
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Health check failed' 
      },
      { status: 500 }
    );
  }
}
