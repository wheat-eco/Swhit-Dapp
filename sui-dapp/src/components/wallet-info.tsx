'use client';

import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export function WalletInfo() {
  const account = useCurrentAccount();
  const { data: balance, isPending } = useSuiClientQuery('getBalance', {
    owner: account?.address,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Address: {account?.address}</p>
        <p>Balance: {balance?.totalBalance ?? 'N/A'} SUI</p>
      </CardContent>
    </Card>
  );
}