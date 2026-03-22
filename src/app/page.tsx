'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ShieldCheck, Truck, CreditCard, Building2, LayoutGrid, Package, ArrowRight } from 'lucide-react';

// Product badge mapping by product id
const productBadges: Record<string, 'POPULAR' | 'BEST VALUE'> = {
  p1: 'POPULAR',
  p3: 'BEST VALUE',
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'home' | 'office'>('home');

  // Filter products by target for tabs
  const homeProducts = products.filter((p) => p.target === 'b2c' || p.target === 'both');
  const officeProducts = products.filter((p) => p.target === 'b2b' || p.target === 'both');
  const displayProducts = activeTab === 'home' ? homeProducts.slice(0, 3) : officeProducts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-oasis-navy via-oasis-navy/95 to-oasis-navy/70 text-white overflow-hidden">
        {/* Water splash overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-oasis-cyan/20 to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-oasis-cyan text-white text-xs font-bold tracking-widest px-4 py-2 rounded-md mb-6 uppercase">
              Premium Hydration
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Zimbabwe&apos;s Trusted Water Provider{' '}
              <span className="text-oasis-cyan">Since 2014</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              Available at Pick n Pay, SPAR, OK Zimbabwe, and 100+ locations nationwide. 
              Delivering pure refreshment to homes and businesses across Harare for over 12 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-oasis-cyan text-white font-bold px-8 py-3.5 rounded-lg hover:bg-oasis-cyan/90 transition-colors text-center"
              >
                Shop Products
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-center"
              >
                Corporate Accounts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-8">
            Trusted by Our Nationwide Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {['Pick n Pay', 'SPAR', 'OK Zimbabwe', "Food Lover's Market", 'TM Supermarkets'].map((partner) => (
              <span key={partner} className="text-oasis-navy font-bold text-lg md:text-xl whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mt-4">
            {['TOTAL', 'PUMA', 'ZUVA'].map((partner) => (
              <span key={partner} className="text-oasis-navy font-bold text-lg md:text-xl whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section: Choose Your Oasis */}
      <section className="py-16 px-4 bg-oasis-light-gray">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-oasis-navy">Choose Your Oasis</h2>
              <div className="w-16 h-1 bg-oasis-cyan mt-3 rounded-full" />
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-oasis-cyan font-semibold text-sm hover:underline"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === 'home'
                    ? 'bg-white text-oasis-navy shadow-sm'
                    : 'bg-gray-50 text-gray-500 hover:text-oasis-navy'
                }`}
              >
                Home & Individuals
              </button>
              <button
                onClick={() => setActiveTab('office')}
                className={`px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === 'office'
                    ? 'bg-white text-oasis-navy shadow-sm'
                    : 'bg-gray-50 text-gray-500 hover:text-oasis-navy'
                }`}
              >
                Office & Bulk
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={productBadges[product.id] || null}
              />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="flex sm:hidden justify-center mt-8">
            <Link
              href="/products"
              className="flex items-center gap-1 text-oasis-cyan font-semibold text-sm"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Oasis — Dark Cards */}
      <section className="py-16 px-4 bg-oasis-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Purity First',
                desc: 'Every drop is rigorously lab-tested using carbon filtration to ensure the highest international safety standards.',
              },
              {
                icon: Truck,
                title: 'Reliability',
                desc: 'Dedicated Oasis trucks on standby to ensure your home or office has scheduled delivery across Harare.',
              },
              {
                icon: CreditCard,
                title: 'Easy Payments',
                desc: 'Pay via EcoCash, Visa, Mastercard, or Cash on Delivery. Seamless and secure checkout experience.',
              },
              {
                icon: Building2,
                title: 'Corporate Partner',
                desc: 'Custom billing and scheduled deliveries tailored for large corporate environments and wholesale accounts.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-oasis-cyan/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-oasis-cyan" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-oasis-navy mb-2">How It Works</h2>
          <p className="text-gray-500 mb-14">Hydration in three simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-oasis-cyan/20" style={{ left: '20%', right: '20%' }} />

            {[
              { num: '1', icon: LayoutGrid, title: 'Choose', desc: 'Select from our range of bottled water, dispensers, or premium ice products.' },
              { num: '2', icon: CreditCard, title: 'Payment', desc: 'Securely checkout using your preferred payment method including Cash on Delivery.' },
              { num: '3', icon: Package, title: 'Fast Delivery', desc: 'Our fleet delivers directly to your door within 24 hours across Harare.' },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="flex flex-col items-center relative z-10">
                {/* Numbered Circle */}
                <div className="w-20 h-20 rounded-full border-[3px] border-oasis-cyan flex items-center justify-center mb-5 bg-white">
                  <span className="text-2xl font-bold text-oasis-cyan">{num}</span>
                </div>
                <Icon size={28} className="text-oasis-cyan mb-3" />
                <h3 className="font-bold text-oasis-navy text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-oasis-light-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-oasis-navy mb-6">
              About Oasis Water Zimbabwe
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Established in 2014 and based in Harare, Oasis Water Zimbabwe has been serving the nation 
              for over 12 years. We specialize in the production and distribution of purified water, 
              purified ice, bulk raw water, and FMCG products.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to quality and reliability has made us the trusted choice for homes, 
              businesses, and major retailers across Zimbabwe. From our state-of-the-art purification 
              facility to our nationwide distribution network, we ensure every drop meets the highest standards.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '12+', label: 'Years Serving Zimbabwe', color: 'text-oasis-cyan' },
              { value: '100+', label: 'Distribution Locations', color: 'text-oasis-cyan' },
              { value: '6', label: 'Trusted Brands', color: 'text-oasis-navy' },
              { value: 'Every Day', label: 'Quality Guaranteed', color: 'text-oasis-cyan' },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
              >
                <p className={`text-3xl md:text-4xl font-extrabold ${color} mb-2`}>{value}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
