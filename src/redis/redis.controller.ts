import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisSubscriberService } from './redis-subs.service';

@Controller('redis')
export class RedisController {
    constructor(
        private readonly redisService: RedisService,
        private readonly redisSubscriberService: RedisSubscriberService
    ) {}

    // Endpoint untuk menyimpan data di Redis
    @Post('set')
    async setKeyValue(@Body('key') key: string, @Body('value') value: string): Promise<any> {
        const result = await this.redisService.setValue(key, value);
        console.log(result);
        
        return {
            method: 'SET',
            [key]: value 
        }
    }

    // Endpoint untuk mengambil data dari Redis
    @Get('get/:key')
    async getKeyValue(@Param('key') key: string): Promise<any> {
        const value = await this.redisService.getValue(key);
        console.log(value);
        
        return {
            method: 'GET',
            [key]: value 
        }
    }

    @Post('publish')
    async publishMessage(
        @Body('channel') channel: string,
        @Body('message') message: string,
    ): Promise<string> {
        await this.redisSubscriberService.publishMessage(channel, message);
        return `Message "${message}" published to channel "${channel}"`;
    }

}
