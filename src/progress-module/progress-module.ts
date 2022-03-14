import { RandomNumberScene } from './scenes/random-number.scene';
import { ProgressUpdate } from './progress.update';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        ProgressUpdate, RandomNumberScene
    ]
})
export class ProgressModule {}
