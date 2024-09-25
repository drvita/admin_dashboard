'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import QuickAccess from './components/QuickAccess';
import TotalBilledAmount from './components/TotalBilledAmount';
import MembershipStatus from './components/MembershipStatus';
import AccountActivity from './components/AccountActivity';
import DraftInvoices from './components/DraftInvoices';
import BillingBalance from './components/BillingBalance';

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(12, 1fr)' }}>
            <Box sx={{ gridColumn: 'span 4' }}>
                {isClient && <MembershipStatus translations={{
                    title: t('MembershipStatus.title'),
                    currentLevel: t('MembershipStatus.currentLevel'),
                    nextLevel: t('MembershipStatus.nextLevel'),
                    pointsToNext: t('MembershipStatus.pointsToNext'),
                    viewDetails: t('MembershipStatus.viewDetails')
                }} />}
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
                {isClient && <BillingBalance translations={{
                    title: t('BillingBalance.title'),
                    currentBalance: t('BillingBalance.currentBalance'),
                    totalBalance: t('BillingBalance.totalBalance'),
                    setAlert: t('BillingBalance.setAlert'),
                    alertDialogTitle: t('BillingBalance.alertDialogTitle'),
                    alertThreshold: t('BillingBalance.alertThreshold'),
                    save: t('BillingBalance.save'),
                    cancel: t('BillingBalance.cancel'),
                }} />}
            </Box>
            <Box sx={{ gridColumn: 'span 4' }}>
                {isClient && <QuickAccess translations={{
                    title: t('QuickAccess.title'),
                    newInvoice: t('QuickAccess.newInvoice'),
                    newClient: t('QuickAccess.newClient'),
                    reports: t('QuickAccess.reports'),
                }} />}
            </Box>

            <Box sx={{ gridColumn: 'span 6' }}>
                {isClient && <AccountActivity translations={{
                    title: t('AccountActivity.title'),
                    markAsRead: t('AccountActivity.markAsRead'),
                    noActivity: t('AccountActivity.noActivity'),
                }} />}
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
                {isClient && <DraftInvoices translations={{
                    title: t('DraftInvoices.title'),
                    noDrafts: t('DraftInvoices.noDrafts'),
                    continueInvoice: t('DraftInvoices.continueInvoice'),
                }} />}
            </Box>

            <Box sx={{ gridColumn: 'span 12' }}>
                {isClient && <TotalBilledAmount translations={{
                    title: t('TotalBilledAmount.title'),
                    currentMonth: t('TotalBilledAmount.currentMonth'),
                    lastMonth: t('TotalBilledAmount.lastMonth'),
                    tooltipText: t('TotalBilledAmount.tooltipText'),
                }} />}
            </Box>
        </Box>
    );
}