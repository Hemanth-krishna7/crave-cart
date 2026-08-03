import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import PageWrapper from '@/components/common/PageWrapper';

export default function About() {
  const offerings = [
    {
      title: 'Restaurant Discovery',
      description: 'Explore a curated list of local restaurants. Search by name, filter by cuisine type, ratings, and vegetarian options.',
      icon: '🏢',
    },
    {
      title: 'Dish Discovery',
      description: 'Find individual dishes directly through our unified search engine, displaying ratings, pricing, and category filters.',
      icon: '🍕',
    },
    {
      title: 'Centralized Cart',
      description: 'Manage cart selections grouped automatically by restaurant, with real-time restaurant-count indicators.',
      icon: '🛒',
    },
    {
      title: 'Simulated Order Flow',
      description: 'Experience a complete mock checkout process from address entry to review, simulation, and order history tracking.',
      icon: '📋',
    },
  ];

  const journeySteps = [
    { step: '1', title: 'Discover', desc: 'Browse menus, search cuisines, and find favorites' },
    { step: '2', title: 'Choose', desc: 'Select top-rated dishes and configure quantities' },
    { step: '3', title: 'Customize', desc: 'Manage your cart items grouped by kitchen' },
    { step: '4', title: 'Simulate', desc: 'Check out, submit a mock order, and view history' },
  ];

  return (
    <PageWrapper title="About CraveCart" className="pb-16" containerClassName="max-w-7xl">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto py-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Good Food, Easier Discovery
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed">
            CraveCart is a modern, frontend-only portfolio demonstration designed to showcase a premium food-discovery and simulated ordering experience. It offers fully functional searching, filtering, favorites, cart management, and order history persisting locally in your browser.
          </p>
          <div className="pt-4">
            <Link
              to={ROUTES.RESTAURANTS}
              className="inline-flex px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold shadow-md shadow-orange-950/20 transition duration-200 cursor-pointer"
            >
              Start Browsing
            </Link>
          </div>
        </section>

        {/* What We Offer */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              What CraveCart Offers
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
              A simulation of modern food delivery platforms, powered by interactive frontend tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-white/5 rounded-xl p-6 shadow-lg flex flex-col items-start space-y-4 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User Journey */}
        <section className="space-y-8 bg-gradient-to-br from-orange-500/5 via-neutral-950/40 to-orange-950/10 border border-white/5 rounded-xl p-6 sm:p-10 backdrop-blur-md">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              The Product Journey
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
              Experience our complete simulated flow in four easy steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center space-y-3">
                <span className="w-10 h-10 rounded-full bg-orange-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Goals */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-neutral-900/60 border border-white/5 rounded-xl p-6 sm:p-10 shadow-lg backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              Design & Experience Goals
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              CraveCart was built to demonstrate clean, responsive, and intuitive UX interfaces:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-extrabold">✓</span>
                <span><strong className="text-white">Instant Interaction:</strong> Cart modifications, item updates, and selections refresh instantly for a smooth shopping flow.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-extrabold">✓</span>
                <span><strong className="text-white">Shareable States:</strong> Cuisines, active search terms, and discovery filter selections sync to the browser bar for direct bookmarking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-extrabold">✓</span>
                <span><strong className="text-white">Unified Navigation:</strong> Discover local kitchens and trending menu items through a cohesive, responsive search environment.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-6 text-center space-y-2">
            <h3 className="text-lg font-bold text-white">Frontend Demo Project</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This application does not connect to real restaurant APIs or payment networks. All orders are stored entirely in local browser session memory for mock visualization.
            </p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
