import { CustomerDto } from "src/app_module/customer/interfaces/customer.dto";
import { Invoice_Detail } from "./invoice_detail.dto";

export interface InvoiceDto {
    customer: CustomerDto;
    serie: string;
    business_name: string;
    expedition_date: Date;
    description: string;
    subtotal: number;
    total_amount: number;
    vat: number;
    invoice_details: Invoice_Detail[] ;
}
