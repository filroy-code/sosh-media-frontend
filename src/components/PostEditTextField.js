import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function PostEditTextField(props) {
  const postEditTextFieldRef = React.useRef();
  const [bgColorState, setBgColorState] = React.useState("rgb(237, 246, 249)");
  React.useEffect(() => {
    postEditTextFieldRef.current.children[0].children[0].focus();
    setBgColorState("rgb(255, 221, 210)");
  }, []);
  return (
    <div>
      <TextField
        // onFocus sets the cursor to the end of the text input.
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        className="postContent"
        fullWidth
        onChange={props.postEditChangeHandler}
        value={props.postEditState}
        style={{
          width: "98%",
          margin: "10px",
          backgroundColor: bgColorState,
        }}
        ref={postEditTextFieldRef}
        multiline
        name="contentEdit"
      ></TextField>
    </div>
  );
}
