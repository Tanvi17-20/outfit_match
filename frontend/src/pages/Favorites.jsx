import EmptyState from "../components/EmptyState";

export default function Favorites() {
  return (
    <div className="container">
      <EmptyState
        title="No favorites yet"
        text="Outfits you save will be collected here."
        to="/upload"
        label="Find outfits"
      />
    </div>
  );
}