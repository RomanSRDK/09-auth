import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  return {
    title: `${slug[0]} Notes | NoteHub`,
    description: `Browse your ${slug[0]} notes in NoteHub. Quickly find and manage notes that match the selected filter.`,
    openGraph: {
      title: `${slug[0]} Notes | NoteHub`,
      description: `Browse your ${slug[0]} notes in NoteHub. Quickly find and manage notes that match the selected filter.`,
      url: `/notes/filter/${slug[0]}`,
      images: {
        url: "/og-meta-notehub.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const tag = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag }],
    queryFn: () => fetchNotes({ page: 1, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
