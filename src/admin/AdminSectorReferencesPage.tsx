import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSectorReference,
  createSectorCategory,
  deleteSectorReference,
  deleteSectorCategory,
  fetchAdminSectors,
  updateSectorReference,
} from "@/lib/cms-api";
import type { SectorColor } from "@/config/sectorReferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const SECTOR_COLORS: { value: SectorColor; label: string }[] = [
  { value: "blue", label: "Bleu" },
  { value: "green", label: "Vert" },
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Violet" },
  { value: "red", label: "Rouge" },
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminSectorReferencesPage() {
  const queryClient = useQueryClient();
  const [sectorId, setSectorId] = useState("");
  const [highlight, setHighlight] = useState("");
  const [text, setText] = useState("");
  const [newSectorId, setNewSectorId] = useState("");
  const [newSectorLabel, setNewSectorLabel] = useState("");
  const [newSectorColor, setNewSectorColor] = useState<SectorColor>("blue");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-sectors"],
    queryFn: fetchAdminSectors,
  });

  const categories = data?.categories ?? [];
  const references = data?.references ?? [];

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-sectors"] });
    queryClient.invalidateQueries({ queryKey: ["sector-references"] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      createSectorReference({
        sectorId,
        highlight: highlight || undefined,
        text,
        sortOrder: references.filter((r) => r.sectorId === sectorId).length,
      }),
    onSuccess: () => {
      toast.success("Référence ajoutée");
      setHighlight("");
      setText("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { sectorId: string; highlight?: string; text: string; sortOrder: number };
    }) => updateSectorReference(id, data),
    onSuccess: () => {
      toast.success("Référence mise à jour");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSectorReference,
    onSuccess: () => {
      toast.success("Référence supprimée");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const createSectorMutation = useMutation({
    mutationFn: () =>
      createSectorCategory({
        id: newSectorId.trim(),
        label: newSectorLabel.trim(),
        color: newSectorColor,
        sortOrder: categories.length,
      }),
    onSuccess: () => {
      toast.success("Secteur ajouté");
      setNewSectorId("");
      setNewSectorLabel("");
      setNewSectorColor("blue");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteSectorMutation = useMutation({
    mutationFn: deleteSectorCategory,
    onSuccess: () => {
      toast.success("Secteur supprimé");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-2xl font-bold">Références sectorielles</h2>
        <p className="mt-2 text-muted-foreground">
          Gérez les exemples de missions par secteur (titre en gras + détail).
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">Ajouter un secteur</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Nouveau secteur pour les références sectorielles (carrousel du site).
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Identifiant (slug)</Label>
            <Input
              value={newSectorId}
              onChange={(e) => setNewSectorId(e.target.value)}
              placeholder="immobilier"
            />
          </div>
          <div className="space-y-2">
            <Label>Libellé affiché</Label>
            <Input
              value={newSectorLabel}
              onChange={(e) => {
                setNewSectorLabel(e.target.value);
                if (!newSectorId) setNewSectorId(slugify(e.target.value));
              }}
              placeholder="Immobilier"
            />
          </div>
          <div className="space-y-2">
            <Label>Couleur</Label>
            <Select value={newSectorColor} onValueChange={(v) => setNewSectorColor(v as SectorColor)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTOR_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="mt-4"
          disabled={!newSectorId || !newSectorLabel || createSectorMutation.isPending}
          onClick={() => createSectorMutation.mutate()}
        >
          Ajouter le secteur
        </Button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">Secteurs existants</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {categories.length} secteur{categories.length > 1 ? "s" : ""}. La suppression efface aussi les références liées.
        </p>
        <div className="mt-4 space-y-2">
          {categories.map((cat) => {
            const refCount = references.filter((r) => r.sectorId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/20 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {cat.id} · {cat.color} · {refCount} référence{refCount > 1 ? "s" : ""}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deleteSectorMutation.isPending}
                  onClick={() => {
                    if (
                      confirm(
                        `Supprimer le secteur « ${cat.label} » ?\n${refCount > 0 ? `${refCount} référence(s) seront aussi supprimée(s).` : ""}`,
                      )
                    ) {
                      deleteSectorMutation.mutate(cat.id);
                      if (sectorId === cat.id) setSectorId("");
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold">Ajouter une référence</h3>
        <div className="mt-4 grid gap-4">
          <div className="space-y-2">
            <Label>Secteur</Label>
            <Select value={sectorId} onValueChange={setSectorId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un secteur" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Intitulé (gras)</Label>
            <Input value={highlight} onChange={(e) => setHighlight(e.target.value)} placeholder="Ex. Start-up de…" />
          </div>
          <div className="space-y-2">
            <Label>Détail de la mission</Label>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} />
          </div>
          <Button
            onClick={() => createMutation.mutate()}
            disabled={!sectorId || !text || createMutation.isPending}
          >
            Ajouter
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="font-semibold">Références existantes</h3>
        {isLoading ? <p className="text-muted-foreground">Chargement…</p> : null}
        {categories.map((cat) => {
          const catRefs = references.filter((r) => r.sectorId === cat.id);
          return (
            <div key={cat.id} className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-heading font-bold text-primary">{cat.label}</h4>
              {catRefs.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">Aucune référence pour ce secteur.</p>
              ) : (
              <div className="mt-3 space-y-3">
                {catRefs.map((ref) => (
                  <div key={ref.id} className="grid gap-2 rounded-lg border border-border/60 p-3 md:grid-cols-[1fr_auto]">
                    <div className="space-y-2">
                      <Input
                        defaultValue={ref.highlight ?? ""}
                        placeholder="Intitulé"
                        onBlur={(e) =>
                          updateMutation.mutate({
                            id: ref.id,
                            data: {
                              sectorId: ref.sectorId,
                              highlight: e.target.value || undefined,
                              text: ref.text,
                              sortOrder: ref.sortOrder,
                            },
                          })
                        }
                      />
                      <Textarea
                        defaultValue={ref.text}
                        rows={2}
                        onBlur={(e) =>
                          updateMutation.mutate({
                            id: ref.id,
                            data: {
                              sectorId: ref.sectorId,
                              highlight: ref.highlight ?? undefined,
                              text: e.target.value,
                              sortOrder: ref.sortOrder,
                            },
                          })
                        }
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="self-start"
                      onClick={() => deleteMutation.mutate(ref.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
