import React from "react";

export default function LoginForm(props) {
  return (
    <form
      className="loginForm"
      onSubmit={props.submitHandler}
      action="/"
      method="POST"
    >
      <h2>Sosh Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={props.changeHandler}
        value={props.loginInfo.username}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={props.changeHandler}
        value={props.loginInfo.password}
      />
      <button>Log-In</button>
    </form>
  );
}
