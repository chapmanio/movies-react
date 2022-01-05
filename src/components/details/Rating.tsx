// Types
type RatingProps = {
  rating: number;
};

// Component
const Rating = ({ rating }: RatingProps) => {
  // Render
  return (
    <div
      className={
        `w-16 h-16 rounded-full border-[6px] border-solid flex items-center justify-center` +
        (rating > 7 ? ` border-green-500` : rating < 4 ? ` border-red-500` : ` border-yellow-300`)
      }
    >
      <p className="text-xl text-white font-bold">{rating}</p>
    </div>
  );
};

export default Rating;
