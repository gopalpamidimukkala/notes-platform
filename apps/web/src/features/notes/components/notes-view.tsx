import { NotesGrid } from "./notes-grid";
import { CreateNoteDialog } from "./create-note-dialog";
import { useState } from "react";

export function NotesView() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/50 p-6">
        <h1 className="text-3xl font-bold">Notes</h1>

        <p className="text-muted-foreground">Manage your collaborative notes</p>
      </div>

      <div className="p-6">
        <CreateNoteDialog />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
        />
        <NotesGrid />
      </div>
    </div>
  );
}
