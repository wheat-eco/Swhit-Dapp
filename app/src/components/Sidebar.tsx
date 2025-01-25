"use client"

import { Wallet, Banknote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="flex h-[60px] items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SuiDEX Logo" width={32} height={32} />
          <span className="text-xl font-bold">SuiDEX</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-base">
                  <Link href="/swap">
                    <Wallet className="h-5 w-5 mr-3" />
                    <span>Swap</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-base">
                  <Link href="/faucet">
                    <Banknote className="h-5 w-5 mr-3" />
                    <span>Faucet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

