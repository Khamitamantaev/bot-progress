import { ConfigService } from '@nestjs/config';
import { Scene, SceneEnter, SceneLeave, Command, Ctx, Action, Sender } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';
import { CHANGE_PROFESSION } from '../../app.contants';
import { Context } from '../../interfaces/context.interface';

@Scene(CHANGE_PROFESSION)
export class RandomNumberScene {

  constructor(private configService: ConfigService) {

  }

  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    context.reply('Cейчас я хочу уточнить, какая форма обучения для вас предпочтительнее? ', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Очная форма', callback_data: '1' }],
          [{ text: 'Заочная форма', callback_data: '2' }],
          [{ text: 'Выездная', callback_data: '3' }],
        ],
      },
    });
  }

  @Action(/1|2|3/)
  async onAnswer(
    @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
    @Sender('first_name') firstName: string,
    @Sender('last_name') lastName: string,
    @Sender('username') userName: string,
  ) {
    const cbQuery = context.update.callback_query;
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;
    const mainID = process.env.MAIN_ID;
    console.log('mainID: ' + mainID)
    console.log(context.update.callback_query.from)
    switch (userAnswer) {
      case '1':
        context.reply('Вы выбрали очную форму обучения, поздравляю!')

        await context.telegram.sendMessage(mainID, `Пользователь выбрал очную форму обучения \n
        Контактные данные: \n
        Фамилия: ${lastName} \n
        Имя: ${firstName} \n
        Ник: ${userName}
        `)
        context.scene.leave()
        break;
      case '2':
        context.reply('Вы выбрали заочную форму обучения, поздравляю!')
        await context.telegram.sendMessage(mainID, `Пользователь выбрал заочную форму обучения \n
        Контактные данные: \n
        Фамилия: ${lastName} \n
        Имя: ${firstName} \n
        Ник: ${userName}
        `)
        context.scene.leave()
        break;
      case '3':
        context.reply('Вы выбрали выездную форму обучения, поздравляю!')
        await context.telegram.sendMessage(mainID, `Пользователь выбрал выездную форму обучения \n
        Контактные данные: \n
        Фамилия: ${lastName} \n
        Имя: ${firstName} \n
        Ник: ${userName}
        `)
        context.scene.leave()
        break;
    }
  }

  // @SceneLeave()
  // onSceneLeave(): string {
  //   console.log('Leave from scene');
  //   return 'Bye Bye 👋';
  // }

  @Command(['rng', 'random'])
  onRandomCommand(): number {
    console.log('Use "random" command');
    return Math.floor(Math.random() * 11);
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }
}