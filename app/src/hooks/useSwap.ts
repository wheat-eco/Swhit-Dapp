import { useState } from "react"
import { useSuiClient, useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { TransactionBlock } from "@mysten/sui.js/transactions"

export function useSwap() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const suiClient = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()

  const swap = async (fromToken: string, toToken: string, amount: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const tx = new TransactionBlock()

      // This is a simplified example. In a real DEX, you'd interact with a swap contract.
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(amount)])
      tx.transferObjects([coin], tx.pure(await suiClient.getAddress()))

      await signAndExecute({
        transaction: tx,
        chain: "sui:testnet",
      })

      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      setIsLoading(false)
    }
  }

  return { swap, isLoading, error }
}

