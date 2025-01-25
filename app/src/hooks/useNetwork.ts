import { useState, useEffect } from "react"
import { useSuiClientContext } from "@mysten/dapp-kit"

type Network = "testnet" | "mainnet"

export function useNetwork() {
  const { selectNetwork, network } = useSuiClientContext()
  const [currentNetwork, setCurrentNetwork] = useState<Network>(network as Network)

  useEffect(() => {
    setCurrentNetwork(network as Network)
  }, [network])

  const switchNetwork = (newNetwork: Network) => {
    selectNetwork(newNetwork)
  }

  return { network: currentNetwork, switchNetwork }
}

