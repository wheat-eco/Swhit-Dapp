"use client"

import { useState, useEffect } from "react"
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit"
import { Bell, ChevronDown } from "lucide-react"
import { AppSidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NetworkSwitch } from "@/components/NetworkSwitch"
import { Faucet } from "@/components/Faucet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSwap } from "@/hooks/useSwap"
import { useSuiTokens } from "@/hooks/useSuiTokens"

export default function Home() {
  const { currentAccount } = useWalletKit()
  const { tokens, isLoading: isLoadingTokens } = useSuiTokens()
  const { swap, isLoading: isSwapping, error: swapError } = useSwap()
  const [fromToken, setFromToken] = useState("")
  const [toToken, setToToken] = useState("")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (swapError) {
      setError(swapError.message)
    }
  }, [swapError])

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) {
      setError("Please fill in all fields")
      return
    }
    try {
      await swap(fromToken, toToken, Number.parseFloat(fromAmount))
      setError(null)
      // Reset form after successful swap
      setFromAmount("")
      setToAmount("")
    } catch (err) {
      console.error("Swap failed:", err)
      setError("Swap failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <header className="flex h-[60px] items-center justify-between border-b border-border/40 px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <NetworkSwitch />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ConnectButton />
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 flex flex-col items-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Swap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>You Pay</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={fromToken} onValueChange={setFromToken}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingTokens ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                          ) : (
                            tokens.map((token) => (
                              <SelectItem key={token.symbol} value={token.symbol}>
                                {token.symbol}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>You Receive</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={toToken} onValueChange={setToToken}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingTokens ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                          ) : (
                            tokens.map((token) => (
                              <SelectItem key={token.symbol} value={token.symbol}>
                                {token.symbol}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {currentAccount ? (
                    <Button className="w-full" size="lg" onClick={handleSwap} disabled={isSwapping}>
                      {isSwapping ? "Swapping..." : "Swap"}
                    </Button>
                  ) : (
                    <ConnectButton className="w-full" />
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full max-w-md mt-8">
              <CardHeader>
                <CardTitle>Testnet Faucet</CardTitle>
              </CardHeader>
              <CardContent>
                <Faucet />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}

