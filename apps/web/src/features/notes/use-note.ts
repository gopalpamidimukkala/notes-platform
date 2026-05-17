import { useQuery } from "@tanstack/react-query";
import { notesService } from "./notes.service";


export function useNote(id: string) {
  return useQuery({
    queryKey: ["note", id],

    queryFn: () => notesService.getNote(id),

    enabled: !!id,
  });
}
