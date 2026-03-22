import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oasis-light-gray flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-bold text-oasis-cyan mb-4">404</div>
      <h1 className="text-2xl font-semibold text-oasis-navy mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="bg-oasis-cyan text-oasis-navy font-semibold px-6 py-3 rounded-lg hover:bg-oasis-cyan/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
