const cards = [
  { title: "Course in Progress", value: 18, color: "bg-red-100 text-red-500" },
  {
    title: "Course Completed",
    value: 23,
    color: "bg-green-100 text-green-500",
  },
  {
    title: "Certificates Earned",
    value: 15,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "Community Support",
    value: 87,
    color: "bg-purple-100 text-purple-500",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-4 shadow-md ${card.color} font-semibold text-center`}
        >
          <p className="text-sm">{card.title}</p>
          <p className="text-2xl">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
