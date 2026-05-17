import { NotesGrid } from "@/features/notes/components/notes-grid";

export function ArchivedPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Archived</h1>

        <p className="text-muted-foreground">Archived notes</p>
      </div>

      <NotesGrid filter="archived" />
    </div>
  );
}
