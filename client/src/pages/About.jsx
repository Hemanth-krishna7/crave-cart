import ComingSoonPlaceholder from '@/components/common/ComingSoonPlaceholder';

function InfoIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function About() {
  return (
    <ComingSoonPlaceholder
      title="About CraveCart"
      description="CraveCart is a premium gourmet food delivery platform connecting food lovers with the best local kitchens in the city."
      icon={InfoIcon}
    />
  );
}
