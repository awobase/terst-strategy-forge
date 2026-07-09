import { useState } from "react";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdminToken } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);

  if (getAdminToken()) return <Navigate to="/admin/sector-references" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(username, password);
      toast.success("Connexion réussie");
      window.location.href = "/admin/sector-references";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-8 shadow-lg"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Espace admin</p>
          <h1 className="mt-1 font-heading text-2xl font-bold">Connexion</h1>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Identifiant</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
