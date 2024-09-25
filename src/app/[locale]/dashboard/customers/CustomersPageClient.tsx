'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import CustomersTable, { Customer } from './CustomersTable';

// Datos de ejemplo (reemplazar con llamada a API real)
const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'Empresa A',
        rfc: 'XAXX010101000',
        email: 'contacto@empresaa.com',
        phone: '5551234567',
        address: 'Calle Principal 123, Ciudad de México',
        createdAt: '2023-01-15T10:30:00Z',
    },
    // ... añadir más clientes de ejemplo
];

export default function CustomersPageClient() {
    const t = useTranslations('CustomersPage');
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

    const handleCustomerCreate = async (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => {
        // Aquí iría la lógica para crear un cliente mediante un Action o API Route
        const createdCustomer: Customer = {
            ...newCustomer,
            id: Date.now().toString(), // Generar un ID temporal
            createdAt: new Date().toISOString(),
        };
        setCustomers((prev) => [...prev, createdCustomer]);
        // Llamada a API para crear el cliente
    };

    const handleCustomerUpdate = async (updatedCustomer: Customer) => {
        // Aquí iría la lógica para actualizar un cliente mediante un Action o API Route
        setCustomers((prev) =>
            prev.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        // Llamada a API para actualizar el cliente
    };

    const handleCustomerDelete = async (customerId: string) => {
        // Aquí iría la lógica para eliminar un cliente mediante un Action o API Route
        setCustomers((prev) => prev.filter((customer) => customer.id !== customerId));
        // Llamada a API para eliminar el cliente
    };

    return (
        <CustomersTable
            customers={customers}
            onCustomerCreate={handleCustomerCreate}
            onCustomerUpdate={handleCustomerUpdate}
            onCustomerDelete={handleCustomerDelete}
        />
    );
}