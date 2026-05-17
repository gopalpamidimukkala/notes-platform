import { api } from "@/lib/api";

export const notesService = {
  async getNotes(search?: string) {
    const response = await api.get("/notes", {
      params: {
        search,
      },
    });

    return response.data;
  },

  async createNote(data: { title: string; content: string }) {
    const response = await api.post("/notes", data);

    return response.data;
  },

  async deleteNote(id: string) {
    const response = await api.delete(`/notes/${id}`);

    return response.data;
  },

  async getNote(id: string) {
    const response = await api.get(`/notes/${id}`);

    return response.data;
  },

  async updateNote(
    id: string,
    data: {
      title: string;
      content: string;
    },
  ) {
    const response = await api.put(`/notes/${id}`, data);

    return response.data;
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const response = await api.put(`/notes/${id}`, {
      isFavorite,
    });

    return response.data;
  },

  async shareNote(
    id: string,
    data: {
      shareWithEmail: string;
      permission: string;
    },
  ) {
    const response = await api.post(`/notes/${id}/share`, data);

    return response.data;
  },

  async getSharedNote(shareId: string) {
    const response = await api.get(`/share/${shareId}`);

    return response.data;
  },

  async toggleArchive(id: string, isArchived: boolean) {
    const response = await api.patch(`/notes/${id}/archive`, {
      isArchived,
    });

    return response.data;
  },

  //   async deleteNote(id: string) {
  //     const response = await api.delete(`/notes/${id}`);

  //     return response.data;
  //   },
};
