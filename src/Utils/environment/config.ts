import * as dotenv from 'dotenv-flow';
dotenv.config();

const configs = {
    JWT_SECRET : process.env.JWT_SECRET,
    SLAT_ROUND : process.env.SLAT_ROUND,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    DATABASE_NAME:process.env.DATABASE_NAME || '',
    DATABASE_USERNAME:process.env.DATABASE_USERNAME || '',
    DATABASE_PASSWORD:process.env.DATABASE_PASSWORD || '',
    DATABASE_DIALECT:process.env.DATABASE_DIALECT || '',
    EMAIL:process.env.EMAIL,
    EMAIL_PORT:process.env.EMAIL_PORT,
    EMAIL_TLS:process.env.EMAIL_TLS,
    EMAIL_APP_PASSWORD:process.env.EMAIL_APP_PASSWORD,
    EMAIL_HOST:process.env.EMAIL_HOST,
};

export default configs;