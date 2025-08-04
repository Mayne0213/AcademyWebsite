// Cookie settings
export const COOKIE_CONFIG = {
  // Default cookie options
  DEFAULT_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // Token cookie names
  TOKEN_NAME: "token",
  REFRESH_TOKEN_NAME: "refreshToken",
  
  // Extract token from cookies
  extractTokenFromCookies: (cookieHeader: string | null) => {
    if (!cookieHeader) return null;
    
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [name, ...rest] = cookie.split("=");
        return [name, rest.join("=")];
      })
    );
    
    return cookies[COOKIE_CONFIG.TOKEN_NAME] || null;
  },
} as const; 