import { SidebarProvider } from "@/components/ui/sidebar"
import { WalletWrapper } from "@/components/WalletWrapper"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletWrapper>
          <SidebarProvider>{children}</SidebarProvider>
        </WalletWrapper>
      </body>
    </html>
  )
}

