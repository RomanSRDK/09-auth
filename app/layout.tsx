import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a modern note-taking application that helps you create, organize, edit, and quickly find your personal notes anytime and anywhere.",
  openGraph: {
    title: "NoteHub",
    description: "Application for managing personal notes.",
    url: "https://notehub.com",
    images: [
      {
        url: "/og-meta-notehub.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
