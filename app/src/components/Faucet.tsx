"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useFaucet } from "@/hooks/useFaucet"
import { useCurrentAccount } from "@mysten/dapp-kit"

export function Faucet() {
  const { currentAccount } = useCurrentAccount()
  const { requestTokens, isLoading, error } = useFaucet()
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleFaucetRequest = async () => {
    if (!currentAccount) return

    try {
      await requestTokens(currentAccount.address)
      setAlert({ type: "success", message: "Tokens successfully requested!" })
    } catch (error) {
      setAlert({ type: "error", message: "Failed to request tokens. Please try again." })
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleFaucetRequest} disabled={isLoading || !currentAccount}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Requesting...
          </>
        ) : (
          "Request Testnet Tokens"
        )}
      </Button>
      {alert && (
        <Alert variant={alert.type === "error" ? "destructive" : "default"}>
          <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

