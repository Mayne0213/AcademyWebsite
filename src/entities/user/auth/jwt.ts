import jwt from "jsonwebtoken";

// JWT Settings
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  EXPIRES_IN: "7d", // 7 days
  REFRESH_EXPIRES_IN: "30d", // 30 days
  
  // Generate token
  generateToken: (payload: { memberId: number; role: string }) => {
    return jwt.sign(payload, JWT_CONFIG.SECRET, {
      expiresIn: JWT_CONFIG.EXPIRES_IN,
    });
  },
  
  // Verify token
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_CONFIG.SECRET) as {
        memberId: number;
        role: string;
        iat: number;
        exp: number;
      };
    } catch (error) {
      return null;
    }
  },
  
  // Generate refresh token
  generateRefreshToken: (payload: { memberId: number; role: string }) => {
    return jwt.sign(payload, JWT_CONFIG.SECRET, {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRES_IN,
    });
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    const decoded = JWT_CONFIG.verifyToken(token);
    if (!decoded) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  },

  // Check if token should be refreshed
  shouldRefreshToken: (token: string): boolean => {
    const decoded = JWT_CONFIG.verifyToken(token);
    if (!decoded) return false;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - now;
    const refreshThreshold = 60 * 60; // Refresh 1 hour before expiry

    return timeUntilExpiry < refreshThreshold;
  },
} as const; 