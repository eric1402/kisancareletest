import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/register")({
  component: RegisterRedirect,
});

function RegisterRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/login", search: { flip: "register" }, replace: true });
  }, [navigate]);

  return null;
}
