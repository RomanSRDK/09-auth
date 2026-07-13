import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Create a new note in NoteHub to organize your ideas, tasks, and important information in one place.",
  metadataBase: new URL("https://notehub.com"),
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Create a new note in NoteHub to organize your ideas, tasks, and important information in one place.",
    url: `https://notehub.com/notes/action/create`,
    images: [
      {
        url: "/og-meta-notehub.jpg",
        width: 1200,
        height: 630,
        alt: "Note Preview",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
