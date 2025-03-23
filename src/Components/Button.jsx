import React from "react";

function Button({ className, children, onClick, id }) {
  return (
    <>
      <button id={id} onClick={onClick} className={className}>
        {children}
      </button>
    </>
  );
}

export default Button;
