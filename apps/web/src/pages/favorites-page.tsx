import { NotesGrid } from "@/features/notes/components/notes-grid";

export function FavoritesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Favorites</h1>

        <p className="text-muted-foreground">Your starred notes</p>
      </div>

      <NotesGrid filter="favorites" />
    </div>
  );
}
