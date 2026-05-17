import { useQuery } from "@tanstack/react-query";

import { notesService } from "./notes.service";

export function useSharedNote(shareId: string) {
  return useQuery({
    queryKey: ["shared-note", shareId],

    queryFn: () => notesService.getSharedNote(shareId),

    enabled: !!shareId,
  });
}
