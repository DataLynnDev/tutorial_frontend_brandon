import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useMount } from "ahooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentsDrawer from "../components/ContentsDrawer";
import Split from "react-split";
import Description from "./Description";
import Code from "../components/Code";
import Header from "../components/Header";
import axios from "axios";
import { useRef } from "react";

const Lesson = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    lesson,
    chapters,
    tutorial,
    user,
    chapter,
    detail,
    chapterindex,
    chaptersAlt,
  } = location.state || {};
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const navigate = useNavigate();
  // console.log(chaptersAlt);
  useMount(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  useEffect(() => {
    if (width < 600) {
      setIsMobileScreen(true);
    } else {
      setIsMobileScreen(false);
    }
  }, [width]);
  const [newLesson, setNewLesson] = useState(lesson);
  const [complete, setComplete] = useState(newLesson.complete);

  const [chap, setChap] = useState(chaptersAlt || []); // Ensure it doesn't start as undefined

  // Fetch the lesson data and update completion status
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/api/lesson/${user.id}/${chapter.id}/${lesson.id}`,
          {
            withCredentials: true, // Ensures cookies are sent along with the request
          }
        );
        if (response.status === 200) {
          const updatedLesson = response.data;
          setNewLesson(updatedLesson);
          setComplete(updatedLesson.complete);

          // Update the chap state with the correct completion status for all lessons
          setChap((prevChapters) =>
            prevChapters.map((item) => ({
              ...item,
              lessons: item.lessons.map((l) =>
                l.id === lesson.id
                  ? { ...l, complete: updatedLesson.complete }
                  : l
              ),
            }))
          );
        }
      } catch (error) {
        console.log("Error fetching lesson data", error);
      }
    };

    fetchLesson();
  }, [lesson.id, chapter.id, user.id]); // Ensure fetch happens only when necessary

  // Handle video end and update completion status for the lesson
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/api/lessons/${user.id}`,
          { withCredentials: true }
        );
        setCompleted(response.data || []);
      } catch (error) {
        console.log("fetch error lessons", error);
        setCompleted([]);
      }
    };

    fetchCompleted();
  }, []);

  const handleEnd = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/v1/api/lesson/${user.id}/${chapter.id}/${lesson.id}`,
        { complete: true }, // Mark this lesson as complete
        {
          withCredentials: true, // Ensures cookies (session_token) are sent
        }
      );

      const updatedLesson = response.data;

      // Update the local state to reflect the lesson's completion
      setComplete(updatedLesson.complete);
      setNewLesson(updatedLesson);

      // Update the chap state with the new lesson completion status
      setChap((prevChapters) =>
        prevChapters.map((item) => ({
          ...item,
          lessons: item.lessons.map((l) =>
            l.id === lesson.id ? { ...l, complete: true } : l
          ),
        }))
      );
      setCompleted((prevCompleted) => {
        const updatedCompleted = Array.isArray(prevCompleted)
          ? prevCompleted
          : [];
        return [...updatedCompleted, updatedLesson];
      });
    } catch (error) {
      console.log("Error marking lesson as complete", error);
    }
  };

  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [video, setVideo] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fileInputRef = useRef(null);
  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0]; // Get the selected file

    if (!file) {
      alert("Choose file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/upload/${lesson.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { file_path } = response.data;
      setVideoUrl(`http://127.0.0.1:8000/${file_path}`);

      // Fetch updated list of videos after upload
      fetchVideos();

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Video already uploaded for this lesson"
      ) {
        alert("Video already uploaded for this lesson");
      } else {
        alert("A video with the same file path has already been uploaded.");
      }
    }
  };

  useEffect(() => {
    // Fetch the list of videos whenever the lesson changes
    fetchVideos();
  }, [lesson.id]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/video/${lesson.id}`
      );
      setVideo(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
    }
  };
  const chapterNum = chapterindex + 1;
  // Debugging: log the updated chapters to check the completion status
  // const [splitInstance, setSplitInstance] = useState(null);

  // useEffect(() => {
  //   if (!isMobileScreen) {
  //     const instance = Split(["#left-pane", "#right-pane"], {
  //       sizes: [50, 50],
  //       minSize: 100,
  //       gutterSize: 10,
  //     });
  //     setSplitInstance(instance);
  //   }

  //   return () => {
  //     if (splitInstance && typeof splitInstance.destroy === "function") {
  //       splitInstance.destroy();
  //     }
  //     setSplitInstance(null);
  //   };
  // }, [isMobileScreen]);
  // console.log(lesson);

  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      // console.log("Video Duration: ", videoRef.current.duration);
    }
  };

  return (
    <div>
      <Header lessonId={lesson.id} />
      <div className="flex flex-col w-full">
        <div>
          {isMobileScreen && (
            <div className="flex mb-4 px-2 justify-between items-center">
              <Typography
                style={{ fontFamily: "DMSans" }}
                className="text-textPrimary pl-4"
                variant="body1"
              >
                Chapter {chapterNum}: {chapter.name}
              </Typography>
              <ContentsDrawer
                isMobileScreen={isMobileScreen}
                chapters={chapters}
                tutorial={tutorial}
                lesson={lesson}
                chapter={chapter}
                completed={completed}
                chap={chap}
                user={user}
                detail={detail}
                chaptersAlt={chaptersAlt}
              />
            </div>
          )}
        </div>
        {!isMobileScreen && (
          <div className="SubHeader flex flex-row pb-5 items-center self-stretch gap-6">
            <ul className="mt-2"></ul>
            <ContentsDrawer
              isMobileScreen={isMobileScreen}
              chapters={chapters}
              tutorial={tutorial}
              lesson={lesson}
              chap={chap}
              chapter={chapter}
              completed={completed}
              user={user}
              detail={detail}
              chaptersAlt={chaptersAlt}
            />
            <div className="w-[1px] h-[18px] bg-divider" />

            <Typography
              style={{ fontFamily: "DMSans" }}
              className="text-textPrimary"
              variant="body1"
            >
              Chapter {chapterNum}: {chapter.name}
            </Typography>
          </div>
        )}
        {!isMobileScreen && (
          <div style={{ width: "100%" }} className="flex">
            <Description
              lesson={lesson}
              complete={complete}
              user={user}
              handleEnd={handleEnd}
              isMobileScreen={isMobileScreen}
              video={video}
              setVideo={setVideo}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              fileInputRef={fileInputRef}
              videoRef={videoRef}
              handleLoadedMetadata={handleLoadedMetadata}
            />
            <Code isMobileScreen={isMobileScreen} lesson={lesson} user={user} />
          </div>
        )}
        {isMobileScreen && (
          <div className="flex flex-col">
            <Description
              lesson={lesson}
              complete={complete}
              user={user}
              handleEnd={handleEnd}
              isMobileScreen={isMobileScreen}
              video={video}
              setVideo={setVideo}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              fileInputRef={fileInputRef}
              videoRef={videoRef}
              handleLoadedMetadata={handleLoadedMetadata}
            />
            <Code isMobileScreen={isMobileScreen} lesson={lesson} user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
