import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import { api } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async ({
  page,
  search = "",
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search: search.trimStart(),
      perPage,
      tag,
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
