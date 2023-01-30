import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { authService } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const tooggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          required
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error}
      </form>
      <span onClick={tooggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue With Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue With Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
