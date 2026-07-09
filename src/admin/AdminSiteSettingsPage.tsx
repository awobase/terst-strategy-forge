import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAdminSiteSettings, updateSiteSettings } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminSiteSettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: fetchAdminSiteSettings,
  });

  const [form, setForm] = useState({
    contactEmail: "",
    contactPhoneDisplay: "",
    contactPhoneTel: "",
    socialLinkedin: "",
    socialInstagram: "",
    showTestimonials: true,
    teamIntro: "",
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      contactEmail: data.contactEmail,
      contactPhoneDisplay: data.contactPhoneDisplay,
      contactPhoneTel: data.contactPhoneTel,
      socialLinkedin: data.socialLinkedin,
      socialInstagram: data.socialInstagram,
      showTestimonials: data.showTestimonials,
      teamIntro: data.teamIntro,
    });
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => updateSiteSettings(form),
    onSuccess: () => {
      toast.success("Paramètres enregistrés");
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-muted-foreground">Chargement…</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold">Paramètres du site</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Coordonnées affichées dans le footer, la page contact et les métadonnées. Les photos ne sont pas modifiables
          ici.
        </p>
      </div>

      <form
        className="space-y-6 rounded-xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
      >
        <div className="space-y-4">
          <h3 className="font-semibold">Contact</h3>
          <div>
            <Label htmlFor="contactEmail">E-mail</Label>
            <Input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPhoneDisplay">Téléphone (affichage)</Label>
            <Input
              id="contactPhoneDisplay"
              value={form.contactPhoneDisplay}
              onChange={(e) => setForm({ ...form, contactPhoneDisplay: e.target.value })}
              placeholder="0690 00 00 00"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPhoneTel">Téléphone (lien tel:)</Label>
            <Input
              id="contactPhoneTel"
              value={form.contactPhoneTel}
              onChange={(e) => setForm({ ...form, contactPhoneTel: e.target.value })}
              placeholder="+590690000000"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Réseaux sociaux</h3>
          <div>
            <Label htmlFor="socialLinkedin">LinkedIn</Label>
            <Input
              id="socialLinkedin"
              type="url"
              value={form.socialLinkedin}
              onChange={(e) => setForm({ ...form, socialLinkedin: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="socialInstagram">Instagram</Label>
            <Input
              id="socialInstagram"
              type="url"
              value={form.socialInstagram}
              onChange={(e) => setForm({ ...form, socialInstagram: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Équipe & témoignages</h3>
          <div>
            <Label htmlFor="teamIntro">Introduction section équipe</Label>
            <Textarea
              id="teamIntro"
              value={form.teamIntro}
              onChange={(e) => setForm({ ...form, teamIntro: e.target.value })}
              rows={4}
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <p className="font-medium">Afficher les témoignages</p>
              <p className="text-sm text-muted-foreground">Section sur la page Offres et lien dans le menu</p>
            </div>
            <Switch
              checked={form.showTestimonials}
              onCheckedChange={(checked) => setForm({ ...form, showTestimonials: checked })}
            />
          </div>
        </div>

        <Button type="submit" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </form>
    </div>
  );
}
