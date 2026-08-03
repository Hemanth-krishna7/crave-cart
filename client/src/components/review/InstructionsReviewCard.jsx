import ReviewSection from './ReviewSection';

export default function InstructionsReviewCard({ instructions }) {
  return (
    <ReviewSection title="Delivery Instructions">
      <p className="text-sm text-slate-400 leading-relaxed">
        {instructions ? (
          <span className="font-medium text-slate-200 italic">&ldquo;{instructions}&rdquo;</span>
        ) : (
          <span className="text-slate-500 italic font-medium">No delivery instructions provided.</span>
        )}
      </p>
    </ReviewSection>
  );
}
