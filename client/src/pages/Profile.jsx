import ComingSoonPlaceholder from '@/components/common/ComingSoonPlaceholder';

function UserIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

export default function Profile() {
  return (
    <ComingSoonPlaceholder
      title="User Profile"
      description="Manage your delivery addresses, contact details, payment options, and security settings."
      icon={UserIcon}
    />
  );
}
