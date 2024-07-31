import Link from 'next/link';
import styles from './styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Quote Application</h1>
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/quotes">View Quotes</Link>
          </li>
          <li>
            <Link href="/create-quote">Create a Quote</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}