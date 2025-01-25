"use client"

import { useState } from "react"
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit"
import { TransactionBlock } from "@mysten/sui.js/transactions"
import { SuiClient } from "@mysten/sui.js/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react"
import { WalletWrapper } from "@/components/WalletWrapper"

export default function Home() {
  return (
    <WalletWrapper>
      <HomeContent />
    </WalletWrapper>
  )
}

function HomeContent() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [fromToken, setFromToken] = useState("")
  const [toToken, setToToken] = useState("")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [deadline, setDeadline] = useState("30")

  const { currentAccount } = useWalletKit()

  const handleSwap = async () => {
    if (!currentAccount) {
      console.error("Wallet not connected")
      return
    }

    const tx = new TransactionBlock()
    // Here we would add the swap logic using the Sui SDK
    // For example:
    // tx.moveCall({
    //   target: `${PACKAGE_ID}::dex::swap`,
    //   arguments: [tx.pure(fromToken), tx.pure(toToken), tx.pure(fromAmount)],
    // })

    try {
      const client = new SuiClient({ url: "https://fullnode.mainnet.sui.io:443" })
      const result = await client.signAndExecuteTransactionBlock({
        signer: currentAccount,
        transactionBlock: tx,
      })
      console.log("Swap executed:", result)
    } catch (e) {
      console.error("Error executing swap:", e)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4">
              <MenuIcon className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">SuiDEX</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Swap
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Pool
            </Button>
            <ConnectButton />
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fromToken">From</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="fromToken"
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-grow"
                    />
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUI">SUI</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="toToken">To</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="toToken"
                      type="number"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-grow"
                    />
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUI">SUI</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slippage">Slippage Tolerance (%)</Label>
                  <Input
                    id="slippage"
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Transaction Deadline (minutes)</Label>
                  <Input
                    id="deadline"
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full"
                  />
                </div>

                <Button className="w-full" onClick={handleSwap}>
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

