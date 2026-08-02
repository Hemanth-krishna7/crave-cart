import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/validations/contactSchema';

export default function Contact() {
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      category: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    // Simulate frontend-only submission
    setSubmittedMessage(data);
  };

  const handleSendAnother = () => {
    setSubmittedMessage(null);
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Contact Us
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Have questions about the app? Get in touch with our simulated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Get in Touch</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              CraveCart is a portfolio demo. Any questions or feedback submitted via the form will be simulated locally.
            </p>
            <div className="border-t border-slate-100 pt-4 space-y-3.5 text-xs">
              <div>
                <strong className="block text-slate-700 font-bold uppercase tracking-wider">Demo Support Email</strong>
                <span className="text-indigo-600">support@cravecart.demo</span>
              </div>
              <div>
                <strong className="block text-slate-700 font-bold uppercase tracking-wider">Project Scope</strong>
                <span className="text-slate-500">Frontend food-delivery catalogue and order simulation</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-xs text-slate-500 space-y-3">
            <h3 className="font-bold text-slate-800">Need immediate help?</h3>
            <p className="leading-relaxed">
              If you are testing the checkout flow, you can place a mock order and immediately track it in your browser session inside the Orders page.
            </p>
          </div>
        </div>

        {/* Contact Form Area */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          {submittedMessage ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 text-3xl">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Message Submitted</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Thanks for reaching out, <strong>{submittedMessage.name}</strong>. Your contact form has been validated and submitted successfully in this frontend demo. No backend server request was made.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1">
                <span className="block text-slate-400 font-bold">Category:</span>
                <span className="block text-slate-700 font-semibold mb-2">{submittedMessage.category}</span>
                <span className="block text-slate-400 font-bold">Message Content:</span>
                <span className="block text-slate-600 italic line-clamp-3">&ldquo;{submittedMessage.message}&rdquo;</span>
              </div>
              <button
                onClick={handleSendAnother}
                className="inline-flex px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-400'
                  }`}
                  {...register('name')}
                />
                {errors.name && (
                  <span id="name-error" className="text-xs text-rose-600 mt-0.5" role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-400'
                  }`}
                  {...register('email')}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-rose-600 mt-0.5" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-category" className="text-xs font-bold text-slate-700">
                  Category
                </label>
                <select
                  id="contact-category"
                  aria-invalid={errors.category ? 'true' : 'false'}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition bg-white focus:outline-none focus:ring-2 ${
                    errors.category
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-400'
                  }`}
                  {...register('category')}
                >
                  <option value="">Select a category</option>
                  <option value="General Question">General Question</option>
                  <option value="Order Assistance">Order Assistance</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <span id="category-error" className="text-xs text-rose-600 mt-0.5" role="alert">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we help you?"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-400'
                  }`}
                  {...register('message')}
                />
                {errors.message && (
                  <span id="message-error" className="text-xs text-rose-600 mt-0.5" role="alert">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-sm font-bold shadow-sm transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
