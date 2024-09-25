import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

export interface Customer {
    id: string;
    name: string;
    rfc: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
}

interface CustomersTableProps {
    customers: Customer[];
    onCustomerCreate: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
    onCustomerUpdate: (customer: Customer) => void;
    onCustomerDelete: (customerId: string) => void;
}

export default function CustomersTable({
    customers,
    onCustomerCreate,
    onCustomerUpdate,
    onCustomerDelete
}: CustomersTableProps) {
    const t = useTranslations('CustomersPage');
    const locale = useLocale();

    const columns = useMemo<MRT_ColumnDef<Customer>[]>(
        () => [
            {
                accessorKey: 'name',
                header: t('tableHeaders.name'),
                enableHiding: false,
            },
            {
                accessorKey: 'rfc',
                header: t('tableHeaders.rfc'),
            },
            {
                accessorKey: 'email',
                header: t('tableHeaders.email'),
            },
            {
                accessorKey: 'phone',
                header: t('tableHeaders.phone'),
            },
            {
                accessorKey: 'address',
                header: t('tableHeaders.address'),
            },
            {
                accessorKey: 'createdAt',
                header: t('tableHeaders.createdAt'),
                Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(locale),
                enableEditing: false,
            },
        ],
        [t, locale]
    );

    const localization = useMemo(() => {
        const baseLocalization = locale === 'es' ? MRT_Localization_ES : MRT_Localization_EN;
        return {
            ...baseLocalization,
            edit: t('actions.edit'),
            delete: t('actions.delete'),
            save: t('actions.save'),
            cancel: t('actions.cancel'),
            addNewRow: t('addCustomer'),
        };
    }, [locale, t]);

    const table = useMaterialReactTable({
        columns,
        data: customers,
        editDisplayMode: 'modal',
        enableEditing: true,
        enableRowActions: true,
        positionActionsColumn: 'last',
        getRowId: (row) => row.id,
        onEditingRowSave: async ({ row, values }) => {
            await onCustomerUpdate({ ...row.original, ...values });
        },
        onCreatingRowSave: async ({ values }) => {
            await onCustomerCreate(values);
        },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title={t('actions.edit')}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('actions.delete')}>
                    <IconButton color="error" onClick={() => onCustomerDelete(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: () => (
            <Button
                color="primary"
                onClick={() => table.setCreatingRow(true)}
                variant="contained"
            >
                {t('addCustomer')}
            </Button>
        ),
        localization: localization
    });

    return <MaterialReactTable table={table} />;
}