import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNote } from "../use-note";
import { notesService } from "../notes.service";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { ShareNoteDialog } from "./share-note-dialog";

export function NoteEditor() {
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useNote(id);
  const note = data?.data;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [debouncedTitle] = useDebounce(title, 1000);
  const [debouncedContent] = useDebounce(content, 1000);

  useEffect(() => {
    if (!note) return;

    if (debouncedTitle === note.title && debouncedContent === note.content) {
      return;
    }

    updateMutation.mutate({
      title: debouncedTitle,
      content: debouncedContent,
    });
  }, [debouncedTitle, debouncedContent]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const updateMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      notesService.updateNote(id, data),

    onSuccess: () => {
      toast.success("Note updated");

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["note", id],
      });
    },

    onError: () => {
      toast.error("Failed to update note");
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col p-8">
      <div className="mb-6 flex items-center justify-between">
        {/* <Button
          onClick={() =>
            updateMutation.mutate({
              title,
              content,
            })
          }
        >
          Save Changes
        </Button> */}
        <div className="mb-4 text-sm text-muted-foreground ">
          {updateMutation.isPending ? "Saving..." : "Saved"}
        </div>

        <div className="mb-6">
          <ShareNoteDialog noteId={id} />
        </div>
      </div>

      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled Note"
        className="mb-6 border-none bg-transparent text-5xl font-bold outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        className="flex-1 resize-none border-none bg-transparent text-lg leading-9 outline-none"
      />
    </div>
  );
}
