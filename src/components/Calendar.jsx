const Calendar = () => {
  return (
    <>
      <div className="p-8 bg-gray-100 gap-8">
        <h1 className="md:text-4xl text-3xl text-center text-blue-950 font-semibold pb-8">Schedule a Date</h1>
        <p className="pb-8 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <div className="grid grid-cols-2 gap-4 pb-8">
          <div className="p-4 border rounded-xl shadow-md bg-white gap-8">
            <h2 className="pb-2 text-center text-xl font-semibold">Date</h2>
            <input
              type="date"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>
          <div className="p-4 border rounded-xl shadow-md bg-white gap-8">
            <h2 className="pb-2 text-center text-xl font-semibold">Time</h2>
            <input
              type="time"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>
          </div>
          <div className="flex items-center gap-4 rounded-full bg-gray-400 md:mx-8">
            <button className="text-2xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black">
              Schedule
            </button>
            <span className="text-xl">
              a Meeting
            </span>
          </div>
      </div>
    </>
  );
};

export default Calendar;
