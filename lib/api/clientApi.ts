import { NewNote, Note } from "@/types/note";
import { User } from "@/types/user";
import { api } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserRequest {
  username: string;
}

type FetchNotesParams = {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
};

// Auth
export const register = async (credentials: AuthCredentials): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", credentials);

  return data;
};

export const login = async (credentials: AuthCredentials): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", credentials);

  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");

  return data || null;
};

//Users
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");

  return data;
};

export const updateMe = async (userData: UpdateUserRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);

  return data;
};

// Notes
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
  });

  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};
