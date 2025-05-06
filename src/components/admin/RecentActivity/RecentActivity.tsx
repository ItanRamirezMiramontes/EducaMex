type Activity = {
  id: string;
  description: string;
  date: string;
};

type RecentActivityProps = {
  activities: Activity[];
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Últimas Actividades</h3>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between items-center">
            <p className="text-gray-700">{activity.description}</p>
            <span className="text-sm text-gray-500">{activity.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
