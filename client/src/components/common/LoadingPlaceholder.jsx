export default function LoadingPlaceholder({ message = 'Loading...', fullPage = false }) {
  const loader = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500/20 border-t-orange-500 mb-4"></div>
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );

  if (fullPage) {
    return <div className="min-h-[60vh] flex items-center justify-center">{loader}</div>;
  }
  return loader;
}
