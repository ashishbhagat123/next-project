import Image from "next/image";
import styles from "./Quote.module.scss";

export default function Quote({ quote }) {
  return (
    <div className={styles.quote}>
      {quote.mediaUrl && quote.mediaUrl !== null ? (
        <Image
          loader={() => quote.mediaUrl}
          width={300}
          height={300}
          src={quote.mediaUrl}
          alt="Quote Image"
          className={styles.image}
        />
      ) : (
        <Image
          width={300}
          height={300}
          src={""}
          alt="Quote Image"
          className={styles.image}
        />
      )}
      <div className={styles.textOverlay}>
        <p>{quote.text}</p>
      </div>
      <div className={styles.details}>
        <span>{quote.username}</span>
        <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
