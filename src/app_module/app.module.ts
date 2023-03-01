import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule} from './customer/customer.module'


@Module({
  imports: [InvoiceModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
