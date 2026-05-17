import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notesService } from "../notes.service";
import { Button } from "@/components/ui/button";

export function CreateNoteDialog() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const createMutation = useMutation({
    mutationFn: notesService.createNote,

    onSuccess: () => {
      toast.success("Note created");

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      setTitle("");
      setContent("");
    },

    onError: () => {
      toast.error("Failed to create note");
    },
  });

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl">
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
        />

        <Button
          className="w-full"
          onClick={() =>
            createMutation.mutate({
              title,
              content,
            })
          }
        >
          Create Note
        </Button>
      </div>
    </div>
  );
}
