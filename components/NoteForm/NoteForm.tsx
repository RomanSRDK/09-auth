"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote, getAllTags } from "@/lib/api";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface FormValues {
  title: string;
  content: string;
  tag: Tag;
}

export default function NoteForm() {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormValues;
    mutate(values);
  };

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: (noteData: FormValues) => createNote(noteData),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
      toast.success("Your note has been created", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    },
    onError: () => {
      router.push("/notes/filter/All");
      toast.error("Failed to create note");
    },
  });

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={id}>Title</label>
        <input
          type="text"
          name="title"
          className={css.input}
          id={id}
          defaultValue={draft?.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={id}>Content</label>
        <textarea
          name="content"
          className={css.textarea}
          id={id}
          defaultValue={draft?.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={id}>Tag</label>
        <select
          name="tag"
          className={css.select}
          id={id}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {getAllTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push("/notes/filter/All")}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note +
        </button>
      </div>
    </form>
  );
}
