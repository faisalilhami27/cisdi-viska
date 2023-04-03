require('dotenv').config();

const createValidator = () => {
  const accumulator = [];
  return {
    assertEnv: (key) => {
      if (typeof process.env[key] !== 'string') {
        accumulator.push(key);
      }
    },
    validate: () => {
      if (accumulator.length === 0) {
        return;
      }
      console.log(`missing environment ${accumulator} in ${__filename}`);
      process.exit();
    },
  };
};
// Check required environment
module.exports = () => {
  const { assertEnv, validate } = createValidator();
  assertEnv('PORT');
  assertEnv('NODE_ENV');
  assertEnv('APP_ENV');
  assertEnv('DB_HOST');
  assertEnv('DB_PORT');
  assertEnv('DB_USERNAME');
  assertEnv('DB_PASSWORD');
  assertEnv('DB_NAME');
  assertEnv('DB_DIALECT');
  assertEnv('SENTRY_ENVIRONMENT');
  assertEnv('ACCESS_KEY_ID');
  assertEnv('SECRET_ACCESS_KEY');
  assertEnv('REGION');
  assertEnv('BUCKET_NAME');
  assertEnv('S3_URL');
  assertEnv('JWT_SECRET');
  validate();
  return true;
};
