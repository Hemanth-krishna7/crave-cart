import ReviewSection from './ReviewSection';

export default function DeliveryReviewCard({ formData, onEdit }) {
  const { fullName, phoneNumber, addressLine, city, state, pincode } = formData;

  return (
    <ReviewSection
      title="Delivery Address"
      action={
        <button
          onClick={onEdit}
          className="text-sm font-bold text-orange-400 hover:text-orange-500 hover:underline focus:outline-none cursor-pointer"
        >
          Edit
        </button>
      }
    >
      <div className="space-y-1 text-sm text-slate-350">
        <p className="font-bold text-white text-base">{fullName}</p>
        <p className="font-medium">{phoneNumber}</p>
        <p className="mt-2 text-slate-300">{addressLine}</p>
        <p className="text-slate-300">
          {city}, {state} - {pincode}
        </p>
      </div>
    </ReviewSection>
  );
}
