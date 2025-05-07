import { useState } from "react";

export default function ProfileSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Helper function to generate days for the current month
  const generateDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const days = [];
    // Empty spaces before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleMonthChange = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 mb-2" />
        <h3 className="text-lg font-semibold">Andreas Iniesta</h3>
        <p className="text-sm text-gray-500">College Student</p>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-2xl shadow-md p-4 text-center">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-lg text-gray-500 hover:text-gray-700"
          >
            &lt;
          </button>
          <h4 className="text-sm font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-lg text-gray-500 hover:text-gray-700"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm text-gray-500">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="text-center">
              {day}
            </div>
          ))}

          {generateDays().map((day, i) => (
            <div
              key={i}
              className={`py-2 text-center rounded ${
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth()
                  ? "bg-indigo-500 text-white"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-sm font-semibold mb-4">Upcoming Events</h4>
        <ul className="text-sm space-y-2">
          <li className="flex justify-between">
            <span className="text-red-500">● Team Meetup</span>
            <span>Sun</span>
          </li>
          <li className="flex justify-between">
            <span className="text-black">● Illustration</span>
            <span>Tue</span>
          </li>
          <li className="flex justify-between">
            <span className="text-blue-500">● Research</span>
            <span>Wed</span>
          </li>
          <li className="flex justify-between">
            <span className="text-orange-500">● Presentation</span>
            <span>Thu</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
