"use client";

import { useState } from "react";
import styles from "./Login.module.scss";
import Cookies from "js-cookie";
import { useTransitionRouter } from "next-view-transitions";
import OTPInput from "react-otp-input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const { push } = useTransitionRouter();
  const [error, setError] = useState({});

  const handleLogin = async () => {
    if (!username || !otp) {
      setError({
        username: username ? "" : "Required",
        otp: otp ? "" : "Required",
      });
      return;
    }

    if (otp !== "1234") {
      setError({
        username: "",
        otp: "Wrong OTP",
      });
    }

    const response = await fetch("https://assignment.stage.crafto.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, otp }),
    });
    const data = await response.json();
    Cookies.set("token", data.token);
    push("/quotes");
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstHalf}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <div className={styles.fieldWrapper}>
            <input
              className={error.username ? styles.errorInput : ""}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setError({});
                setUsername(e.target.value);
              }}
            />
            {error.username ? (
              <p className={styles.error}>{error.username}</p>
            ) : null}
          </div>
          <div className={styles.fieldWrapper}>
            <OTPInput
              containerStyle={`${styles.otpInput} ${
                error.otp ? styles.errorInput : ""
              }`}
              placeholder="0000"
              value={otp}
              onChange={(value) => {
                setError({});
                setOtp(value);
              }}
              renderInput={(props) => <input {...props} />}
            />
            {error.otp ? <p className={styles.error}>{error.otp}</p> : null}
          </div>

          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
      <div className={styles.secondHalf}></div>
    </div>
  );
}
