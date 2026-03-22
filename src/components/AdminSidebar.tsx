'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, Calendar, Home } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/collection-schedule', label: 'Collection Schedule', icon: Calendar },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-oasis-navy text-white flex flex-col">
      <div className="p-4 border-b border-white/20">
        <Link href="/" className="text-xl font-bold">
          <span className="text-oasis-cyan">oasis</span>
          <span className="text-white"> admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === href
                ? 'bg-oasis-cyan text-oasis-navy font-semibold'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <Link href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
          <Home size={16} />
          Back to Store
        </Link>
      </div>
    </aside>
  );
}
