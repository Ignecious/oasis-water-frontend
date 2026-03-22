export default function Footer() {
  return (
    <footer className="bg-oasis-cyan text-oasis-navy py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">oasis water</h3>
          <p className="text-sm">Pure Water, Pure Life. Zimbabwe&apos;s trusted water delivery service.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
            <li><a href="/order-status" className="hover:underline">Order Status</a></li>
            <li><a href="/admin/dashboard" className="hover:underline">Admin</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>📍 181 Selous Avenue, Harare</li>
            <li>📞 +263 77 123 4567</li>
            <li>✉️ info@oasiswater.co.zw</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-8 border-t border-oasis-navy/20 pt-4">
        © {new Date().getFullYear()} Oasis Water Zimbabwe. All rights reserved.
      </div>
    </footer>
  );
}
