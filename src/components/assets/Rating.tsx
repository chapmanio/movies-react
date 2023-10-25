const Rating = ({ rating }: { rating: number }) => {
  return (
    <div
      className={
        `flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-solid` +
        (rating > 7
          ? ` border-green-500`
          : rating < 4
          ? ` border-red-500`
          : ` border-yellow-300`)
      }
    >
      <p className="text-xl font-bold text-white">
        {Math.round(rating * 10) / 10}
      </p>
    </div>
  );
};

export default Rating;
