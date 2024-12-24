import { Module } from '@nestjs/common';
import { PaymentModule } from './payments/infrastructure/config/payment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'client/dist'),
    }),
    PaymentModule,
  ],
  providers: [],
})
export class AppModule {}
