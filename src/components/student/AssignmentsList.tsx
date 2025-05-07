const assignments = [
  {
    task: "Typography test",
    date: "Today, 10:30 AM",
    grade: "190/200",
    status: "Completed",
  },
  {
    task: "Inclusive design test",
    date: "Tomorrow, 11:00 AM",
    grade: "160/200",
    status: "Completed",
  },
  {
    task: "Drawing test",
    date: "23 Feb, 12:00 PM",
    grade: "--/200",
    status: "Upcoming",
  },
];

export default function AssignmentsList() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">My Assignments</h2>
      <ul className="divide-y divide-gray-100">
        {assignments.map((a, index) => (
          <li key={index} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{a.task}</p>
              <p className="text-sm text-gray-500">{a.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{a.grade}</p>
              <span
                className={`text-xs px-2 py-1 rounded-xl ${
                  a.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {a.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
