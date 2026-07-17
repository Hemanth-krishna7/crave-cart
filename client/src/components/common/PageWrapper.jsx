import { useEffect } from 'react';
import Container from './Container';

export default function PageWrapper({ children, title, className = '', containerClassName = '' }) {
  useEffect(() => {
    document.title = title ? `${title} | CraveCart` : 'CraveCart';
  }, [title]);

  return (
    <div className={`min-h-[calc(100vh-8rem)] py-6 ${className}`}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </div>
  );
}
