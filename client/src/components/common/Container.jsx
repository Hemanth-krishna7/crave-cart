export default function Container({ children, className = '', clean = false }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${clean ? '' : 'max-w-7xl'} ${className}`}>
      {children}
    </div>
  );
}
