'use client';

import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WalletInfo } from '@/components/wallet-info';

export default function Dashboard() {
  const currentAccount = useCurrentAccount();
  const { disconnect } = useCurrentWallet();

  if (!currentAccount) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please connect your wallet to view the dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <WalletInfo />
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
}