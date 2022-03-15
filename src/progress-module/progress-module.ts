import { RandomNumberScene } from './scenes/random-number.scene';
import { ProgressUpdate } from './progress.update';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        ProgressUpdate, RandomNumberScene
    ]
})
export class ProgressModule {}
