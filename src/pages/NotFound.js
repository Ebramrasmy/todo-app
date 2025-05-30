import React from "react";
import errorImage from "../images/error-404.jpg";

function NotFound() {
  return (
    <div
      style={{
        height: "80vh",              
        display: "flex",              
        justifyContent: "center",     
        alignItems: "center",         
      }}
    >
      <img
        src={errorImage}
        alt="404 Not Found"
        style={{
          height: "80vh",            
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default NotFound;
