export default function ActivityChart() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const hours = [2, 4, 5, 7, 6, 8, 3];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Actively Hours</h2>
      <div className="flex items-end justify-between h-40">
        {hours.map((h, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-6 rounded-md bg-indigo-500"
              style={{ height: `${h * 10}px` }}
            ></div>
            <p className="text-sm mt-1">{days[i]}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>Time spent: 28h</p>
        <p>Lessons taken: 60</p>
        <p>Exam passed: 10</p>
      </div>
    </div>
  );
}
