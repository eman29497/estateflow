export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Home Buyer",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "The entire process was smooth and stress-free. I found my dream home within a week. Highly recommended!",
    },
    {
      id: 2,
      name: "Emily Johnson",
      role: "Property Investor",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Excellent service and verified listings. The team guided me throughout the buying process.",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Business Owner",
      image:
        "https://randomuser.me/api/portraits/men/75.jpg",
      review:
        "Professional agents with amazing customer support. I will definitely recommend this platform to my friends.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center">
        <p className="text-amber-500 font-semibold">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold mt-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Hear from our satisfied clients who found their dream
          properties through our platform.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-8 hover:-translate-y-2 duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.role}
                </p>
              </div>
            </div>

            <div className="flex text-amber-500 text-xl mt-5">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-600 mt-5 leading-7">
              "{item.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}