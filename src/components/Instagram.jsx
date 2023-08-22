import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { useState } from "react";

const Instagram = () => {
  const containerRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };
  return (
    <React.Fragment>
      <div className="container" ref={containerRef}>
        <p>This is a paragraph.</p>
        <h1>This is a heading.</h1>
        <div>This is a div.</div>
        {videoFile && (
          <video controls height="240" width="320">
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
            Your browser does not support the video tag.
          </video>
        )}
        <span>This is a span.</span>
        <button onClick={handleDownloadVideo}>Download Video</button>
      </div>
      <input type="file" id="videoInput" accept="video/*" onChange={handleVideoChange} />
    </React.Fragment>
  );
};

export default Instagram;
