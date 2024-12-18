
import React, { useState, useEffect } from "react";
import RewindLoading from "./RewindLoading";

function Rewind() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // Set the loading duration to 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading ? (
        <div className="loading-screen">
          <RewindLoading />
        </div>
      ) : (
        <div className="content">
          <h1 className="text-5xl">Hello</h1>
          {/* Place other content here */}
        </div>
      )}
    </div>
  );
}

export default Rewind;
