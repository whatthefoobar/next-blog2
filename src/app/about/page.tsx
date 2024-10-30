import Link from "next/link";
import BackButton from "@/components/BackButton";
import Image from "next/image";

const About = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <BackButton />
      <div className="bg-gray-50 p-8">
        {/* Title Section */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">About Us</h1>
        </header>

        {/* Content Section */}
        <main className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Blog Owner Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Blog Owner Image */}
            <Image
              className="w-32 h-32 object-cover rounded-full shadow-md"
              width={0}
              height={0}
              sizes="100vw"
              src={"/images/jane.jpg"}
              alt="Blog Owner"
            />

            {/* Blog Owner Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">Jane Doe</h2>
              <p className="text-gray-600 mt-4">
                Jane Doe is the founder of this blog, dedicated to sharing
                insightful content on a variety of topics. With a passion for
                writing and a commitment to quality, John aims to provide
                readers with valuable information and engaging stories. Feel
                free to reach out for collaboration or inquiries.
              </p>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
