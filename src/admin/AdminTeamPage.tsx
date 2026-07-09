import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamMember,
  deleteTeamMember,
  fetchAdminTeam,
  updateTeamIntro,
  updateTeamMember,
  type ApiTeamMember,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type MemberForm = Omit<ApiTeamMember, "active">;

const emptyNewMember = {
  firstName: "",
  lastName: "",
  title: "",
  expertise: "",
  bio: "",
  email: "",
  linkedin: "",
  instagram: "",
};

function memberToForm(member: ApiTeamMember): MemberForm {
  return {
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    title: member.title,
    expertise: member.expertise,
    bio: member.bio,
    email: member.email ?? "",
    linkedin: member.linkedin ?? "",
    instagram: member.instagram ?? "",
    sortOrder: member.sortOrder,
  };
}

export default function AdminTeamPage() {
  const queryClient = useQueryClient();
  const [intro, setIntro] = useState("");
  const [newId, setNewId] = useState("");
  const [newMember, setNewMember] = useState(emptyNewMember);
  const [memberForms, setMemberForms] = useState<Record<string, MemberForm>>({});

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-team"],
    queryFn: fetchAdminTeam,
    retry: 1,
  });

  useEffect(() => {
    if (data?.intro) setIntro(data.intro);
    if (data?.members) {
      setMemberForms(Object.fromEntries(data.members.map((m) => [m.id, memberToForm(m)])));
    }
  }, [data]);

  const members = data?.members ?? [];

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-team"] });
    queryClient.invalidateQueries({ queryKey: ["team"] });
    queryClient.invalidateQueries({ queryKey: ["site-settings"] });
  };

  const introMutation = useMutation({
    mutationFn: () => updateTeamIntro(intro),
    onSuccess: () => {
      toast.success("Introduction mise à jour");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createTeamMember({
        id: newId,
        ...newMember,
        sortOrder: members.length,
      }),
    onSuccess: () => {
      toast.success("Membre ajouté");
      setNewId("");
      setNewMember(emptyNewMember);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: payload }: { id: string; data: MemberForm }) => updateTeamMember(id, payload),
    onSuccess: () => {
      toast.success("Membre enregistré");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      toast.success("Membre supprimé");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-muted-foreground">Chargement depuis la base de données…</p>;

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">Impossible de joindre l&apos;API</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {(error as Error).message}. Vérifiez que <code className="text-xs">npm run dev</code> affiche bien{" "}
          <code className="text-xs">[api] http://localhost:3001</code>.
        </p>
        <Button className="mt-4" size="sm" onClick={() => refetch()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold">Équipe</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Données lues depuis MySQL (<code className="text-xs">team_members</code>). Les photos restent dans le
            code source.
          </p>
        </div>
        {isFetching ? <span className="text-xs text-muted-foreground">Synchronisation…</span> : null}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <Label htmlFor="team-intro">Introduction</Label>
        <Textarea
          id="team-intro"
          className="mt-2"
          rows={3}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
        <Button className="mt-4" size="sm" onClick={() => introMutation.mutate()} disabled={introMutation.isPending}>
          Enregistrer l&apos;introduction
        </Button>
      </div>

      <div className="space-y-6">
        {members.map((member) => {
          const form = memberForms[member.id];
          if (!form) return null;
          return (
            <div key={member.id} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold">
                  {form.firstName} {form.lastName}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">({member.id})</span>
                </h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm("Supprimer ce membre ?")) deleteMutation.mutate(member.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Prénom" value={form.firstName} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, firstName: v } })} />
                <Field label="Nom" value={form.lastName} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, lastName: v } })} />
                <Field label="Titre" value={form.title} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, title: v } })} />
                <Field label="Expertise" value={form.expertise} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, expertise: v } })} />
                <Field label="E-mail" value={form.email} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, email: v } })} />
                <Field label="LinkedIn" value={form.linkedin} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, linkedin: v } })} />
                <Field label="Instagram" value={form.instagram} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, instagram: v } })} />
                <Field label="Ordre" value={String(form.sortOrder)} onChange={(v) => setMemberForms({ ...memberForms, [member.id]: { ...form, sortOrder: Number(v) || 0 } })} />
              </div>
              <div className="mt-4">
                <Label>Bio</Label>
                <Textarea
                  className="mt-1"
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setMemberForms({ ...memberForms, [member.id]: { ...form, bio: e.target.value } })}
                />
              </div>
              <Button
                className="mt-4"
                size="sm"
                disabled={updateMutation.isPending}
                onClick={() => updateMutation.mutate({ id: member.id, data: form })}
              >
                Enregistrer ce membre
              </Button>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6">
        <h3 className="mb-4 font-semibold">Ajouter un membre (sans photo)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="new-id">Identifiant (slug)</Label>
            <Input id="new-id" value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="prenom-nom" />
          </div>
          <div>
            <Label htmlFor="new-first">Prénom</Label>
            <Input id="new-first" value={newMember.firstName} onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="new-last">Nom</Label>
            <Input id="new-last" value={newMember.lastName} onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="new-title">Titre</Label>
            <Input id="new-title" value={newMember.title} onChange={(e) => setNewMember({ ...newMember, title: e.target.value })} />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="new-expertise">Expertise</Label>
          <Input id="new-expertise" value={newMember.expertise} onChange={(e) => setNewMember({ ...newMember, expertise: e.target.value })} />
        </div>
        <div className="mt-4">
          <Label htmlFor="new-bio">Bio</Label>
          <Textarea id="new-bio" rows={4} value={newMember.bio} onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })} />
        </div>
        <Button className="mt-4" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
          Ajouter
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
