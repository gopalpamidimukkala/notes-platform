import { motion } from "framer-motion";
import { Trash2, Star, Archive } from "lucide-react";
import { useNotes } from "../use-notes";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notesService } from "../notes.service";
import { NotesSkeleton } from "./notes-skeleton";

type NotesGridProps = {
  filter?: "favorites" | "archived";

  search?: string;
};

export function NotesGrid({ filter, search = "" }: NotesGridProps) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      notesService.toggleFavorite(id, isFavorite),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, isArchived }: { id: string; isArchived: boolean }) =>
      notesService.toggleArchive(id, isArchived),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: notesService.deleteNote,

    onSuccess: () => {
      toast.success("Note deleted");

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: () => {
      toast.error("Failed to delete note");
    },
  });

  const { data, isLoading, isError } = useNotes();

  if (isLoading) {
    return (
      <div className="py-6">
        <NotesSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">Failed to load notes</div>
    );
  }

  const notes = data?.data ?? [];

  const filteredNotes = notes.filter((note: any) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    // Favorites Page

    if (filter === "favorites") {
      return note.isFavorite && !note.isArchived && matchesSearch;
    }

    // Archived Page

    if (filter === "archived") {
      return note.isArchived && matchesSearch;
    }

    // Default Dashboard

    return !note.isArchived && matchesSearch;
  });

  if (!filteredNotes.length) {
    let title = "No notes yet";

    let description =
      "Start organizing your ideas, thoughts, and projects by creating your first note.";

    if (filter === "favorites") {
      title = "No favorite notes";

      description =
        "Mark important notes as favorites to quickly access them later.";
    }

    if (filter === "archived") {
      title = "No archived notes";

      description = "Archived notes will appear here.";
    }

    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 rounded-full border border-border p-5 text-3xl">
          📝
        </div>

        <h3 className="text-2xl font-semibold">{title}</h3>

        <p className="mt-2 max-w-sm text-muted-foreground">{description}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredNotes.map((note: any, index: number) => (
        <motion.div
          key={note.id}
          onClick={() => navigate(`/dashboard/notes/${note.id}`)}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.05,
          }}
          className="group cursor-pointer rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{note.title}</h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    favoriteMutation.mutate({
                      id: note.id,

                      isFavorite: !note.isFavorite,
                    });
                  }}
                >
                  <Star
                    className={`h-4 w-4 ${
                      note.isFavorite
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    archiveMutation.mutate({
                      id: note.id,

                      isArchived: !note.isArchived,
                    });
                  }}
                >
                  <Archive
                    className={`h-4 w-4 ${
                      note.isArchived
                        ? "fill-blue-400 text-blue-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteMutation.mutate(note.id);
                  }}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                </button>
              </div>
            </div>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {note.content}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
