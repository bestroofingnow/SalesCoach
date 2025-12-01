/**
 * Environment Variable Validator
 * Validates that all required environment variables are set on application startup
 * Fails fast with clear error messages if configuration is missing
 */

interface EnvConfig {
  required: string[];
  optional: string[];
}

const envConfig: EnvConfig = {
  required: [
    'DATABASE_URL',
    'JWT_SECRET',
  ],
  optional: [
    'OPENAI_API_KEY',
    'OPEN_AI_BRN_ASST',
    'VAPI_API_KEY',
    'PUBLIC_OBJECT_SEARCH_PATHS',
    'PRIVATE_OBJECT_DIR',
    'PORT',
    'NODE_ENV',
    'ALLOWED_ORIGINS',
  ],
};

export function validateEnvironment(): void {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const key of envConfig.required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  // Check optional but important variables
  if (!process.env.OPENAI_API_KEY && !process.env.OPEN_AI_BRN_ASST) {
    warnings.push('OPENAI_API_KEY: AI features will not work without this');
  }

  if (!process.env.VAPI_API_KEY) {
    warnings.push('VAPI_API_KEY: Voice training features will not work without this');
  }

  if (!process.env.PUBLIC_OBJECT_SEARCH_PATHS) {
    warnings.push('PUBLIC_OBJECT_SEARCH_PATHS: Public file storage will not work');
  }

  if (!process.env.PRIVATE_OBJECT_DIR) {
    warnings.push('PRIVATE_OBJECT_DIR: Private file storage will not work');
  }

  // Validate JWT_SECRET strength (if set)
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET: Should be at least 32 characters for security. Generate with: openssl rand -hex 32');
  }

  // Report results
  if (missing.length > 0) {
    console.error('❌ FATAL: Missing required environment variables:');
    missing.forEach(key => {
      console.error(`   - ${key}`);
    });
    console.error('\nPlease set these variables in your .env file.');
    console.error('See .env.example for reference.\n');
    throw new Error('Missing required environment variables');
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Warning: Optional environment variables not set:');
    warnings.forEach(warning => {
      console.warn(`   - ${warning}`);
    });
    console.warn('Some features may not work correctly.\n');
  }

  // Log successful validation
  console.log('✅ Environment variables validated successfully');
  console.log(`   - Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   - Database: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}`);
  console.log(`   - JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
  console.log('');
}

/**
 * Get environment variable with type safety and default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set and no default provided`);
  }
  return value || defaultValue!;
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if we're in development environment
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
}
