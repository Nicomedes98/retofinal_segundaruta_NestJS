import { Injectable, NotFoundException } from '@nestjs/common';

import { InvoiceDto } from '../interfaces/invoice.dto';
import { CustomerService } from 'src/app_module/customer/service/customer.service';


@Injectable()
export class InvoiceService {
    constructor(private cs: CustomerService) { }


    private invoices: InvoiceDto[] = [
        {
            customer: null,
            serie: 'A1',
            business_name: 'PescaINC',
            expedition_date: new Date('2023-02-28'),
            description: 'Pescados',
            subtotal: 100,
            vat: 12,
            total_amount: 112,
            invoice_details: [
                {
                    id: '1',
                    description: 'Merluza',
                    quantity: 2,
                    unit_price: 50,
                    amount: 100,
                },
            ],
        },
        {
            customer: null,
            serie: 'A2',
            business_name: 'Frank Inc',
            expedition_date: new Date('2023-02-28'),
            description: 'Articulos deportivos',
            subtotal: 80,
            vat: 10,
            total_amount: 90,
            invoice_details: [
                {
                    id: '1',
                    description: 'Pelota de beisbol',
                    quantity: 2,
                    unit_price: 40,
                    amount: 80,
                },
            ],
        },
    ];

    getInvoices(): InvoiceDto[] {
        return this.invoices;
    }

    getInvoiceById(id: string): InvoiceDto {
        const invoice = this.invoices.find((invoice) => {
            const invoiceDetail = invoice.invoice_details.find((detail) => detail.id === id);
            return invoiceDetail != null;
        });
        if (!invoice) {
            throw new NotFoundException(`No se encontró la factura con el id= ${id}`);
        }
        return invoice;
    }

    async createInvoice(invoice: InvoiceDto, uuid: string): Promise<InvoiceDto> {
        const customerobtained = await this.cs.getCustomer(uuid)
        
        if (customerobtained) {
            invoice.customer = customerobtained
            this.invoices.push(invoice);
            return invoice;
        }
        throw new NotFoundException(`No se encontró el usuario ${uuid} para asignarle la factura`);
    }

    deleteInvoice(id: string): boolean {
        const index = this.invoices.findIndex(
            (invoice) => invoice.serie === id,
        );
        if (index < 0) {
            return false;
        }
        this.invoices.splice(index, 1);
        return true;
    }

    updateInvoice(id: string, invoice: InvoiceDto): InvoiceDto {
        const index = this.invoices.findIndex(
            (invoice) => invoice.serie === id,
        );
        if (index < 0) {
            throw new NotFoundException(`No se encuetra el invoice para actualizar bro ${id}`);
        }
        this.invoices[index] = invoice;
        return invoice;
    }
    
    patchInvoice(serie: string, invoice: InvoiceDto): InvoiceDto {
        const oldinvoice = this.invoices.find(invoice => invoice.serie === serie);
        if (oldinvoice) {
            let invoicepatched: InvoiceDto = {
                ...oldinvoice,
                ...invoice
            }
            this.invoices = this.invoices.map((invoice: InvoiceDto) => invoice.serie === serie ? invoicepatched : invoice)
            return invoicepatched;
        }
        throw new NotFoundException(`Factura no encontrada ${serie} `);
    }


}