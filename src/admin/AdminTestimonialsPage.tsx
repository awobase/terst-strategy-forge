import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTestimonial,
  createTestimonialSector,
  deleteTestimonial,
  deleteTestimonialSector,
  fetchAdminTestimonialSectors,
  fetchAdminTestimonials,
  updateTestimonial,
  updateTestimonialSector,
  type ApiTestimonialSector,
} from "@/lib/cms-api";
import { DEFAULT_TESTIMONIAL_SECTORS } from "@/config/testimonialSectors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const CUSTOM_SECTOR = "__custom__";

const emptyNew = {
  firstName: "",
  lastInitial: "",
  role: "",
  sector: "",
  text: "",
};

function validateNewItem(item: typeof emptyNew) {
  if (item.firstName.trim().length < 2) return "Le prénom est requis (2 caractères minimum).";
  if (!item.lastInitial.trim()) return "L'initiale du nom est requise.";
  if (!item.role.trim()) return "Le rôle est requis.";
  if (!item.sector.trim()) return "Le secteur est requis.";
  if (item.text.trim().length < 15) return "Le texte doit faire au moins 15 caractères.";
  return null;
}

function SectorSelect({
  value,
  onChange,
  sectors,
  id,
}: {
  value: string;
  onChange: (sector: string) => void;
  sectors: string[];
  id: string;
}) {
  const isKnown = sectors.includes(value);
  const selectValue = value && isKnown ? value : value ? CUSTOM_SECTOR : "";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Secteur</Label>
      <Select
        value={selectValue}
        onValueChange={(next) => {
          if (next === CUSTOM_SECTOR) {
            onChange(isKnown ? "" : value);
            return;
          }
          onChange(next);
        }}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder="Choisir un secteur" />
        </SelectTrigger>
        <SelectContent>
          {sectors.map((sector) => (
            <SelectItem key={sector} value={sector}>
              {sector}
            </SelectItem>
          ))}
          <SelectItem value={CUSTOM_SECTOR}>Autre (saisie libre)</SelectItem>
        </SelectContent>
      </Select>
      {selectValue === CUSTOM_SECTOR ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nom du secteur"
        />
      ) : null}
    </div>
  );
}

function TestimonialForm({
  value,
  onChange,
  idPrefix,
  sectors,
}: {
  value: typeof emptyNew;
  onChange: (next: typeof emptyNew) => void;
  idPrefix: string;
  sectors: string[];
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-firstName`}>Prénom</Label>
          <Input
            id={`${idPrefix}-firstName`}
            value={value.firstName}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            placeholder="Richard"
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-lastInitial`}>Initiale du nom</Label>
          <Input
            id={`${idPrefix}-lastInitial`}
            value={value.lastInitial}
            onChange={(e) => onChange({ ...value, lastInitial: e.target.value })}
            placeholder="T"
            maxLength={5}
          />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-role`}>Rôle</Label>
          <Input
            id={`${idPrefix}-role`}
            value={value.role}
            onChange={(e) => onChange({ ...value, role: e.target.value })}
            placeholder="Chef d'entreprise"
          />
        </div>
        <SectorSelect
          id={`${idPrefix}-sector`}
          value={value.sector}
          onChange={(sector) => onChange({ ...value, sector })}
          sectors={sectors}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor={`${idPrefix}-text`}>Texte du témoignage</Label>
        <Textarea
          id={`${idPrefix}-text`}
          className="mt-1"
          rows={5}
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder="Témoignage du client…"
        />
      </div>
    </>
  );
}

export default function AdminTestimonialsPage() {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState(emptyNew);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSectorLabel, setNewSectorLabel] = useState("");

  const { data: testimonials = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: fetchAdminTestimonials,
    retry: 1,
  });

  const { data: sectorRows = [] } = useQuery({
    queryKey: ["admin-testimonial-sectors"],
    queryFn: fetchAdminTestimonialSectors,
    retry: 1,
  });

  const sectorLabels =
    sectorRows.length > 0
      ? sectorRows.filter((s) => s.active !== 0).map((s) => s.label)
      : [...DEFAULT_TESTIMONIAL_SECTORS];

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["admin-testimonial-sectors"] });
    queryClient.invalidateQueries({ queryKey: ["testimonial-sectors"] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      createTestimonial({
        firstName: newItem.firstName.trim(),
        lastInitial: newItem.lastInitial.trim(),
        role: newItem.role.trim(),
        sector: newItem.sector.trim(),
        text: newItem.text.trim(),
        sortOrder: testimonials.length,
      }),
    onSuccess: () => {
      toast.success("Témoignage ajouté");
      setNewItem(emptyNew);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submitNew = (onDone?: () => void) => {
    const validationError = validateNewItem(newItem);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    createMutation.mutate(undefined, {
      onSuccess: () => {
        onDone?.();
      },
    });
  };

  const createSectorMutation = useMutation({
    mutationFn: () =>
      createTestimonialSector({
        label: newSectorLabel.trim(),
        sortOrder: sectorRows.length,
      }),
    onSuccess: () => {
      toast.success("Secteur ajouté");
      setNewSectorLabel("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateSectorMutation = useMutation({
    mutationFn: ({ id, label }: { id: number; label: string }) => updateTestimonialSector(id, { label }),
    onSuccess: () => {
      toast.success("Secteur mis à jour");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteSectorMutation = useMutation({
    mutationFn: deleteTestimonialSector,
    onSuccess: () => {
      toast.success("Secteur supprimé");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) => updateTestimonial(id, data),
    onSuccess: () => {
      toast.success("Témoignage mis à jour");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast.success("Témoignage supprimé");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-muted-foreground">Chargement…</p>;

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">Impossible de joindre l&apos;API</h2>
        <p className="mt-2 text-sm text-muted-foreground">{(error as Error).message}</p>
        <Button className="mt-4" size="sm" onClick={() => refetch()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Témoignages</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {testimonials.length} témoignage{testimonials.length > 1 ? "s" : ""} · {sectorLabels.length} secteurs
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un témoignage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nouveau témoignage</DialogTitle>
              <DialogDescription>Choisissez un secteur dans la liste ou saisissez-en un nouveau.</DialogDescription>
            </DialogHeader>
            <TestimonialForm value={newItem} onChange={setNewItem} idPrefix="dialog" sectors={sectorLabels} />
            <Button
              className="mt-4 w-full"
              disabled={createMutation.isPending}
              onClick={() => submitNew(() => setDialogOpen(false))}
            >
              {createMutation.isPending ? "Ajout en cours…" : "Ajouter le témoignage"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <section className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Secteurs</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Liste utilisée dans le champ « Secteur » des témoignages. Stockée en base (<code className="text-xs">testimonial_sectors</code>).
        </p>
        <div className="mt-4 space-y-2">
          {sectorRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun secteur en base. Ajoutez-en un ci-dessous.</p>
          ) : (
            sectorRows.map((sector) => (
              <div
                key={sector.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/20 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <SectorLabelEditor
                    label={sector.label}
                    onSave={(label) => updateSectorMutation.mutate({ id: sector.id, label })}
                  />
                  {sector.active === 0 ? (
                    <span className="ml-2 text-xs text-muted-foreground">(masqué)</span>
                  ) : null}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deleteSectorMutation.isPending}
                  onClick={() => {
                    if (confirm(`Supprimer le secteur « ${sector.label} » ?\nLes témoignages existants gardent ce libellé en texte.`)) {
                      deleteSectorMutation.mutate(sector.id);
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Input
            className="max-w-xs"
            value={newSectorLabel}
            onChange={(e) => setNewSectorLabel(e.target.value)}
            placeholder="Nouveau secteur…"
          />
          <Button
            variant="outline"
            disabled={newSectorLabel.trim().length < 2 || createSectorMutation.isPending}
            onClick={() => createSectorMutation.mutate()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un secteur
          </Button>
        </div>
      </section>

      <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-6">
        <h3 className="mb-4 font-semibold">Ajouter un témoignage</h3>
        <TestimonialForm value={newItem} onChange={setNewItem} idPrefix="inline" sectors={sectorLabels} />
        <Button className="mt-4" disabled={createMutation.isPending} onClick={() => submitNew()}>
          <Plus className="mr-2 h-4 w-4" />
          {createMutation.isPending ? "Ajout en cours…" : "Ajouter le témoignage"}
        </Button>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-muted-foreground">Témoignages existants</h3>
        {testimonials.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Aucun témoignage pour l&apos;instant.
          </p>
        ) : (
          testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              sectors={sectorLabels}
              onUpdate={(data) => updateMutation.mutate({ id: t.id, data })}
              onDelete={() => {
                if (confirm("Supprimer ce témoignage ?")) deleteMutation.mutate(t.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SectorLabelEditor({ label, onSave }: { label: string; onSave: (label: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(label);

  if (editing) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Input className="max-w-xs" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            onSave(value.trim());
            setEditing(false);
          }}
        >
          Enregistrer
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setValue(label); setEditing(false); }}>
          Annuler
        </Button>
      </div>
    );
  }

  return (
    <button type="button" className="font-medium text-foreground hover:text-primary" onClick={() => setEditing(true)}>
      {label}
    </button>
  );
}

function TestimonialCard({
  testimonial,
  sectors,
  onUpdate,
  onDelete,
}: {
  testimonial: {
    id: number;
    firstName: string;
    lastInitial: string;
    role: string;
    sector: string;
    text: string;
    sortOrder: number;
    active?: number;
  };
  sectors: string[];
  onUpdate: (data: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const [form, setForm] = useState({
    firstName: testimonial.firstName,
    lastInitial: testimonial.lastInitial,
    role: testimonial.role,
    sector: testimonial.sector,
    text: testimonial.text,
    sortOrder: String(testimonial.sortOrder),
    active: testimonial.active !== 0,
  });

  const handleSave = () => {
    if (form.text.trim().length < 15) {
      toast.error("Le texte doit faire au moins 15 caractères.");
      return;
    }
    onUpdate({
      firstName: form.firstName.trim(),
      lastInitial: form.lastInitial.trim(),
      role: form.role.trim(),
      sector: form.sector.trim(),
      text: form.text.trim(),
      sortOrder: Number(form.sortOrder),
      active: form.active,
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          {form.firstName} {form.lastInitial}.
          {!form.active ? (
            <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">Masqué</span>
          ) : null}
        </h3>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Prénom" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
        <Field label="Initiale" value={form.lastInitial} onChange={(v) => setForm({ ...form, lastInitial: v })} />
        <Field label="Rôle" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
        <Field label="Ordre" value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
        <div className="md:col-span-2">
          <SectorSelect
            id={`edit-sector-${testimonial.id}`}
            value={form.sector}
            onChange={(sector) => setForm({ ...form, sector })}
            sectors={sectors}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label>Texte</Label>
        <Textarea className="mt-1" rows={4} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={handleSave}>
          Enregistrer
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const next = !form.active;
            setForm({ ...form, active: next });
            onUpdate({ active: next });
          }}
        >
          {form.active ? "Masquer" : "Afficher"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
