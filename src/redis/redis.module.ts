import { Module, Global } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisSubscriberService } from './redis-subs.service';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: 'redis-15795.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com',  // Alamat host Redis
                    port: 15795,         // Port Redis
                    password: 'mgArZpikOaOKfNzAJwYzYOP16TMw9KHr',
                });
            },
        },
        {
            provide: 'REDIS_PUBLISHER_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: 'redis-15795.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com',  // Alamat host Redis
                    port: 15795,         // Port Redis
                    password: 'mgArZpikOaOKfNzAJwYzYOP16TMw9KHr', // Jika ada
                });
            },
        },
        RedisSubscriberService, RedisService,
    ],
    exports: ['REDIS_CLIENT', 'REDIS_PUBLISHER_CLIENT', RedisSubscriberService, RedisService],

    controllers: [RedisController],
})
export class RedisModule {}
