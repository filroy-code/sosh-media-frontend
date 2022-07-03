import React from "react";
import ModalUserCard from "./ModalUserCard";
import { useNavigate } from "react-router-dom";

export default function ModalUserList(props) {
  const navigate = useNavigate();

  function cardClickHandler(event) {
    event.stopPropagation();
    console.log(event.target);
    navigate(`/users/${event.target.textContent}`, { replace: true });
  }

  let userListDisplay = props.userList.map((user) => {
    return (
      <div className="modalUserCard" key={user._id} onClick={cardClickHandler}>
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
