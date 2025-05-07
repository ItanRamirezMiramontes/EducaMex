import OverviewCards from "../../components/student/OverviewCards";
import ActivityChart from "../../components/student/ActivityChart";
import PerformanceGraph from "../../components/student/PerformanceGraph";
import AssignmentsList from "../../components/student/AssignmentsList";
import PieChartCard from "../../components/student/PieChartCard";
import ProfileSidebar from "../../components/student/ProfileSidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- Overview Section --- */}
        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* --- Main Content Section --- */}
          <div className="lg:col-span-3 space-y-6">
            {/* --- Activity & Performance Charts --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <PieChartCard data={[]} />
              </div>
              <div className="md:col-span-2">
                <ActivityChart />
              </div>
              <PerformanceGraph />

              <div className="md:col-span-2">
                <AssignmentsList />
              </div>
            </div>
          </div>

          {/* --- Sidebar Section --- */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
