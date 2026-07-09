import { useQuery } from "@tanstack/react-query";
import { TEAM_INTRO, TEAM_MEMBERS, TEAM_PHOTO_ASSETS, type TeamMember } from "@/config/team";
import { fetchTeam, isApiAvailable, type ApiTeamMember } from "@/lib/cms-api";

function mergeTeamMember(api: ApiTeamMember): TeamMember {
  const assets = TEAM_PHOTO_ASSETS[api.id];
  return {
    id: api.id,
    firstName: api.firstName,
    lastName: api.lastName,
    title: api.title,
    expertise: api.expertise,
    bio: api.bio,
    email: api.email ?? undefined,
    linkedin: api.linkedin ?? undefined,
    instagram: api.instagram ?? undefined,
    theme: assets?.theme ?? "blue",
    photo: assets?.photo,
    initials: `${api.firstName[0] ?? ""}${api.lastName[0] ?? ""}`.toUpperCase(),
  };
}

const STATIC_TEAM = { intro: TEAM_INTRO, members: TEAM_MEMBERS };

export function useTeamCms() {
  return useQuery({
    queryKey: ["team"],
    placeholderData: STATIC_TEAM,
    queryFn: async () => {
      const available = await isApiAvailable();
      if (!available) return STATIC_TEAM;
      try {
        const data = await fetchTeam();
        if (data.members.length === 0) return STATIC_TEAM;
        return {
          intro: data.intro || TEAM_INTRO,
          members: data.members.map(mergeTeamMember),
        };
      } catch {
        return STATIC_TEAM;
      }
    },
    staleTime: 60_000,
  });
}
