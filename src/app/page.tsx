import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Droplets, Zap, Shield, Truck } from 'lucide-react';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-oasis-navy to-oasis-navy/80 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Pure Water,{' '}
            <span className="text-oasis-cyan">Pure Life</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Zimbabwe&apos;s trusted water delivery service. Fresh, clean water delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-oasis-cyan text-oasis-navy font-bold px-8 py-4 rounded-lg hover:bg-oasis-cyan/90 transition-colors text-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/order-status"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Track Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-oasis-light-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-oasis-navy mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="border-2 border-oasis-navy text-oasis-navy font-semibold px-6 py-3 rounded-lg hover:bg-oasis-navy hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Oasis */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-oasis-navy mb-12 text-center">Why Choose Oasis Water?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Droplets, title: 'Pure & Clean', desc: 'Rigorously tested water quality meeting international standards.' },
              { icon: Zap, title: 'Fast Delivery', desc: 'Same-day delivery available. Order by 12PM for afternoon delivery.' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'ISO certified processes ensuring every drop is safe and fresh.' },
              { icon: Truck, title: 'Bulk Orders', desc: 'Special pricing for businesses and bulk orders. Ask us today.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 bg-oasis-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-oasis-cyan" />
                </div>
                <h3 className="font-semibold text-oasis-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-oasis-navy text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Browse our full range of water products, ice, dispensers and accessories.
        </p>
        <Link
          href="/products"
          className="bg-oasis-cyan text-oasis-navy font-bold px-10 py-4 rounded-lg hover:bg-oasis-cyan/90 transition-colors text-lg"
        >
          Browse Products
        </Link>
      </section>

      <Footer />
    </div>
  );
}
