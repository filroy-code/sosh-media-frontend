import React from "react";
import ModalUserCard from "./ModalUserCard";
import { useNavigate } from "react-router-dom";

export default function ModalUserList(props) {
  const navigate = useNavigate();

  let userListDisplay = props.userList.map((user) => {
    return (
      <div
        className="modalUserCard"
        key={user._id}
        onClick={() => {
          navigate(`/users/${user.username}`, { replace: true });
        }}
      >
        <ModalUserCard user={user}></ModalUserCard>
        <hr></hr>
      </div>
    );
  });
  return (
    <>
      <h2>{props.modalTitle}</h2>
      <div className="modalList">{userListDisplay}</div>
    </>
  );
}
