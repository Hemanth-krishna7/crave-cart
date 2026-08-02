import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
        Privacy Policy
      </h1>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed shadow-xs">
        <p>
          At CraveCart, we build demonstration web applications to showcase frontend UI and architecture. This Privacy Policy details how we handle information in this demo.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">1. Data Storage & Local Simulation</h2>
          <p>
            CraveCart does not run external database servers or track user identities in the cloud. All simulated data (such as favorites, cart status, and order history) is stored directly within your local browser storage using LocalStorage. Removing your browser cookies or clearing site data will reset the application state.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">2. Analytics & Cookies</h2>
          <p>
            This demo does not place tracking pixels, third-party cookies, or perform cross-site analytics. We respect your browser privacy configurations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">3. Contact Inquiries</h2>
          <p>
            When you complete the contact form on this site, the submission data is stored in the application&apos;s React state and is never uploaded to any server. Refreshing or leaving the page clears this temporary submission data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">4. Policy Updates</h2>
          <p>
            As this is a portfolio showcase, this document will be updated only to reflect changes in simulated functionality.
          </p>
        </section>
      </div>
    </div>
  );
}
