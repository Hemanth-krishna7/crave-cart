export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-neutral-900/60 p-6 rounded-xl border border-white/5 shadow-lg flex flex-col items-start gap-4 h-full hover:border-orange-500/30 transition duration-300 backdrop-blur-md">
      <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
