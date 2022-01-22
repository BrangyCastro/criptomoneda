import React from "react";

export const Alert = ({ message, color }) => {
  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show`}
      role="alert"
    >
      {message}
    </div>
  );
};
