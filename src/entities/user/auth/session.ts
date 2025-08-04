// Session configuration
export const SESSION_CONFIG = {
  // Session timeout (milliseconds)
  TIMEOUT: 30 * 60 * 1000, // 30 minutes
  
  // Auto logout time
  AUTO_LOGOUT_TIME: 24 * 60 * 60 * 1000, // 24 hours
  
  // Session refresh interval
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const; 