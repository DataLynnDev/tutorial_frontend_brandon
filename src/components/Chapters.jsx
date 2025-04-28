import {
  CheckCircle,
  Clear,
  KeyboardArrowDown,
  KeyboardArrowRight,
  PlayCircleOutline,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonDialog from "./CommonDialog";
import {
  DownCircleOutlined,
  LockFilled,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./Tooltip.css";

const DialogType = {
  NONE: "",
  LOGIN: "LOGIN",
  SUBSCRIBE: "SUBSCRIBE",
};

const Chapters = ({
  tutorialId,
  chapters,
  tutorial,
  user,
  saveTutorial,
  subscribeTutorial,
  subscribeYearlyTutorial,
  detail,
  videoCount,
}) => {
  const pageSize = 10;
  const [page] = useState(1);
  const [expanded, setExpanded] = useState("panel0");
  const [completed, setCompleted] = useState([]);

  // console.log(videoCount);
  const navigate = useNavigate();

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
      }
    };

    fetchCompleted();
  }, [user.id]);

  const allLessons = chapters.flatMap((chapter) => chapter.lessons || []);
  const chaptersToDisplay = chapters?.slice(0, pageSize) || [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toggleChapter, setToggleChapter] = useState(false);

  const [chaptersAlt, setChaptersAlt] = useState(chaptersToDisplay);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleToggleChapter = () => {
    setToggleChapter(true);
  };

  const createChapter = async (tutorial_id) => {
    try {
      const payload = {
        name: name,
        description: description,
      };
      const response = await axios.post(
        `http://localhost:8000/v1/api/tutorials/${tutorial_id}/add_chapter`,
        payload
      );
      const newChapter = response.data;
      setChaptersAlt((prev) => [...prev, newChapter]);
      setName("");
      setDescription("");
      setToggleChapter(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const updateChapter = async (chapter_id) => {
    const response = await axios.put(
      `http://localhost:8000/chapter/${chapter_id}/update`,
      {
        name: newName,
        description: newDescription,
      }
    );
    if (response.status === 200) {
      setChaptersAlt((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.id === chapter_id
            ? {
                ...chapter,
                name: response.data.name,
                description: response.data.description,
              }
            : chapter
        )
      );
      setToggleUpdateChap(false);
    }
  };

  const deleteChapter = async (chapter_id) => {
    const response = await axios.delete(
      `http://localhost:8000/chapter/${chapter_id}/delete`
    );
    if (response.status === 200) {
      setChaptersAlt((prev) =>
        prev.filter((chapter) => chapter.id !== chapter_id)
      );
    }
  };

  const chapterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chapterRef.current && !chapterRef.current.contains(event.target)) {
        setToggleChapter(false);
        setName("");
        setDescription("");
      }
    };

    if (toggleChapter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleChapter]);

  const [title, setTitle] = useState("");
  const [rightType, setRightType] = useState(false);

  const [toggleLesson, setToggleLesson] = useState(false);

  const handleToggleLesson = () => {
    setToggleLesson(true);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMd = (e) => {
    setRightType(!rightType);
  };

  const [totalLesson, setTotalLesson] = useState(allLessons);

  const addLesson = async (chapter_id) => {
    try {
      const payload = {
        title: title,
        rightType: rightType,
      };
      const response = await axios.post(
        `http://localhost:8000/chapters/${chapter_id}/add_lesson`,
        payload
      );

      const brandLesson = response.data;
      if (response.status === 200) {
        setTotalLesson((prev) => [...prev, brandLesson]);
        setTitle("");
        setRightType(false);
        setChaptersAlt((prevChapters) =>
          prevChapters.map((chapter) =>
            chapter.id === chapter_id
              ? {
                  ...chapter,
                  lessons: chapter.lessons
                    ? [...chapter.lessons, brandLesson]
                    : [brandLesson], // fallback in case lessons is undefined
                }
              : chapter
          )
        );
        setToggleLesson(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lessonName, setLessonName] = useState("");
  const [toggleRightType, setToggleRightType] = useState(false);
  const handleLessonName = (e) => {
    setLessonName(e.target.value);
  };

  const handleRightType = () => {
    setToggleRightType(!toggleRightType);
  };

  const updateLesson = async (lesson_id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/v1/api/lesson/${lesson_id}`,
        {
          title: lessonName,
          rightType: toggleRightType,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setChaptersAlt((prevChapters) =>
          prevChapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === lesson_id
                ? {
                    ...lesson,
                    title: response.data.title,
                    rightType: response.data.rightType,
                  }
                : lesson
            ),
          }))
        );
        setLessonName("");
        setToggleRightType(false);
      }
    } catch (err) {
      console.error("Failed to update lesson:", err);
    }
  };

  const deleteLesson = async (lesson_id, chapter_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/v1/api/lesson/${lesson_id}`
      );

      if (response.status === 200) {
        setChaptersAlt((prevChapters) =>
          prevChapters.map((chapter) =>
            chapter.id === chapter_id
              ? {
                  ...chapter,
                  lessons: chapter.lessons.filter(
                    (lesson) => lesson.id !== lesson_id
                  ),
                }
              : chapter
          )
        );
      }
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  const lessonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (lessonRef.current && !lessonRef.current.contains(event.target)) {
          setTitle("");
          setRightType(false);
          setToggleLesson(false);
        }
      }, 200);
    };

    if (toggleLesson) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleLesson]);

  const [toggleUpdateChap, setToggleUpdateChap] = useState(false);

  const handleToggleUpdateChap = () => {
    setToggleUpdateChap(true);
  };

  const chapterUpdateRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (
          chapterUpdateRef.current &&
          !chapterUpdateRef.current.contains(event.target)
        ) {
          setToggleUpdateChap(false);
          setNewName("");
          setNewDescription("");
        }
      }, 200);
    };

    if (toggleUpdateChap) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleUpdateChap]);
  return (
    <div className="col-span-8 ml-10 mr-5">
      <div className="flex flex-col gap-6">
        <Typography
          style={{
            fontFamily: "DMSans_Bold, sans-serif",
          }}
          variant="h5"
        >
          Chapter
        </Typography>
        <div className="flex flex-col">
          {chaptersAlt?.map((chapter, chapterindex) =>
            expanded === `panel${chapterindex}` ? (
              <div key={chapterindex}>
                <div className="flex flex-row py-6 pl-4 pr-[8px] gap-4">
                  <Typography
                    style={{
                      fontFamily: "DMSans_Bold, sans-serif",
                    }}
                    sx={{ width: "1rem" }}
                    variant={`h5`}
                  >
                    {chapterindex + 1}
                  </Typography>
                  <div ref={chapterUpdateRef} className="flex-1 flex flex-col">
                    <div>
                      {user.role === "admin" ? (
                        toggleUpdateChap == false ? (
                          <Typography
                            onClick={handleToggleUpdateChap}
                            className="cursor-pointer"
                            style={{ fontFamily: "DMSans_Bold, sans-serif" }}
                            variant="h6"
                          >
                            {chapter.name}
                          </Typography>
                        ) : (
                          <input
                            value={newName}
                            onChange={handleNewName}
                            placeholder="change name"
                            className="border border-black pl-3 py-2"
                          />
                        )
                      ) : (
                        <Typography
                          style={{ fontFamily: "DMSans_Bold, sans-serif" }}
                          variant="h6"
                        >
                          {chapter.name}
                        </Typography>
                      )}
                    </div>
                    <div className="flex flex-col gap-[16px]">
                      <div>
                        {user.role === "admin" ? (
                          toggleUpdateChap == false ? (
                            <Typography
                              className="cursor-pointer"
                              onClick={handleToggleUpdateChap}
                              style={{
                                fontFamily: "DMSans, sans-serif",
                              }}
                              variant="body2"
                              color="#00000099"
                            >
                              {chapter.description}
                            </Typography>
                          ) : (
                            <input
                              value={newDescription}
                              onChange={handleNewDescription}
                              placeholder="change description"
                              className="border w-full border-black h-6 mt-3 text-xs pl-3"
                            />
                          )
                        ) : (
                          <Typography
                            style={{
                              fontFamily: "DMSans, sans-serif",
                            }}
                            variant="body2"
                            color="#00000099"
                          >
                            {chapter.description}
                          </Typography>
                        )}
                      </div>

                      <List sx={{ paddingY: "8px" }}>
                        {chapter.lessons.length > 0 ? (
                          chapter.lessons.map((lesson, index) => {
                            if (Array.isArray(completed)) {
                              const progress =
                                completed.find(
                                  (item) => item.lesson_id === lesson.id
                                ) || null;

                              const lessonIndex = totalLesson.findIndex(
                                (l) => l.id === lesson.id
                              );
                              const isDisabled =
                                user.role !== "admin" &&
                                detail.saved === false &&
                                lessonIndex >= 2;

                              return (
                                <div
                                  className="flex items-center group"
                                  key={index}
                                >
                                  <ListItem
                                    key={`lesson-${lesson.id}`}
                                    disablePadding
                                    className={`flex flex-col ${
                                      isDisabled ? "cursor-not-allowed" : ""
                                    }`}
                                    sx={{
                                      "&:not(:last-child)": {
                                        mb: "6px",
                                      },
                                    }}
                                  >
                                    <ListItemButton
                                      className="w-full"
                                      disabled={isDisabled} // Disables lessons beyond the first two
                                      onClick={() =>
                                        !isDisabled &&
                                        navigate(`/lesson/${lesson.id}`, {
                                          state: {
                                            lesson,
                                            chapters,
                                            tutorial,
                                            user,
                                            chapter,
                                            detail,
                                            chapterindex,
                                            chaptersAlt,
                                          },
                                        })
                                      }
                                    >
                                      {user.role === "admin"
                                        ? ""
                                        : !isDisabled &&
                                          (progress ? (
                                            <CheckCircle color="success" />
                                          ) : (
                                            <PlayCircleOutline color="action" />
                                          ))}

                                      <div className="w-full group flex items-center justify-between">
                                        <Typography
                                          style={{
                                            fontFamily: "DMSans, sans-serif",
                                            marginLeft: 13,
                                          }}
                                        >
                                          {lesson.title}
                                        </Typography>
                                      </div>
                                    </ListItemButton>
                                    <Divider className="w-full" />
                                  </ListItem>
                                  {user.role === "admin" && (
                                    <div className="hidden px-3 group-hover:flex ml-1 rounded-full">
                                      <Clear
                                        className="cursor-pointer"
                                        onClick={() =>
                                          deleteLesson(lesson.id, chapter.id)
                                        }
                                        style={{ fontSize: 14 }}
                                      />
                                    </div>
                                  )}

                                  <div className="flex ml-3">
                                    {isDisabled && (
                                      <>
                                        {detail?.saved === false ? (
                                          tutorial.subscribe === "one_time" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  saveTutorial(tutorialId);
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Purchase to unlock
                                              </div>
                                            </div>
                                          ) : tutorial.subscribe ===
                                            "monthly" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  subscribeTutorial(tutorialId);
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Subscribe to unlock
                                              </div>
                                            </div>
                                          ) : tutorial.subscribe ===
                                            "yearly" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  subscribeYearlyTutorial(
                                                    tutorialId
                                                  );
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Subscribe to unlock
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            } else {
                              const lessonIndex = totalLesson.findIndex(
                                (l) => l.id === lesson.id
                              );
                              const isDisabled =
                                user.role !== "admin" &&
                                detail.saved === false &&
                                lessonIndex >= 2;
                              return (
                                <div
                                  className="flex items-center group"
                                  key={index}
                                >
                                  <ListItem
                                    key={`lesson-${lesson.id}`}
                                    disablePadding
                                    className={`flex flex-col ${
                                      isDisabled ? "cursor-not-allowed" : ""
                                    }`}
                                    sx={{
                                      "&:not(:last-child)": {
                                        mb: "6px",
                                      },
                                    }}
                                  >
                                    <ListItemButton
                                      className="w-full"
                                      // Disables lessons beyond the first two
                                      disabled={isDisabled}
                                      onClick={() =>
                                        !isDisabled &&
                                        navigate(`/lesson/${lesson.id}`, {
                                          state: {
                                            lesson,
                                            chapters,
                                            tutorial,
                                            user,
                                            chapter,
                                            detail,
                                            chapterindex,
                                            chaptersAlt,
                                          },
                                        })
                                      }
                                    >
                                      {user.role === "admin"
                                        ? ""
                                        : !isDisabled &&
                                          (lesson.completed ? (
                                            <CheckCircle color="success" />
                                          ) : (
                                            <PlayCircleOutline color="action" />
                                          ))}

                                      <div className="w-full group flex items-center justify-between">
                                        <Typography
                                          style={{
                                            fontFamily: "DMSans, sans-serif",
                                            marginLeft: 13,
                                          }}
                                        >
                                          {lesson.title}
                                        </Typography>
                                      </div>
                                    </ListItemButton>

                                    <Divider className="w-full" />
                                  </ListItem>
                                  {user.role === "admin" && (
                                    <div className="hidden px-2 items-center ml-2 group-hover:flex gap-4 rounded-full">
                                      <input
                                        value={lessonName}
                                        onChange={handleLessonName}
                                        placeholder="edit lesson"
                                        className="border p-1 pl-2  border-black"
                                      />
                                      <div
                                        className={`${
                                          toggleRightType === false
                                            ? "bg-blue-400"
                                            : "bg-yellow-300"
                                        } p-1 rounded-3xl cursor-pointer`}
                                        onClick={handleRightType}
                                      >
                                        {toggleRightType === false
                                          ? "md"
                                          : "code"}
                                      </div>
                                      <button
                                        onClick={() => updateLesson(lesson.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        type="submit"
                                      >
                                        Submit
                                      </button>
                                      <Clear
                                        className="cursor-pointer"
                                        onClick={() =>
                                          deleteLesson(lesson.id, chapter.id)
                                        }
                                        style={{ fontSize: 14 }}
                                      />
                                    </div>
                                  )}
                                  <div className="flex ml-3">
                                    {isDisabled && (
                                      <>
                                        {detail?.saved === false ? (
                                          tutorial.subscribe === "one_time" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  saveTutorial(tutorialId);
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Purchase to unlock
                                              </div>
                                            </div>
                                          ) : tutorial.subscribe ===
                                            "monthly" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  subscribeTutorial(tutorialId);
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Subscribe to unlock
                                              </div>
                                            </div>
                                          ) : tutorial.subscribe ===
                                            "yearly" ? (
                                            <div className="icon-container">
                                              <LockFilled
                                                onClick={() => {
                                                  subscribeYearlyTutorial(
                                                    tutorialId
                                                  );
                                                }}
                                                className="justify-center text-[#9E9E9E] cursor-pointer"
                                              />
                                              <div className="tooltip">
                                                Subscribe to unlock
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          )
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          })
                        ) : (
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <PlayCircleOutline
                                  style={{ color: "#0000008F" }}
                                />
                              </ListItemIcon>
                              <Typography
                                style={{
                                  fontFamily: "DMSans, sans-serif",
                                }}
                              >
                                Coming Soon...
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        )}
                      </List>
                      {/* add lesson */}
                      <div className="flex justify-center">
                        {user.role === "admin" &&
                          (toggleLesson === false ? (
                            <PlusOutlined
                              className="ml-2"
                              onClick={handleToggleLesson}
                            />
                          ) : (
                            <div
                              ref={lessonRef}
                              className="gap-6 flex items-center justify-center"
                            >
                              <input
                                value={title}
                                onChange={handleTitle}
                                placeholder="add title"
                                className="border-black border py-2 px-3"
                              />

                              <Button
                                style={{
                                  backgroundColor: "#E2E2E2",
                                  width: 120,
                                  padding: 10,
                                  borderRadius: 14,
                                }}
                                type="button"
                                onClick={handleMd}
                              >
                                SWITCH TYPE
                              </Button>

                              {rightType === false ? "md" : "code"}

                              <Button
                                style={{
                                  backgroundColor: "#E2E2E2",
                                  padding: 10,
                                  borderRadius: 14,
                                }}
                                type="submit"
                                onClick={() => addLesson(chapter.id)}
                              >
                                Submit
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {user.role === "admin" && (
                    <div className="h-11 items-center flex gap-3">
                      {toggleUpdateChap === true && (
                        <button onClick={() => updateChapter(chapter.id)}>
                          submit
                        </button>
                      )}
                      <Clear
                        onClick={() => {
                          deleteChapter(chapter.id), setToggleUpdateChap(false);
                        }}
                      />
                    </div>
                  )}

                  <KeyboardArrowDown
                    className="cursor-pointer mr-2"
                    onClick={() => {
                      setExpanded(
                        expanded === `panel${chapterindex}`
                          ? ""
                          : `panel${chapterindex}`
                      ),
                        setToggleLesson(false);
                    }}
                    style={{ color: "#0000008f" }}
                  />
                </div>
                <Divider />
              </div>
            ) : (
              <div key={chapterindex}>
                <div className="flex flex-row py-6 px-4 gap-4 hover:bg-[#0000000A]">
                  <Typography
                    style={{
                      fontFamily: "DMSans_Bold, sans-serif",
                    }}
                    sx={{ width: "1rem" }}
                    variant="h5"
                  >
                    {chapterindex + 1}
                  </Typography>
                  <div className="flex-1 flex flex-col">
                    <Typography
                      style={{
                        fontFamily: "DMSans_Bold, sans-serif",
                      }}
                      variant="h6"
                    >
                      {chapter.name}
                    </Typography>
                  </div>
                  <KeyboardArrowRight
                    onClick={() => setExpanded(`panel${chapterindex}`)}
                    className="cursor-pointer"
                    style={{ color: "#0000008F" }}
                  />
                </div>
                <Divider />
              </div>
            )
          )}
          {/* <PlusOutlined style={{ fontSize: 21 }} /> */}
          <div className="flex justify-center">
            {user.role === "admin" &&
              (toggleChapter === false ? (
                <PlusOutlined
                  className="mt-6 flex ml-auto mr-auto"
                  onClick={handleToggleChapter}
                />
              ) : (
                <div
                  ref={chapterRef}
                  className="flex items-center justify-center gap-6 mt-6"
                >
                  <input
                    value={name}
                    onChange={handleName}
                    placeholder="name"
                    className="border border-black py-2 px-3"
                  />
                  <input
                    value={description}
                    onChange={handleDescription}
                    placeholder="description"
                    className="border border-black py-2 px-3"
                  />
                  <Button
                    style={{
                      backgroundColor: "#E2E2E2",
                      padding: 10,
                      borderRadius: 14,
                    }}
                    // className="bg-blue-600 text-white px-4 py-2 rounded"
                    type="submit"
                    onClick={() => createChapter(tutorialId)}
                  >
                    Submit
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
