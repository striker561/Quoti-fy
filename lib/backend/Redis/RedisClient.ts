import Redis from "ioredis";

export class RedisClient {
  private redis_url: string;
  private redis_client: Redis | null;

  constructor(redis_url: string) {
    this.redis_url = redis_url;
    this.redis_client = null;
  }

  async connect() {
    if (!this.redis_client) {
      this.redis_client = new Redis(this.redis_url);
    }
  }

  async disconnect() {
    if (this.redis_client) {
      this.redis_client.disconnect();
      this.redis_client = null;
    }
  }

  async get(
    key: string,
    defaultTo: string | null = null
  ): Promise<string | null> {
    try {
      if (!this.redis_client) return defaultTo;
      const value = await this.redis_client.get(key);
      return value ?? defaultTo;
    } catch (error) {
      console.error(`Redis GET error: ${error}`);
      return defaultTo;
    }
  }

  async set(
    key: string,
    value: string,
    ex?: number
  ): Promise<boolean> {
    try {
      if (!this.redis_client) return false;

      if (ex) {
        await this.redis_client.set(key, value, "EX", ex);
      } else {
        await this.redis_client.set(key, value);
      }

      return true;
    } catch (error) {
      console.error(`Redis SET error: ${error}`);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      if (!this.redis_client) return false;
      const result = await this.redis_client.del(key);
      return result > 0;
    } catch (error) {
      console.error(`Redis DEL error: ${error}`);
      return false;
    }
  }

  async incr(key: string): Promise<number | null> {
    try {
      if (!this.redis_client) return null;
      const newValue = await this.redis_client.incr(key);
      return newValue;
    } catch (error) {
      console.error(`Redis INCR error: ${error}`);
      return null;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!this.redis_client) return false;
      const result = await this.redis_client.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`Redis EXISTS error: ${error}`);
      return false;
    }
  }
}
