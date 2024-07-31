"use client";

import { useState, useEffect } from "react";
import styles from "./Quotes.module.scss";
import { useTransitionRouter } from "next-view-transitions";
import Quote from "@/app/components/Quote/Quote";
import Cookies from "js-cookie";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { replace } = useTransitionRouter();

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${page}`,
          {
            headers: { Authorization: token },
          }
        );
        const data = await response.json();
        if (data?.error) {
          if (data.error === "Invalid token") {
            Cookies.remove("token");
            return replace("/login");
          }
        } else {
          setQuotes((prevQuotes) => [...prevQuotes, ...data?.data]);
        }
      } catch (error) {
        console.log(error, "error");
      }
      setLoading(false);
    };

    fetchQuotes();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.quotesContainer}>
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
      {loading ? <span class={styles.loader} /> : null}

      <button
        className={styles.fab}
        onClick={() => (window.location.href = "/create-quote")}
      >
        +
      </button>
    </div>
  );
}
