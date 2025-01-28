const FeedbackSection = ({ name, img, review, stars }) => {
  return (
      <div className="border shadow-md p-4 bg-slate-100 justify-items-center">
        <img src={`student (${img}).png`} alt={`${name}`} className="w-24 h-24 mx-auto mb-8" />
        <p className="font-semibold text-xl mb-2">{`Student Name ${name}`}</p>
        <p className="text-gray-600 mb-4">"{`Mentor ${name}`} was {review}"</p>
        <div className="flex space-x-1 text-yellow-400 text-3xl">
          {/* Render stars dynamically based on the 'stars' prop */}
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span key={index} className={index < stars ? "text-orange-400" : "text-gray-500"}>
                ★
              </span>
            ))}
        </div>
      </div>
  );
};

export default FeedbackSection;
