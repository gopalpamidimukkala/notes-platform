import { useState } from "react";

import { CreateNoteDialog } from "@/features/notes/components/create-note-dialog";
import { NotesGrid } from "@/features/notes/components/notes-grid";

export function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Notes</h1>

          <p className="text-muted-foreground">
            Organize your ideas and thoughts
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none md:w-[300px]"
        />
      </div>

      {/* Create Note */}

      <div className="mb-8">
        <CreateNoteDialog />
      </div>

      {/* Notes Grid */}

      <NotesGrid search={search} />
    </div>
  );
}
