import { PrismaClient } from "@/lib/generated/prisma";

// 데이터베이스 연결 설정
export const DATABASE_CONFIG = {
  // 기본 연결 설정
  CONNECTION_LIMIT: 5,
  POOL_TIMEOUT: 20,
  
  // 연결 URL 구성
  getConnectionUrl: () => {
    const baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    return `${baseUrl}?connection_limit=${DATABASE_CONFIG.CONNECTION_LIMIT}&pool_timeout=${DATABASE_CONFIG.POOL_TIMEOUT}`;
  },
  
  // 환경별 설정
  ENVIRONMENTS: {
    DEVELOPMENT: {
      logQueries: true,
      logErrors: true,
    },
    PRODUCTION: {
      logQueries: false,
      logErrors: true,
    },
    TEST: {
      logQueries: false,
      logErrors: false,
    },
  },
} as const;

// Prisma 클라이언트 설정
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 클라이언트 인스턴스 생성
export const createPrismaClient = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  
  const client = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_CONFIG.getConnectionUrl(),
      },
    },
    log: isDevelopment ? ["query", "error", "warn"] : ["error"],
  });

  // 개발 환경에서만 글로벌에 저장
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
};

// 기본 Prisma 클라이언트 인스턴스
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// 데이터베이스 연결 상태 확인
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
};

// 데이터베이스 연결 해제
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
  }
};

// 트랜잭션 헬퍼 함수
export const withTransaction = async <T>(
  callback: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>
): Promise<T> => {
  return await prisma.$transaction(callback);
};

// 데이터베이스 마이그레이션 상태 확인
export const checkMigrationStatus = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    return { success: true, message: "Database is ready" };
  } catch (error) {
    return { 
      success: false, 
      message: "Database migration may be needed",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// 데이터베이스 통계 정보
export const getDatabaseStats = async () => {
  try {
    const stats = {
      users: await prisma.user.count(),
      students: await prisma.student.count(),
      academies: await prisma.academy.count(),
      announcements: await prisma.announcement.count(),
    };
    
    return { success: true, stats };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}; 