#!/bin/bash

# RDS 연결 테스트 스크립트
echo "=== RDS 연결 테스트 ==="

# RDS 정보 입력
echo "RDS 정보를 입력해주세요:"
read -p "RDS 엔드포인트: " RDS_HOST
read -p "RDS 포트 (기본값: 3306): " RDS_PORT
RDS_PORT=${RDS_PORT:-3306}
read -p "RDS 사용자명: " RDS_USER
read -s -p "RDS 비밀번호: " RDS_PASSWORD
echo

echo ""
echo "RDS 연결 테스트 중..."

# 연결 테스트
mysql -h $RDS_HOST -P $RDS_PORT -u $RDS_USER -p$RDS_PASSWORD -e "SELECT 1;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ RDS 연결 성공!"
    
    # 데이터베이스 목록 확인
    echo ""
    echo "현재 데이터베이스 목록:"
    mysql -h $RDS_HOST -P $RDS_PORT -u $RDS_USER -p$RDS_PASSWORD -e "SHOW DATABASES;"
    
    # 사용자 권한 확인
    echo ""
    echo "현재 사용자 권한:"
    mysql -h $RDS_HOST -P $RDS_PORT -u $RDS_USER -p$RDS_PASSWORD -e "SHOW GRANTS;"
    
else
    echo "❌ RDS 연결 실패"
    echo "다음을 확인해주세요:"
    echo "1. RDS 엔드포인트가 올바른지 확인"
    echo "2. 보안 그룹에서 현재 IP가 허용되었는지 확인"
    echo "3. 사용자명과 비밀번호가 올바른지 확인"
    echo "4. RDS 인스턴스가 실행 중인지 확인"
fi 