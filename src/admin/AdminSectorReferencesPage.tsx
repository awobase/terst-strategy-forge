import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSectorReference,
  deleteSectorReference,
  fetchAdminSectors,
  updateSectorReference,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function AdminSectorReferencesPage() {
  const queryClient = useQueryClient();
  const [sectorId, setSectorId] = useState("");
  const [highlight, setHighlight] = useState("");
  const [text, setText] = useState("");

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

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-2xl font-bold">Références sectorielles</h2>
        <p className="mt-2 text-muted-foreground">
          Gérez les exemples de missions par secteur (titre en gras + détail).
        </p>
      </div>

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
          if (catRefs.length === 0) return null;
          return (
            <div key={cat.id} className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-heading font-bold text-primary">{cat.label}</h4>
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
            </div>
          );
        })}
      </section>
    </div>
  );
}
