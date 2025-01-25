import "./globals.css"
import { Inter } from "next/font/google"
import { WalletProvider } from "@mysten/dapp-kit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createNetworkConfig, SuiClientProvider } from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui.js/client"

const inter = Inter({ subsets: ["latin"] })

const queryClient = new QueryClient()
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider>{children}</WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

