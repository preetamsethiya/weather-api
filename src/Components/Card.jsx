import React from "react";

function Card({ className, children }) {
  return <div className={`card ${className}`}>{children}</div>;
}

const LinkCard = ({ className, children }) => {
  return (
    <>
      <div className={`linkCard ${className}`}>{children}</div>
    </>
  );
};

export default Card;
export { LinkCard };
