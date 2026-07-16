import Footer from "../components/Footer";

export default function PropertiesPage() {
  const properties = [
    {
      id: 1,
      title: "Luxury Villa",
      location: "California",
      price: "$850,000",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      id: 2,
      title: "Modern Apartment",
      location: "New York",
      price: "$320,000",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    },
    {
      id: 3,
      title: "Family House",
      location: "Chicago",
      price: "$450,000",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    },
    {
      id: 4,
      title: "Beach House",
      location: "Miami",
      price: "$990,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
    {
      id: 5,
      title: "Luxury Penthouse",
      location: "Dubai",
      price: "$1,200,000",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
    {
      id: 6,
      title: "Classic Home",
      location: "London",
      price: "$560,000",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    },
  ];

  return (
    <>
    

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Explore Properties
          </h1>

          <p className="text-gray-500 mt-4">
            Browse our latest premium properties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {property.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {property.location}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-amber-500 font-bold text-xl">
                    {property.price}
                  </span>

                  <button className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-amber-500 duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}