import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../interfaces/customer.dto';

@Injectable()
export class CustomerService {

    public customers: CustomerDto[] = [
        {
            id: '1',
            name: 'John',
            lastname: 'Edward',
            ci: '1234',
            phonenumber: '099485134',

        },
        {
            id: '2',
            name: 'Casandra',
            lastname: 'Vasquez',
            ci: '2345',
            phonenumber: '099678934',

        },
        {
            id: '3',
            name: 'Frank',
            lastname: 'Vazquez',
            ci: '3456',
            phonenumber: '092678530',

        },

    ];
    async getCustomers(): Promise<CustomerDto[]> {
        return this.customers;
    }

    async getCustomer(uuid: string): Promise<CustomerDto> {
        const customer = this.customers.find(customer => customer.id === uuid);
        if (!customer) {
            throw new NotFoundException(`Usuario no encontrado ${uuid} `);
        }
        return customer;
    }

    async createCustomer(customer: CustomerDto): Promise<CustomerDto> {
        const newCustomerId = Math.random().toString(36).slice(-2);
        const newCustomer = {
            ...customer, id: newCustomerId,
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    deleteCustomer(uuid: string): boolean {
        const customerIndex = this.customers.findIndex(customer => customer.id === uuid);
        if (customerIndex < 0) {
            return false;
        }
        this.customers.splice(customerIndex, 1);
        return true;
    }

    updateCustomer(uuid: string, customer: CustomerDto): CustomerDto {
        const customerIndex = this.customers.findIndex(customer => customer.id === uuid);
        if (customerIndex < 0) {
            throw new NotFoundException(`Usuario no encontrado ${uuid} `);
        }
        this.customers.splice(customerIndex, 1);
        this.customers.push(customer) 
        return customer;
    }

    patchCustomer(uuid: string, customer: CustomerDto): CustomerDto {
        const oldcustomer = this.customers.find(customer => customer.id === uuid);
        if (oldcustomer) {
            let customerpatched: CustomerDto = {
                ...oldcustomer,
                ...customer
            }
            this.customers = this.customers.map((customer: CustomerDto) => customer.id === uuid ? customerpatched : customer)
            return customerpatched;
        }
        throw new NotFoundException(`El usuario ${uuid} no esta disponible`);
    }


}







