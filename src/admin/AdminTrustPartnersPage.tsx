import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrustPartner,
  deleteTrustPartner,
  fetchAdminTrustPartners,
  resolveCmsImageUrl,
  updateTrustPartner,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function AdminTrustPartnersPage() {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState("");
  const [scale, setScale] = useState("1");

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["admin-trust-partners"],
    queryFn: fetchAdminTrustPartners,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-trust-partners", "trust-partners"] });

  const createMutation = useMutation({
    mutationFn: async () => {
      const file = fileRef.current?.files?.[0];
      if (!file) throw new Error("Choisissez une image");
      const form = new FormData();
      form.append("alt", alt);
      form.append("scale", scale);
      form.append("image", file);
      return createTrustPartner(form);
    },
    onSuccess: () => {
      toast.success("Logo ajouté");
      setAlt("");
      setScale("1");
      if (fileRef.current) fileRef.current.value = "";
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTrustPartner,
    onSuccess: () => {
      toast.success("Logo supprimé");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, form }: { id: number; form: FormData }) => updateTrustPartner(id, form),
    onSuccess: () => {
      toast.success("Logo mis à jour");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-2xl font-bold">Ils nous font confiance</h2>
        <p className="mt-2 text-muted-foreground">Ajoutez, modifiez ou supprimez les logos du carrousel.</p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">Ajouter un logo</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="alt">Nom / alt</Label>
            <Input id="alt" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Ex. Région Guadeloupe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scale">Échelle</Label>
            <Input id="scale" type="number" step="0.05" min="0.5" max="3" value={scale} onChange={(e) => setScale(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image PNG</Label>
            <input id="image" ref={fileRef} type="file" accept="image/*" className="block w-full text-sm" />
          </div>
        </div>
        <Button className="mt-4" onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !alt}>
          Ajouter
        </Button>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold">Logos actuels ({partners.length})</h3>
        {isLoading ? <p className="text-muted-foreground">Chargement…</p> : null}
        <div className="grid gap-4">
          {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center">
              <img
                src={resolveCmsImageUrl(partner.imageUrl)}
                alt={partner.alt}
                className="h-14 w-auto max-w-[10rem] object-contain"
              />
              <div className="grid flex-1 gap-3 md:grid-cols-3">
                <Input
                  defaultValue={partner.alt}
                  onBlur={(e) => {
                    const form = new FormData();
                    form.append("alt", e.target.value);
                    form.append("scale", String(partner.scale));
                    form.append("sortOrder", String(partner.sortOrder));
                    form.append("active", String(partner.active ?? 1));
                    updateMutation.mutate({ id: partner.id, form });
                  }}
                />
                <Input
                  type="number"
                  step="0.05"
                  defaultValue={partner.scale}
                  onBlur={(e) => {
                    const form = new FormData();
                    form.append("alt", partner.alt);
                    form.append("scale", e.target.value);
                    form.append("sortOrder", String(partner.sortOrder));
                    form.append("active", String(partner.active ?? 1));
                    updateMutation.mutate({ id: partner.id, form });
                  }}
                />
                <Input
                  type="number"
                  defaultValue={partner.sortOrder}
                  onBlur={(e) => {
                    const form = new FormData();
                    form.append("alt", partner.alt);
                    form.append("scale", String(partner.scale));
                    form.append("sortOrder", e.target.value);
                    form.append("active", String(partner.active ?? 1));
                    updateMutation.mutate({ id: partner.id, form });
                  }}
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(partner.id)}
                aria-label={`Supprimer ${partner.alt}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
