import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">About Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to our clothing store! We are dedicated to bringing you the latest fashion trends with a touch
          of comfort and elegance. Explore our journey and values below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="About Us"
              className="rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Established in 2020, our store started with a simple mission: to provide high-quality, affordable, and
              stylish clothing for everyone. Over the years, we have grown into a trusted brand for fashion enthusiasts.
            </p>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Commitment to quality and craftsmanship</li>
              <li>Focus on sustainability and eco-friendly practices</li>
              <li>Customer satisfaction as our top priority</li>
              <li>Inclusive designs for all shapes and sizes</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Visit Us</h2>
          <p className="text-gray-600 mb-2">
            123 Fashion Street, Downtown, City Name, Country, 12345
          </p>
          <p className="text-gray-600">
            Call us at: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+123 456 7890</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

