"use client";

import { useState } from "react";
import styles from "./CreateQuote.module.scss";
import { useTransitionRouter } from "next-view-transitions";
import Cookies from "js-cookie";

export default function CreateQuote() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState({
    text: "",
    image: "",
  });
  const { replace, push } = useTransitionRouter();

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    const response = await fetch(
      "https://crafto.app/crafto/v1.0/media/assignment/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (data.error) {
      setError({
        text: "",
        image: data.error,
      });

      return;
    }
    return data[0].url;
  };

  const handleSubmit = async () => {
    if (!text || !image)
      return setError({
        image: image ? "" : "Required",
        text: text ? "" : "Required",
      });

    const token = Cookies.get("token");
    let mediaUrl = await handleImageUpload();
    const response = await fetch(
      "https://assignment.stage.crafto.app/postQuote",
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, mediaUrl }),
      }
    );
    const data = await response.json();
    if (data?.error === "Invalid token") {
      Cookies.remove("token");
      return replace("/login");
    }
    // Redirect to quotes page
    push("/quotes");
  };

  return (
    <div className={styles.container}>
      <h1>Create Quote</h1>
      <div className={styles.formWrapper}>
        <div className={styles.fieldWrapper}>
          <textarea
            className={error.text ? styles.textAreaError : ""}
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => {
              setError({});
              setText(e.target.value);
            }}
          />
          {error.text ? <p className={styles.errorText}>{error.text}</p> : null}
        </div>

        <div className={styles.fieldWrapper}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setError({});
              setImage(e.target.files[0]);
            }}
          />
          {error.image ? (
            <p className={styles.errorText}>{error.image}</p>
          ) : null}
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
