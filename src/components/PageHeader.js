import React from "react";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageHeader(props) {
  const userInfo = React.useContext(UserContext);
  let navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: "0vh", transition: { duration: 0.4 } }}
      exit={{ y: "-100vh", transition: { duration: 0.4 } }}
      className="pageHeader"
    >
      <h1 className="soshTitle" id="soshTitle" onClick={() => navigate("/")}>
        Sosh
      </h1>
    </motion.div>
  );
}
