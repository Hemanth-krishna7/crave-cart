import ReviewSection from './ReviewSection';

export default function InstructionsReviewCard({ instructions }) {
  return (
    <ReviewSection title="Delivery Instructions">
      <p className="text-sm text-slate-600 leading-relaxed">
        {instructions ? (
          <span className="font-medium text-slate-700 italic">&ldquo;{instructions}&rdquo;</span>
        ) : (
          <span className="text-slate-400 italic font-medium">No delivery instructions provided.</span>
        )}
      </p>
    </ReviewSection>
  );
}
