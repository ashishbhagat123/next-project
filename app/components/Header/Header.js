import { Link, useTransitionRouter } from "next-view-transitions";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { Logout } from "@/app/images";
import Cookies from "js-cookie";

export default function Header() {
  const pathname = usePathname();
  const { push } = useTransitionRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    push("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.navContainer}>
        <Link
          className={pathname.includes("/quotes") ? styles.active : ""}
          href="/quotes"
        >
          <p>Quotes</p>
        </Link>

        <Link
          className={pathname.includes("/create-quote") ? styles.active : ""}
          href="/create-quote"
        >
          <p>Create Quote</p>
        </Link>

        <div onClick={handleLogout} className={styles.logout}>
          <Logout />
        </div>
      </div>
    </div>
  );
}
