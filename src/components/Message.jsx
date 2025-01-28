const Message = () => {
    return (
      <div className="p-8 bg-gray-100 space-y-8">
        <h1 className="md:text-4xl text-3xl text-center text-blue-950 font-semibold">
          Start a Chat
        </h1>
        <p className="text-center text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
        <div className="p-4 border rounded-xl shadow-md bg-white">
          <textarea
            id="chat-message"
            className="w-full h-24 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-950"
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <div className="flex items-center gap-4 rounded-full bg-gray-400 mx-8">
            <button className="text-2xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black">
              Connect
            </button>
            <span className="text-xl">
              with Mentor
            </span>
          </div>
      </div>
    );
  };
  
  export default Message;
  