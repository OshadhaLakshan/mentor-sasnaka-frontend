import { useState, useEffect } from "react";
import { database } from "../firebase/firebase.config"; // Import Firebase configuration
import { ref, onValue, push } from "firebase/database";

const Schedule = () => {
  const [reminders, setReminders] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newReminder, setNewReminder] = useState("");

  // Fetch reminders from Firebase
  useEffect(() => {
    const remindersRef = ref(database, "reminders/");
    onValue(remindersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedReminders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReminders(formattedReminders);
      } else {
        setReminders([]);
      }
    });
  }, []);

  // Add a new reminder to Firebase
  const addReminder = () => {
    if (!newDate || !newTime || !newReminder.trim()) return;

    const newReminderData = {
      date: newDate,
      time: newTime,
      text: newReminder.trim(),
      sender: "me", // You can change this based on user type
    };

    const remindersRef = ref(database, "reminders/");
    push(remindersRef, newReminderData);

    // Clear inputs after scheduling
    setNewDate("");
    setNewTime("");
    setNewReminder("");
  };

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <div className="p-4 border rounded-xl shadow-md bg-white gap-8">
        <h2 className="text-2xl text-center font-bold mb-4">Your Schedule</h2>

        {/* Calendar View */}
        <div className="p-4 border rounded-xl">
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {Array(31)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="text-center border rounded py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </div>

        {/* Reminders List */}
        <div className="chat-box h-full max-w-96 overflow-y-auto border p-2 my-4 bg-gray-100 rounded-lg">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`message mb-2 p-2 rounded-md ${
                reminder.sender === "me"
                  ? "bg-blue-200 text-black self-start text-left"
                  : "bg-green-200 text-black self-start text-left"
              }`}
            >
              <p>
                {reminder.date} {reminder.time} - {reminder.text}
              </p>
            </div>
          ))}
        </div>

        {/* Input for New Reminder */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2 bg-white gap-8">
            <h2 className="pb-2 text-center text-xl font-semibold">Date</h2>
            <input
              type="date"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <div className="p-2 bg-white gap-8">
            <h2 className="pb-2 text-center text-xl font-semibold">Time</h2>
            <input
              type="time"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
        </div>

        {/* Add Reminder */}
        <div className="my-4 flex flex-col gap-4">
          <textarea
            className="w-full h-24 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-950"
            placeholder="Reminder details..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
          ></textarea>
        </div>
          <div className="flex items-center gap-4 rounded-full bg-gray-400 md:mx-8">
            <button onClick={addReminder} className="text-2xl font-primary text-white bg-blue-950 py-3 px-9 rounded-full hover:bg-black">
              Schedule
            </button>
            <span className="text-xl">
              a Meeting
            </span>
          </div>
      </div>
    </div>
  );
};

export default Schedule;
