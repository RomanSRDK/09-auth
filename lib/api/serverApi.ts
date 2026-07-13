import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
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

//Notes
export const fetchNotes = async ({
  page,
  search = "",
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search: search.trimStart(),
      perPage,
      tag,
    },
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

//Auth
export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data || null;
};

//Users
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

//
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}
