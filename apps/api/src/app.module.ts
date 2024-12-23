import { Module } from '@nestjs/common';
import { PaymentModule } from './payments/infrastructure/config/payment.module';

@Module({
  imports: [PaymentModule],
  providers: [],
})
export class AppModule {}
