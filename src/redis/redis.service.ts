import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) {}

    async setValue(key: string, value: string) {
        await this.redis.set(key, value);
    }

    async getValue(key: string): Promise<string> {
        return await this.redis.get(key);
    }
}
