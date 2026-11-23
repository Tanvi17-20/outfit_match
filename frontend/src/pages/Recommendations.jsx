import EmptyState from "../components/EmptyState";

export default function Recommendations() {
  return (
    <div className="container">
      <EmptyState
        title="No recommendations yet"
        text="Upload a clothing photo and ranked bottom-wear matches will appear here."
        to="/upload"
        label="Upload a photo"
      />
    </div>
  );
}