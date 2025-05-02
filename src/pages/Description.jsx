import { Box, Tab } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Video from "../components/Video";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TextBook from "../components/TextBook";
import DownloadResources from "../components/DownloadResources";
import { Clear } from "@mui/icons-material";
import axios from "axios";

const Description = ({
  lesson,
  complete,
  handleEnd,
  video,
  isMobileScreen,
  user,
  handleFileChange,
  handleUpload,
  fileInputRef,
  videoRef,
  handleLoadedMetadata,
  setVideo,
}) => {
  const [value, setValue] = useState("textBook");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue("textBook");

    const handleTabReset = () => {
      setValue("textBook");
    };

    window.addEventListener("popstate", handleTabReset);

    return () => {
      window.removeEventListener("popstate", handleTabReset);
    };
  }, [location.pathname]);

  // const [isCompleted, setIsCompleted] = useState(false);

  // const handleVideoEnd = () => {
  //   setIsCompleted(true); // Change state when the video ends
  // };

  const deletevideo = async (lesson_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/video/${lesson_id}`
      );
      if (response.status === 200) {
        setVideo(null);
      }
    } catch (error) {
      console.log("delete video error:", error);
    }
  };
  return (
    <div
      style={{ width: isMobileScreen ? "100%" : "50%" }}
      className="Description pl-6 pr-6 flex flex-col items-start gap-[16px] self-stretch flex-grow overflow-auto"
    >
      {video && (
        <video
          className="flex ml-auto mr-auto"
          src={`http://127.0.0.1:8000/uploads/${video?.filename}`}
          controls
          onEnded={handleEnd}
          ref={videoRef}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
      {user.role === "admin" && (
        <div className="flex w-full items-center justify-between">
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-60"
          />

          <div>
            {video && (
              <Clear
                className="cursor-pointer"
                onClick={() => deletevideo(video.lesson_id)}
                style={{ fontSize: 18 }}
              />
            )}
            <button
              onClick={handleUpload}
              style={{
                padding: "8px",
                width: 130,
                fontFamily: "DMSans, sans-serif",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: 16,
              }}
            >
              Upload & View
            </button>
          </div>
        </div>
      )}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            className="flex flex-col items-start text-textSecondary gap-[16px]"
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Tab
              label="Text book"
              value="textBook"
              style={{
                fontFamily: "DMSans, sans-serif",
              }}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Download resources"
              value="download"
              style={{
                fontFamily: "DMSans, sans-serif",
              }}
              sx={{ textTransform: "none" }}
            />
          </TabList>
          <TabPanel value="textBook" sx={{ paddingX: "0px", paddingY: "16px" }}>
            <TextBook user={user} lesson={lesson} />
          </TabPanel>
          {/* {lesson && ( */}
          {/* <TabPanel
            value="downloadResources"
            sx={{ paddingX: "0px", paddingY: "16px" }}
          >
            <DownloadResources lesson={lesson} />
          </TabPanel> */}
          {lesson && (
            <TabPanel
              value="download"
              sx={{ paddingX: "0px", paddingY: "16px" }}
            >
              <DownloadResources user={user} lesson={lesson} />
            </TabPanel>
          )}
          {/* )} */}
        </TabContext>
      </Box>
    </div>
  );
};

export default Description;
