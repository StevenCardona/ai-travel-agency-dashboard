import { Header } from "components";

const Trips = () => {
  return (
    <main className="dashboard wrapper">
      <Header
        title={"Trips"}
        description={"View and edit AI-Generated travel plans"}
        ctaText="Create Trip"
        ctaUrl="/trips/create"
      />
    </main>
  );
};

export default Trips;
