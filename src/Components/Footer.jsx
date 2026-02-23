import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            My<span className="text-indigo-500">Blog</span>
          </h2>
          <p className="text-sm text-gray-400">
            Sharing knowledge, tutorials, and insights on web development and
            modern technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">Home</li>
            <li className="hover:text-indigo-400 cursor-pointer">Blogs</li>
            <li className="hover:text-indigo-400 cursor-pointer">About</li>
            <li className="hover:text-indigo-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">React</li>
            <li className="hover:text-indigo-400 cursor-pointer">JavaScript</li>
            <li className="hover:text-indigo-400 cursor-pointer">UI / UX</li>
            <li className="hover:text-indigo-400 cursor-pointer">Backend</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get the latest blog updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-sm focus:outline-none"
            />
            <button className="bg-indigo-600 px-4 py-2 rounded-r-md text-white hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
