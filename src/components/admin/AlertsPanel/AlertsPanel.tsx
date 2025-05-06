type Alert = {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
};

type AlertsPanelProps = {
  alerts: Alert[];
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Alertas</h3>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`p-4 rounded-lg ${
              alert.type === "info"
                ? "bg-blue-100 text-blue-600"
                : alert.type === "warning"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <p>{alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
