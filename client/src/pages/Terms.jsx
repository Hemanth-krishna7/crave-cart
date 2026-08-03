import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';

export default function Terms() {
  return (
    <PageWrapper title="Terms of Service" className="pb-16" containerClassName="max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-6">
        Terms of Service
      </h1>
      <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed shadow-lg backdrop-blur-md">
        <p>
          Welcome to CraveCart. By browsing this portfolio application, you agree to these Terms of Service.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Demonstration & Portfolio Intent</h2>
          <p>
            CraveCart is created solely for pair-programming demonstration purposes. It does not provide real food delivery services, transaction handling, or commercial products. No real financial payments can be processed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Simulated Orders</h2>
          <p>
            Any orders placed on this platform are strictly mock simulations. Food items, prices, and restaurants are mock dataset instances. No food will be prepared or delivered.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Usage Eligibility</h2>
          <p>
            This website is provided free of charge for review, testing, and evaluation. Unmodified code repositories are owned by the portfolio author.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Warranties</h2>
          <p>
            CraveCart is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
