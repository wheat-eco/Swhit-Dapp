import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';

import { getFullnodeUrl } from '@mysten/sui/client';
import { Sidebar } from '@/components/sidebar';
import '@/app/globals.css';

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
          
            <WalletProvider>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">{children}</main>
              </div>
            </WalletProvider>
          

      </body>
    </html>
  );
}