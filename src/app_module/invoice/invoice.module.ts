import { Module } from '@nestjs/common';
import { InvoiceController} from './controller/invoice.controller';
import { InvoiceService } from './service/invoice.service';
import { CustomerService } from '../customer/service/customer.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, CustomerService]
})
export class InvoiceModule {}
