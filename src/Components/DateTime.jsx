import React, { useEffect, useState } from "react";

function DateTime({ className }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);
  return (
    <>
      <div className={`dateContainer textCenter ${className}`}>
        {" "}
        <h3> {time.toLocaleTimeString()} </h3>
        <p>
          {time.toLocaleDateString("utc", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </>
  );
}

export default DateTime;
