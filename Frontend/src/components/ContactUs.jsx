/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      handleError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://suraj-gitte-backend.onrender.com/api/contact",
        formData
      );
      handleSuccess(response.data.success);
      setFormData({ name: "", email: "", message: "" });
      setError("");
    } catch (err) {
      handleError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="text-gray-300 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl border-[1px] border-gray-400 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl text-center font-bold mb-8 text-white heading">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium mb-2 text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-transparent rounded-md border-2 border-gray-600 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium mb-2 text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent rounded-md border-2 border-gray-600 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-medium mb-2 text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              className="w-full px-4 py-2 bg-transparent rounded-md border-2 border-gray-600 focus:ring-2 focus:ring-white focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
