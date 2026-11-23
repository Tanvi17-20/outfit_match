import EmptyState from "../components/EmptyState";

export default function Profile() {
  return (
    <div className="container">
      <EmptyState
        title="You're not logged in"
        text="Log in to see your profile and preferences."
        to="/login"
        label="Log in"
      />
    </div>
  );
}