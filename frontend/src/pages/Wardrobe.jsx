import EmptyState from "../components/EmptyState";

export default function Wardrobe() {
  return (
    <div className="container">
      <EmptyState
        title="Your wardrobe is empty"
        text="Saved clothing items will show up here once you log in and add some."
        to="/upload"
        label="Add an item"
      />
    </div>
  );
}