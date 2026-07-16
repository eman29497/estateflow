export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "Trusted Agents",
      description:
        "Our experienced agents help you find the perfect property with complete transparency.",
      icon: "🤝",
    },
    {
      id: 2,
      title: "Verified Properties",
      description:
        "Every property is verified to ensure authenticity and provide a secure buying experience.",
      icon: "🏡",
    },
    {
      id: 3,
      title: "Affordable Prices",
      description:
        "Find premium homes at competitive prices with flexible payment options.",
      icon: "💰",
    },
    {
      id: 4,
      title: "24/7 Support",
      description:
        "Our support team is always available to answer your questions and guide you.",
      icon: "📞",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center">
        <p className="text-amber-500 font-semibold">Why Choose Us</p>
        <h2 className="text-4xl font-bold mt-2">
          We Make Finding Your Dream Home Easy
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          We provide trusted services, verified listings, and professional
          support to help you find the perfect property.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:-translate-y-2 duration-300"
          >
            <div className="text-5xl">{item.icon}</div>
            <h3 className="text-2xl font-bold mt-5">
              {item.title}
            </h3>
            <p className="text-gray-500 mt-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}