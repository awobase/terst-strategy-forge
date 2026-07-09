import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { getAdminToken, adminLogout } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RequireAuth() {
  if (!getAdminToken()) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

const nav = [
  { to: "/admin/sector-references", label: "Références" },
  { to: "/admin/team", label: "Équipe" },
  { to: "/admin/testimonials", label: "Témoignages" },
  { to: "/admin/site-settings", label: "Paramètres" },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Administration</p>
            <h1 className="font-heading text-xl font-bold">CAYRIBE PARTNERS</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  location.pathname === item.to
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                Voir le site
              </a>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                adminLogout();
                window.location.href = "/admin/login";
              }}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
