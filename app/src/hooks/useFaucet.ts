import { useState } from "react"
import { useSuiClient } from "@mysten/dapp-kit"
import { requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet"

export function useFaucet() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const suiClient = useSuiClient()

  const requestTokens = async (address: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await requestSuiFromFaucetV0({
        host: "https://faucet.testnet.sui.io",
        recipient: address,
      })
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      setIsLoading(false)
    }
  }

  return { requestTokens, isLoading, error }
}

