# OMR Grading Application

Next.js + Python OMR 채점 애플리케이션을 위한 Docker 기반 배포 환경입니다.

## 🚀 Features

- **Next.js Frontend**: React 기반 사용자 인터페이스
- **Python OMR Processing**: OpenCV를 사용한 OMR 채점 엔진
- **MySQL Database**: AWS RDS (프로덕션) / 로컬 MySQL (개발)
- **AWS S3 Integration**: 파일 업로드/다운로드
- **Docker Containerization**: 일관된 배포 환경

## 🏗️ Architecture

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Python        │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (OMR Script)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Static Files  │    │   Database      │    │   File Storage  │
│   (Public)      │    │   (MySQL)       │    │   (AWS S3)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Git**: 코드 버전 관리
- **Node.js**: 18+ (로컬 개발용)
- **Python**: 3.8+ (로컬 개발용)

## 🐳 Quick Start

### 1. 프로젝트 클론
```bash
git clone <your-repository>
cd frontend
```

### 2. 환경변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# 환경변수 편집
nano .env
```

### 3. 도커 실행
```bash
# 프로덕션 환경
docker-compose up -d

# 개발 환경
docker-compose -f docker-compose.dev.yml up -d
```

### 4. 애플리케이션 접속
```text
http://localhost:3000
```

## 🔧 Development

### 로컬 개발 환경
```bash
# 의존성 설치
npm install
pip install -r scripts/requirements.txt

# 개발 서버 실행
npm run dev
```

### 도커 개발 환경
```bash
# 개발용 컨테이너 실행
docker-compose -f docker-compose.dev.yml up -d

# 로그 확인
docker-compose -f docker-compose.dev.yml logs -f app

# 컨테이너 중지
docker-compose -f docker-compose.dev.yml down
```

## 🚀 Production Deployment

### 자동 배포 스크립트 사용
```bash
# 배포 스크립트 실행 권한 부여
chmod +x deploy.sh

# 배포 실행
./deploy.sh
```

### 수동 배포
```bash
# 이미지 빌드
docker-compose build --no-cache

# 컨테이너 실행
docker-compose up -d

# 상태 확인
docker-compose ps
```

## 📁 Project Structure

```text
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API 엔드포인트
│   │   └── omr/           # OMR 채점 API
│   └── ...
├── scripts/                # Python 스크립트
│   ├── omr_grading.py     # OMR 채점 엔진
│   └── requirements.txt    # Python 의존성
├── src/                    # 소스 코드
│   ├── entities/           # 도메인 엔티티
│   ├── features/           # 비즈니스 로직
│   └── shared/             # 공통 유틸리티
├── prisma/                 # 데이터베이스 스키마
├── Dockerfile              # 도커 이미지 빌드
├── docker-compose.yml      # 프로덕션 환경
├── docker-compose.dev.yml  # 개발 환경
└── deploy.sh               # 배포 자동화
```

## 🔐 Environment Variables

### 필수 환경변수
```bash
# 데이터베이스
DATABASE_URL="mysql://username:password@host:port/database"

# JWT 인증
JWT_SECRET="your-secret-key"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET_NAME="your-bucket-name"
AWS_S3_BUCKET_URL="https://your-bucket.s3.region.amazonaws.com"
```

### 개발 환경 추가 변수
```bash
# 로컬 MySQL
MYSQL_DATABASE=AcademyDB
MYSQL_USER=root
MYSQL_PASSWORD=your-password
MYSQL_ROOT_PASSWORD=your-root-password
```

## 🐳 Docker Commands

### 컨테이너 관리
```bash
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f app

# 컨테이너 재시작
docker-compose restart app

# 컨테이너 중지
docker-compose down
```

### 이미지 관리
```bash
# 이미지 목록
docker images

# 이미지 삭제
docker rmi omr-grading-app:latest

# 이미지 히스토리
docker history omr-grading-app:latest
```

### 볼륨 관리
```bash
# 볼륨 목록
docker volume ls

# 볼륨 삭제
docker volume rm frontend_mysql_data_dev
```

## 🔍 Troubleshooting

### 일반적인 문제들

#### 1. 포트 충돌
```bash
# 포트 사용 확인
lsof -i :3000

# 다른 포트 사용
docker-compose up -d -p 3001:3000
```

#### 2. 권한 문제
```bash
# 도커 그룹에 사용자 추가
sudo usermod -aG docker $USER

# 로그아웃 후 재로그인
```

#### 3. 메모리 부족
```bash
# 도커 메모리 제한 확인
docker stats

# 도커 데몬 재시작
sudo systemctl restart docker
```

### 로그 확인
```bash
# 애플리케이션 로그
docker-compose logs app

# 데이터베이스 로그
docker-compose logs db

# 실시간 로그
docker-compose logs -f
```

## 📊 Monitoring

### 헬스 체크
```bash
# 애플리케이션 상태 확인
curl http://localhost:3000/api/health

# 데이터베이스 연결 확인
docker-compose exec db mysql -u root -p -e "SELECT 1"
```

### 리소스 사용량
```bash
# 컨테이너 리소스 사용량
docker stats

# 시스템 리소스
htop
```

## 🔄 CI/CD

### GitHub Actions (선택사항)
```yaml
# .github/workflows/deploy.yml
name: Deploy to EC2
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to EC2
        run: |
          # 배포 스크립트 실행
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenCV Python Documentation](https://docs.opencv.org/4.x/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
