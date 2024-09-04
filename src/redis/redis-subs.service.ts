import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisSubscriberService implements OnModuleInit {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        @Inject('REDIS_PUBLISHER_CLIENT') private readonly publisher: Redis,
    ) {}

    onModuleInit() {
        this.redis.subscribe('test', (err, count) => {
            if (err) {
                console.error('Failed to subscribe: ', err.message);
            } else {
                console.log(`Subscribed successfully! This client is currently subscribed to ${count} channel(s).`);
            }
        });

        this.redis.on('message', (channel, message) => {
            console.log(`Received message from ${channel}: ${message}`);
            // Lakukan sesuatu dengan pesan tersebut
        });
    }

    // Method untuk publish pesan ke channel
    async publishMessage(channel: string, message: string) {
        await this.publisher.publish(channel, message);
    }
}
