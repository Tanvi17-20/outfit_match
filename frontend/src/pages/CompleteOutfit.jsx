import EmptyState from "../components/EmptyState";

export default function CompleteOutfit() {
  return (
    <div className="container">
      <EmptyState
        title="No outfit selected"
        text="Pick a bottom from your recommendations to build a complete outfit with shoes and accessories."
        to="/upload"
        label="Start with a photo"
      />
    </div>
  );
}