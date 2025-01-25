import "./globals.css"
import { Inter } from "next/font/google"
import { WalletKitProvider } from "@mysten/wallet-kit"
import { SuiClientProvider } from "@mysten/sui-react"
import { getFullnodeUrl } from "@mysten/sui.js/client"

const inter = Inter({ subsets: ["latin"] })

const networks = {
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuiClientProvider networks={networks} defaultNetwork="testnet">
          <WalletKitProvider>{children}</WalletKitProvider>
        </SuiClientProvider>
      </body>
    </html>
  )
}

