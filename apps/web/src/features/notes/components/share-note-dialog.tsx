import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { notesService } from "../notes.service";
import { Button } from "@/components/ui/button";

export function ShareNoteDialog({ noteId }: { noteId: string }) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("VIEW");

  const shareMutation = useMutation({
    mutationFn: () =>
      notesService.shareNote(noteId, {
        shareWithEmail: email,
        permission,
      }),

    onSuccess: (data) => {
      toast.success("Note shared successfully");
    },

    onError: () => {
      toast.error("Failed to share note");
    },
  });


  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />

          <h3 className="font-semibold">Share Note</h3>
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter collaborator email"
          type="email"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
        />

        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none"
        >
          <option value="VIEW">View</option>

          <option value="EDIT">Edit</option>
        </select>

        <Button
          className="w-full"
          onClick={() => shareMutation.mutate()}
          disabled={shareMutation.isPending}
        >
          {shareMutation.isPending ? "Sharing..." : "Share Note"}
        </Button>
      </div>
    </div>
  );
}
