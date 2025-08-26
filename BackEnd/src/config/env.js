import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    NODE_ENV : process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY : process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY : process.env.CLERK_PUBLISHABLE_KEY,
    STREAM_API_KEY : process.env.STREAM_API_KEY,
    STREAM_API_SECRETE : process.env.STREAM_API_SECRETE,
    SENTRY_DSN : process.env.SENTRY_DSN,
    INNGEST_EVENT_KEY : process.env.INNGEST_EVENT_KEY,
    INNGEST_SINGING_KEY : process.env.INNGEST_SINGING_KEY,
}