import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTestimonial,
  deleteTestimonial,
  fetchAdminTestimonials,
  updateTestimonial,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const emptyNew = {
  firstName: "",
  lastInitial: "",
  role: "",
  sector: "",
  text: "",
};

export default function AdminTestimonialsPage() {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState(emptyNew);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: fetchAdminTestimonials,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      createTestimonial({
        ...newItem,
        sortOrder: testimonials.length,
      }),
    onSuccess: () => {
      toast.success("Témoignage ajouté");
      setNewItem(emptyNew);
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

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-2xl font-bold">Témoignages</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Gérez les avis clients affichés sur la page Offres. L&apos;affichage global se active/désactive dans Paramètres
          du site.
        </p>
      </div>

      <div className="space-y-6">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            onUpdate={(data) => updateMutation.mutate({ id: t.id, data })}
            onDelete={() => {
              if (confirm("Supprimer ce témoignage ?")) deleteMutation.mutate(t.id);
            }}
          />
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6">
        <h3 className="mb-4 font-semibold">Ajouter un témoignage</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Prénom</Label>
            <Input value={newItem.firstName} onChange={(e) => setNewItem({ ...newItem, firstName: e.target.value })} />
          </div>
          <div>
            <Label>Initiale du nom</Label>
            <Input value={newItem.lastInitial} onChange={(e) => setNewItem({ ...newItem, lastInitial: e.target.value })} placeholder="T" />
          </div>
          <div>
            <Label>Rôle</Label>
            <Input value={newItem.role} onChange={(e) => setNewItem({ ...newItem, role: e.target.value })} />
          </div>
          <div>
            <Label>Secteur</Label>
            <Input value={newItem.sector} onChange={(e) => setNewItem({ ...newItem, sector: e.target.value })} />
          </div>
        </div>
        <div className="mt-4">
          <Label>Texte</Label>
          <Textarea rows={4} value={newItem.text} onChange={(e) => setNewItem({ ...newItem, text: e.target.value })} />
        </div>
        <Button className="mt-4" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
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

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          {form.firstName} {form.lastInitial}.
        </h3>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Prénom" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
        <Field label="Initiale" value={form.lastInitial} onChange={(v) => setForm({ ...form, lastInitial: v })} />
        <Field label="Rôle" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
        <Field label="Secteur" value={form.sector} onChange={(v) => setForm({ ...form, sector: v })} />
        <Field label="Ordre" value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
      </div>
      <div className="mt-4">
        <Label>Texte</Label>
        <Textarea className="mt-1" rows={4} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() =>
            onUpdate({
              firstName: form.firstName,
              lastInitial: form.lastInitial,
              role: form.role,
              sector: form.sector,
              text: form.text,
              sortOrder: Number(form.sortOrder),
              active: form.active,
            })
          }
        >
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
