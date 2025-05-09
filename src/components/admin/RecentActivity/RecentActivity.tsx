interface ActivityItem {
  id: string;
  description: string;
  date: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="recent-activity-card">
      <h2 className="recent-activity-title">Últimas Actualizaciones</h2>
      <div className="recent-activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <div className="activity-icon">📝</div>
            <div className="activity-info">
              <p className="activity-title">{activity.description}</p>
              <p className="activity-time">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
