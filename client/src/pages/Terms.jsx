import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
        Terms of Service
      </h1>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed shadow-xs">
        <p>
          Welcome to CraveCart. By browsing this portfolio application, you agree to these Terms of Service.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">1. Demonstration & Portfolio Intent</h2>
          <p>
            CraveCart is created solely for pair-programming demonstration purposes. It does not provide real food delivery services, transaction handling, or commercial products. No real financial payments can be processed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">2. Simulated Orders</h2>
          <p>
            Any orders placed on this platform are strictly mock simulations. Food items, prices, and restaurants are mock dataset instances. No food will be prepared or delivered.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">3. Usage Eligibility</h2>
          <p>
            This website is provided free of charge for review, testing, and evaluation. Unmodified code repositories are owned by the portfolio author.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-800">4. Warranties</h2>
          <p>
            CraveCart is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </div>
  );
}
