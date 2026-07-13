import AuthNavigation from "../AuthNavigation/AuthNavigation";
import Link from "next/link";

import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {/* <li className={css.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/All">Notes</Link>
          </li> */}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
