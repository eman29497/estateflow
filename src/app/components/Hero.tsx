import Link from "next/link";
export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-amber-500 font-semibold mb-3">
            Find Your Dream Home
          </p>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Discover The Perfect
            <span className="text-amber-500"> Property </span>
            For Your Family
          </h1>
          <p className="text-gray-600 mt-6 text-lg">
            Browse thousands of verified properties. Buy, Rent or
            Invest in your dream home with trusted agents.
          </p>
        <div className="mt-8 flex gap-4">
  <Link href="/buy">
    <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 duration-300">
      Explore Properties
    </button>
  </Link>

  <Link href="/agents">
    <button className="border border-slate-900 px-6 py-3 rounded-lg hover:bg-slate-900 hover:text-white duration-300">
      Contact Agent
    </button>
  </Link>
</div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900"
            alt="House"
            className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}