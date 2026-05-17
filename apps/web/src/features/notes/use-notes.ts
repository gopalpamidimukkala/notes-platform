import { useQuery } from "@tanstack/react-query";
import { notesService } from "./notes.service";

export function useNotes(search?: string) {
  return useQuery({
    queryKey: ["notes", search],

    queryFn: () => notesService.getNotes(search),
  });
}
