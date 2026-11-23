import { useEffect, useState } from "react";
import api from "./api/client";

export default function App() {
  const [status, setStatus] = useState("checking...");
  useEffect(() => {
    api.get("/health")
      .then((r) => setStatus(r.data.status))
      .catch(() => setStatus("backend unreachable"));
  }, []);
  return <h1>OutfitMatch API: {status}</h1>;
}