import { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  metadataBase: new URL("https://notehub.com"),
  openGraph: {
    title: "404 - Page Not Found",
    description:
      "The page you are looking for does not exist or has been moved.",
    url: "/404",
    images: {
      url: "/og-meta-notehub.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub Preview",
    },
  },
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
