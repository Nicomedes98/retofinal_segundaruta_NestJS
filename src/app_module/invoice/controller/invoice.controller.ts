import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';

import { InvoiceService } from '../service/invoice.service';
import { InvoiceDto } from '../interfaces/invoice.dto';


@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Get()
    async findAll(): Promise<InvoiceDto[]> {
        return this.invoiceService.getInvoices();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<InvoiceDto> {
        const invoice = this.invoiceService.getInvoiceById(id);
        if (!invoice) {
            throw new NotFoundException(`No se encutra el ${id} f`);
        }
        return invoice;
    }

    @Post(':uuid')
    async create(@Body() invoice: InvoiceDto, @Param("uuid") uuid: string): Promise<InvoiceDto> {
        return this.invoiceService.createInvoice(invoice, uuid);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() invoice: InvoiceDto): Promise<InvoiceDto> {
        const updatedInvoice = this.invoiceService.updateInvoice(id, invoice);
        if (!updatedInvoice) {
            throw new NotFoundException(`Error ${id}`);
        }
        return updatedInvoice;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<boolean> {
        const deleted = this.invoiceService.deleteInvoice(id);
        if (!deleted) {
            throw new NotFoundException(`No se puede eliminar el user ${id}`);
        }
        return deleted;
    }
    @Patch(':uuid')
    patchInvoice(@Param('uuid') uuid: string, @Body() invoice: InvoiceDto): InvoiceDto {
        return this.invoiceService.patchInvoice(uuid, invoice)
    }
}

