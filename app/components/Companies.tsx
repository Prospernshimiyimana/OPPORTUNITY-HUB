import Image from "next/image";

export default function Companies() {
  const companies = [
    { name: "Google", logo:"/logos/googlechrome.jpg" },
    { name: "Microsoft", logo: "/logos/microsoft.webp" },
    { name: "Amazon", logo: "/logos/amazon.png" },
    { name: "Stripe", logo: "/logos/stripe.png" },
    { name: "Airbnb", logo: "/logos/airbnb.png" },
  ];

  return (
    <section className="bg-gray-50 py-20 border-t">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-sm uppercase tracking-wide text-gray-500 mb-10">
          Trusted by teams from leading companies
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}