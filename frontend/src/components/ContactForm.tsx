import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input w-full"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input w-full"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            className="input w-full min-h-[120px]"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
          Send Message
        </button>
        {submitted && <p className="text-green-600 text-center font-semibold mt-4 animate-fade-in">Thank you! Your message has been sent.</p>}
      </form>
    </section>
  );
};

export default ContactForm; 