export default function PerformanceGraph() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Performance</h2>
      <div className="h-32 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 rounded-xl" />
      <p className="mt-4 text-sm text-gray-500">
        <strong className="text-indigo-600">40%</strong> Your productivity is
        40% higher compared to last month
      </p>
    </div>
  );
}
