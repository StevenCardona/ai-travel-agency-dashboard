import { Header, TripCard } from "components";
import StatsCard from "components/StatsCard";
import { allTrips_dummy, dashboardStats_dummy } from "~/constants/data";

const Dashboard = () => {
  const user = { name: "Adrian" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Bro"} 👋`}
        description={
          "Track activity, trend and popular destinatios in real time"
        }
      />

      <section className="flex flex-col gap-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle={"Total Users"}
            total={dashboardStats_dummy.totalUsers}
            currentMonthCount={dashboardStats_dummy.userJoined.currentMonth}
            lastMonthCount={dashboardStats_dummy.userJoined.lastMonth}
          />
          <StatsCard
            headerTitle={"Total trips"}
            total={dashboardStats_dummy.totalTrips}
            currentMonthCount={dashboardStats_dummy.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats_dummy.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle={"Active Users"}
            total={dashboardStats_dummy.userRole.total}
            currentMonthCount={dashboardStats_dummy.userRole.currentMonth}
            lastMonthCount={dashboardStats_dummy.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

        <div className="trip-grid">
          {allTrips_dummy
            .slice(0, 4)
            .map(
              ({
                estimatedPrice,
                id,
                imageUrls,
                itinerary,
                name,
                tags,
                travelStyle,
              }) => (
                <TripCard
                  key={id}
                  id={id.toString()}
                  imageUrl={imageUrls[0]}
                  location={itinerary?.[0].location ?? ""}
                  name={name}
                  tags={tags}
                  price={estimatedPrice}
                />
              )
            )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
