import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Have any questions or concerns? We'd love to hear from you! Fill out the form below or
          contact us using the details provided.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Our Store</h2>
              <p className="text-gray-600 mt-2">
                123 Fashion Street,<br />
                Downtown, City Name,<br />
                Country, 12345
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
              <p className="text-gray-600 mt-2">
                Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+123 456 7890</a><br />
                Email: <a href="mailto:info@clothshop.com" className="text-blue-500 hover:underline">info@clothshop.com</a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-500 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

