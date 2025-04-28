import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

const Video = ({ lesson, complete, handleEnd, so }) => {
  const [youtubeReady, setYoutubeReady] = useState(false);

  const videoWrapRef = useRef(null);
  const opts = {
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };
  useEffect(() => {
    setYoutubeReady(false);
  }, [lesson?.video]);

  const handleReady = (ready) => {
    console.log("🚀[ready]", ready);
    const timer = window.setTimeout(() => {
      setYoutubeReady(true);
      window.clearTimeout(timer);
    }, 200);
  };

  const handlePlay = (play) => {
    console.log("🚀[play]", play);
    const current = play.target.getCurrentTime();
  };

  const handlePause = (pause) => {
    console.log("🚀[pause]", pause);
    const current = pause.target.getCurrentTime();
  };

  const [newLesson, setNewLesson] = useState(lesson);

  const handleError = (error) => {
    console.log("🚀[error]", error);
  };
  return (
    <div
      className="VideoWrap shrink-0 w-full grow-0 aspect-video relative"
      ref={videoWrapRef}
    >
      <div
        className="w-full h-full"
        style={
          youtubeReady
            ? { width: "100%" }
            : { maxWidth: "1px", maxHeight: "1px", overflow: "hidden" }
        }
      >
        {/* <video
          src={`http://127.0.0.1:8000/uploads/${video.filename}`}
          controls
          width="600"
        /> */}
        {/* <YouTube
          videoId={lesson.video}
          key={lesson.video}
          className="YouTube w-full h-full"
          iframeClassName="YouTubeIFrame w-full h-full"
          opts={opts}
          onReady={handleReady} // defaults -> noop
          onPlay={handlePlay} // defaults -> noop
          onPause={handlePause} // defaults -> noop
          onEnd={handleEnd} // defaults -> noop
          onError={handleError} // defaults -> noop
        /> */}
      </div>
      {!youtubeReady && (
        <div className="LoadingWrap w-full aspect-video flex justify-center items-center bg-divider">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Video;
