import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSharedNote } from "../use-shared-note";

export function SharedNoteView() {
  const { shareId = "" } = useParams();

  const { data, isLoading } = useSharedNote(shareId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const note = data?.data;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">{note.title}</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {note.content}
        </div>
      </div>
    </div>
  );
}
