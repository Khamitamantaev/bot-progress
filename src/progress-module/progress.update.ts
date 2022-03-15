import { Command, Ctx, Hears, Start, Update, Sender } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { Context } from '../interfaces/context.interface';
import { CHANGE_PROFESSION } from '../app.contants';
import { UpdateType } from '../common/decorators/update-type.decorator';
import { SceneContext } from 'telegraf/typings/scenes/context';

@Update()
export class ProgressUpdate {

  @Start()
  onStart(): string {
    return 'Привет! Меня зовут Прогресс и я хочу помочь вам с выбором профессии \n Напишите Привет, чтобы я понимал, что вы здесь.';
  }

  @Hears(['Привет', 'Здравствуйте', 'Салам'])
  async onGreetings(
     @UpdateType() updateType: TelegrafUpdateType,
     @Sender('first_name') firstName: string,
     @Ctx() context: SceneContext
   ): Promise<void> {
     await context.scene.enter(CHANGE_PROFESSION)
   }

  // @Command('profi')
  // async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
  //   await ctx.scene.enter(CHANGE_PROFESSION);
  // }
}