import { RedisClient } from "./RedisClient";

let redisInstance: RedisClient | null = null;

export function getRedisClient(): RedisClient {
  if (!redisInstance) {
    redisInstance = new RedisClient(process.env.REDIS_URL!);
    redisInstance.connect();
  }

  return redisInstance;
}
