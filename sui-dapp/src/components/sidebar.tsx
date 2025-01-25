import Link from 'next/link';
import { Home, Repeat, Droplet } from 'lucide-react';
import { Sidebar as ShadcnSidebar } from '@/components/ui/sidebar';

export function Sidebar() {
  return (
    <ShadcnSidebar className="w-64">
      <ShadcnSidebar.Header>
        <h2 className="text-xl font-bold">Sui DApp</h2>
      </ShadcnSidebar.Header>
      <ShadcnSidebar.Content>
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/swap" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Repeat size={20} />
            <span>Swap</span>
          </Link>
          <Link href="/faucet" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
            <Droplet size={20} />
            <span>Faucet</span>
          </Link>
        </nav>
      </ShadcnSidebar.Content>
    </ShadcnSidebar>
  );
}