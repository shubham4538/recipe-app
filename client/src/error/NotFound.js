import React from "react";

function NotFound() {
  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  };
  const heading = {
    fontSize: "80px",
  };
  const subheading = {
    fontSize: "30px",
  };
  return (
    <div style={container}>
      <span style={heading}>404</span>
      <span style={subheading}>Page not found</span>
    </div>
  );
}

export default NotFound;
