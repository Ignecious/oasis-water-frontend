'use client';

import { X, LogIn, Search, HelpCircle, FileText, Shield, ChevronRight, User } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const menuItems = [
    { icon: LogIn, label: 'Sign In/Sign Up' },
    { icon: Search, label: 'Find a Product' },
    { icon: HelpCircle, label: 'Help Centre' },
    { icon: FileText, label: 'Terms & Conditions' },
    { icon: Shield, label: 'Privacy Policy' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {/* User Avatar & Welcome */}
        <div className="pt-10 pb-6 flex flex-col items-center border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-oasis-light-gray flex items-center justify-center mb-4">
            <User size={40} className="text-oasis-cyan" />
          </div>
          <h2 className="text-lg font-extrabold tracking-widest text-oasis-navy">WELCOME</h2>
        </div>

        {/* Menu Items */}
        <nav className="py-2">
          {menuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-oasis-light-gray transition-colors text-left"
            >
              <Icon size={22} className="text-oasis-cyan flex-shrink-0" />
              <span className="flex-1 text-sm font-semibold text-oasis-navy">{label}</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
