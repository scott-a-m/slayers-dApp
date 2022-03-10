import React from "react";

const Loader = () => {
  return (
  <div className="spinner-grow text-warning" role="status" style={{background: "yellow"}}>
  <span className="visually-hidden">Loading...</span>
</div>
  )
}

export default Loader;
