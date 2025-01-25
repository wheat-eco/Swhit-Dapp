"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNetwork } from "@/hooks/useNetwork"

export function NetworkSwitch() {
  const { network, switchNetwork } = useNetwork()
  const isTestnet = network === "testnet"

  const handleNetworkChange = (checked: boolean) => {
    switchNetwork(checked ? "testnet" : "mainnet")
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="network-switch" checked={isTestnet} onCheckedChange={handleNetworkChange} />
      <Label htmlFor="network-switch">{isTestnet ? "Testnet" : "Mainnet"}</Label>
    </div>
  )
}

