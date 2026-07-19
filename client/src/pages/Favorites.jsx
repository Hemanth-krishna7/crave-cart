import ComingSoonPlaceholder from '@/components/common/ComingSoonPlaceholder';

function HeartIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

export default function Favorites() {
  return (
    <ComingSoonPlaceholder
      title="Favorite Restaurants"
      description="Bookmark your preferred kitchens and meals to easily find them on your next visit."
      icon={HeartIcon}
    />
  );
}
