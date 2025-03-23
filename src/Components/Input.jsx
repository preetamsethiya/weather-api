import React from "react";

function Input({
  label,
  id,
  className,
  value,
  onChange,
  placeholder,
  type,
  Name,
  autoFocus,
  search,
  times,
}) {
  return (
    <>
      <div className={`componentInputContainer ${className}`}>
        {label && (
          <label className="componentLabel" htmlFor={id}>
            {label}{" "}
          </label>
        )}
        <label
          className={` componentInput ${
            search ? "componentInputPaddingLeft" : ""
          } ${times ? "componentInputPadding" : ""} `}
          htmlFor={id}
        >
          {search && search}
          <input
            id={id}
            value={value}
            name={Name}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={onChange}
          />
          {times && times}
        </label>
      </div>
    </>
  );
}

export default Input;
