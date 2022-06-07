import React from "react";

export default function LoginForm(props) {
  return (
    //                <input  onChange={props.loginChangeHandler}
    <form
      className="signinForm"
      onSubmit={props.submitHandler}
      action="/"
      method="POST"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={props.changeHandler}
        value={props.loginInfo.Username}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={props.changeHandler}
        value={props.loginInfo.Password}
      />
      <button>Log-In</button>
    </form>
  );
}
