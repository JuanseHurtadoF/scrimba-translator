"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [translatedText, setTranslatedText] = useState("Give us a sec...");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsRequestSent(!isRequestSent);

    const translation = await axios.get("/api/translate", {
      params: {
        text: text,
        language: language,
      },
    });

    setTranslatedText(translation.data.translation);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="/banner.png" alt="Banner" />
        </div>
        <div className={styles.translatorContainer}>
          <div className={styles.translator}>
            <p className={styles.text}>Text to translate 👇</p>
            <textarea
              onChange={handleChange}
              className={styles.input}
            ></textarea>
            <p className={styles.text}>
              {isRequestSent ? "Your translation 👇" : "Select language 👇"}
            </p>

            {!isRequestSent ? (
              <form className={styles.languages}>
                <div className={styles.language}>
                  <input
                    onChange={handleLanguageChange}
                    type="radio"
                    name="language"
                    id="spanish"
                    value="Spanish"
                  />
                  <label htmlFor="spanish">Spanish</label>
                </div>
                <div className={styles.language}>
                  <input
                    onChange={handleLanguageChange}
                    type="radio"
                    name="language"
                    id="french"
                    value="French"
                  />
                  <label htmlFor="french">French</label>
                </div>
                <div className={styles.language}>
                  <input
                    onChange={handleLanguageChange}
                    type="radio"
                    id="Japanese"
                    name="language"
                    value="japanese"
                  />
                  <label htmlFor="japanese">Japanese</label>
                </div>
                <button onClick={handleClick} className={styles.button}>
                  Translate
                </button>
              </form>
            ) : (
              <div className={styles.translation}>
                <div className={styles.input}>{translatedText}</div>
                <button onClick={handleClick} className={styles.button}>
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
