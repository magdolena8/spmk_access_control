import { Module, DynamicModule } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingModuleOptions } from './messaging-module-options.interface';

@Module({})
export class MessagingModule {
  static register(options: MessagingModuleOptions): DynamicModule {
    return {
      module: MessagingModule,
      providers: [
        {
          provide: 'MESSAGING_OPTIONS',
          useValue: options,
        },
        {
          provide: MessagingService,
          useFactory: (options: MessagingModuleOptions) => {
            return new MessagingService(options);
          },
          inject: ['MESSAGING_OPTIONS'],
        },
      ],
      exports: [MessagingService],
    };
  }
}
