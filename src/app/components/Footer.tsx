import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="w-full px-8 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-amber-500">
              EstateHub
            </h2>

            <p className="text-gray-400 mt-5 leading-7">
              EstateHub helps you discover verified properties,
              trusted agents, and the perfect home for your family.
            </p>

            <div className="flex gap-4 mt-6 text-2xl">
              <span className="cursor-pointer hover:text-amber-500 duration-300">
                🌐
              </span>
              <span className="cursor-pointer hover:text-amber-500 duration-300">
                📘
              </span>
              <span className="cursor-pointer hover:text-amber-500 duration-300">
                📷
              </span>
              <span className="cursor-pointer hover:text-amber-500 duration-300">
                🐦
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/home" className="hover:text-amber-500 duration-300">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="hover:text-amber-500 duration-300"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/agents"
                  className="hover:text-amber-500 duration-300"
                >
                  Agents
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-amber-500 duration-300"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Services
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>Buy Property</li>
              <li>Sell Property</li>
              <li>Rent Property</li>
              <li>Property Investment</li>
              <li>Property Valuation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>📍 New York, USA</p>
              <p>📞 +1 234 567 890</p>
              <p>📧 info@estatehub.com</p>
              <p>🕒 Mon - Sat : 9:00 AM - 7:00 PM</p>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="py-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EstateHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}