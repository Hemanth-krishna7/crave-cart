import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/validations/contactSchema';
import PageWrapper from '@/components/common/PageWrapper';

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
    setSubmittedMessage(data);
  };

  const handleSendAnother = () => {
    setSubmittedMessage(null);
    reset();
  };

  return (
    <PageWrapper title="Contact Us" className="pb-16" containerClassName="max-w-7xl">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
          Contact Us
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Have questions about the app? Get in touch with our simulated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-6 shadow-lg space-y-4 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white">Get in Touch</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              CraveCart is a portfolio demo. Any questions or feedback submitted via the form will be simulated locally.
            </p>
            <div className="border-t border-white/5 pt-4 space-y-3.5 text-xs">
              <div>
                <strong className="block text-slate-400 font-bold uppercase tracking-wider">Support Status</strong>
                <span className="text-slate-300">Support is simulated for this portfolio experience. Use the contact form to explore the interaction.</span>
              </div>
              <div>
                <strong className="block text-slate-400 font-bold uppercase tracking-wider">Project Scope</strong>
                <span className="text-slate-300">Frontend food-delivery catalogue and order simulation</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-6 text-xs text-slate-400 space-y-3">
            <h3 className="font-bold text-orange-400">Need immediate help?</h3>
            <p className="leading-relaxed">
              If you are testing the checkout flow, you can place a mock order and immediately track it in your browser session inside the Orders page.
            </p>
          </div>
        </div>

        {/* Contact Form Area */}
        <div className="lg:col-span-2 bg-neutral-900/60 border border-white/5 rounded-xl p-6 sm:p-8 shadow-lg backdrop-blur-md">
          {submittedMessage ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 text-3xl">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Message Submitted</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Thanks for reaching out, <strong>{submittedMessage.name}</strong>. Your contact form has been validated and submitted successfully in this frontend demo. No backend server request was made.
                </p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-left text-xs space-y-1">
                <span className="block text-slate-400 font-bold">Category:</span>
                <span className="block text-slate-200 font-semibold mb-2">{submittedMessage.category}</span>
                <span className="block text-slate-400 font-bold">Message Content:</span>
                <span className="block text-slate-300 italic line-clamp-3">&ldquo;{submittedMessage.message}&rdquo;</span>
              </div>
              <button
                onClick={handleSendAnother}
                className="inline-flex px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-950/20 transition duration-200 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-bold text-slate-300">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'bg-red-950/20 border-red-500/40 text-white placeholder-slate-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-orange-500/30 focus:border-orange-500'
                  }`}
                  {...register('name')}
                />
                {errors.name && (
                  <span id="name-error" className="text-xs text-red-400 mt-0.5" role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-bold text-slate-300">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'bg-red-950/20 border-red-500/40 text-white placeholder-slate-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-orange-500/30 focus:border-orange-500'
                  }`}
                  {...register('email')}
                />
                {errors.email && (
                  <span id="email-error" className="text-xs text-red-400 mt-0.5" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-category" className="text-xs font-bold text-slate-300">
                  Category
                </label>
                <select
                  id="contact-category"
                  aria-invalid={errors.category ? 'true' : 'false'}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm transition bg-neutral-900 focus:outline-none focus:ring-2 ${
                    errors.category
                      ? 'border-red-500/40 focus:ring-red-500/20 focus:border-red-500 text-white'
                      : 'border-white/10 focus:ring-orange-500/30 focus:border-orange-500 text-slate-200'
                  }`}
                  {...register('category')}
                >
                  <option value="" className="bg-neutral-900 text-slate-400">Select a category</option>
                  <option value="General Question" className="bg-neutral-900 text-slate-200">General Question</option>
                  <option value="Order Assistance" className="bg-neutral-900 text-slate-200">Order Assistance</option>
                  <option value="Feedback" className="bg-neutral-900 text-slate-200">Feedback</option>
                  <option value="Technical Issue" className="bg-neutral-900 text-slate-200">Technical Issue</option>
                  <option value="Other" className="bg-neutral-900 text-slate-200">Other</option>
                </select>
                {errors.category && (
                  <span id="category-error" className="text-xs text-red-400 mt-0.5" role="alert">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we help you?"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'bg-red-950/20 border-red-500/40 text-white placeholder-slate-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-orange-500/30 focus:border-orange-500'
                  }`}
                  {...register('message')}
                />
                {errors.message && (
                  <span id="message-error" className="text-xs text-red-400 mt-0.5" role="alert">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-950 text-white rounded-lg text-sm font-bold shadow-md shadow-orange-950/20 transition duration-200 cursor-pointer focus:outline-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
