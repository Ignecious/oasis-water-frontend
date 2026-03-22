import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-oasis-cyan/10 rounded-full flex items-center justify-center mb-4">
        <Icon size={40} className="text-oasis-cyan" />
      </div>
      <h2 className="text-xl font-semibold text-oasis-navy mb-2">{title}</h2>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="bg-oasis-cyan text-oasis-navy font-semibold px-6 py-3 rounded-lg hover:bg-oasis-cyan/90 transition-colors"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
