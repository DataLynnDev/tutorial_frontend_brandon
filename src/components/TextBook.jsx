import { Chip, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CommonMarkdown from "./CommonMarkdown";
import axios from "axios";
import { Clear, PlusOneOutlined } from "@mui/icons-material";
import {
  ClearOutlined,
  PlusCircleFilled,
  PlusOutlined,
  XOutlined,
} from "@ant-design/icons";

const TextBook = ({ lesson, user }) => {
  const [file, setFile] = useState(null);
  const [left, setLeft] = useState(lesson.left);
  const [selectedId, setSelectedId] = useState("");
  const [value, setValue] = useState("");
  const [uploadToggle, setUploadToggle] = useState(false);

  const handleUploadToggle = () => {
    setUploadToggle(true);
  };

  const [learnToggle, setLearnToggle] = useState(false);

  const handleLearnToggle = () => {
    setLearnToggle(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [skilllist, setSkilllist] = useState(lesson?.skills || []);

  const editRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        const idToClear = selectedId;
        setTimeout(() => {
          setSelectedId((prev) => (prev === idToClear ? "" : prev));
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId]);

  const uploadRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
        setUploadToggle(false);
        setSpike("");
      }
    };

    if (uploadToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [uploadToggle]);

  const learnRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (learnRef.current && !learnRef.current.contains(event.target)) {
        setLearnToggle(false);
        setNore("");
      }
    };

    if (learnToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [learnToggle]);

  useEffect(() => {
    const getskills = async () => {
      const response = await axios.get(
        `http://localhost:8000/v1/api/lessonskill/${lesson.id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSkilllist(response.data);
      }
    };
    getskills();
  }, [lesson.id]);

  const handleToggleSkill = (id, text) => {
    setSelectedId(id);
    setValue(text);
  };

  const [nore, setNore] = useState("");

  const handleNore = (e) => {
    setNore(e.target.value);
  };

  const handleUploadSkill = async (lesson_id) => {
    try {
      const payload = {
        lesson_skill: nore,
      };
      const response = await axios.post(
        `http://localhost:8000/v1/api/lessonskill/${lesson_id}`,
        payload
      );
      setNore("");
      setLearnToggle(false);
      const newSkill = response.data;
      setSkilllist((prev) => [...prev, newSkill]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleChangeSkill = async (skillId) => {
    const response = await axios.put(
      `http://localhost:8000/v1/api/lessonskill/${skillId}`,
      {
        lesson_skill: value,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setSelectedId(""); // exit edit mode
      setSkilllist((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? { ...skill, lesson_skill: response.data.lesson_skill }
            : skill
        )
      );
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/v1/api/lessonskill/${skillId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSkilllist((prev) => prev.filter((skill) => skill.id !== skillId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const [learn, setLearn] = useState("");
  const [learnList, setLearnList] = useState(lesson?.learn);

  const handleLearn = (e) => {
    setLearn(e.target.value);
  };

  useEffect(() => {
    const handleFetchLearn = async () => {
      const response = await axios.get(
        `http://localhost:8000/v1/api/lessonlearn/${lesson.id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLearnList(response.data);
      }
    };
    handleFetchLearn();
  }, [lesson.id]);

  const [spike, setSpike] = useState("");

  const handleSpike = (e) => {
    setSpike(e.target.value);
  };

  const handleUploadLearn = async (lesson_id) => {
    const payload = {
      lesson_learn: spike,
    };
    try {
      const response = await axios.post(
        `http://localhost:8000/v1/api/lessonlearn/${lesson_id}`,
        payload
      );

      const newLesson = response.data;
      setLearnList((prev) => [...prev, newLesson]);
      setSpike("");
      setUploadToggle(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLearn = async (learnId) => {
    const response = await axios.put(
      `http://localhost:8000/v1/api/lessonlearn/${learnId}`,
      {
        lesson_learn: learn,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setSelectedId(""); // exit edit mode
      setLearnList((prevLearns) =>
        prevLearns.map((learn) =>
          learn.id === learnId
            ? { ...learn, lesson_learn: response.data.lesson_learn }
            : learn
        )
      );
    }
  };

  const deleteLearn = async (learnId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/v1/api/lessonlearn/${learnId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLearnList((prev) => prev.filter((learn) => learn.id !== learnId));
      }
    } catch (error) {
      console.log("delete failed: ", error);
    }
  };

  const handleToggleLearn = (id, text) => {
    setSelectedId(id);
    setLearn(text);
  };

  useEffect(() => {
    const fetchLeft = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/left/${lesson.id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setLeft(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeft();
  }, [lesson.id]);

  const fileInputRef = useRef(null);

  const uploadLeft = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Choose file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `http://localhost:8000/upload_left/${lesson.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLeft(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  return (
    <div className="TextBookContent flex flex-col items-start self-stretch">
      <div className="w-full border-[0] border-solid border-divider gap-6 flex-col flex">
        <div className="Learn text-textPrimary">
          <Typography
            style={{ fontFamily: "DMSans_Bold, sans-serif" }}
            variant="h6"
          >
            What will you Learn?
          </Typography>
          {learnList.map((item, index) => {
            return user.role === "admin" ? (
              <div key={index}>
                {selectedId === item.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      value={learn}
                      onChange={handleLearn}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleChangeLearn(item.id);
                        }
                      }}
                      ref={editRef}
                      className="border border-black px-2 py-1 w-80 text-sm"
                    />
                    <button
                      className="bg-blue-400 px-3 py-1 rounded-lg text-white"
                      type="submit"
                      onClick={() => handleChangeLearn(item.id)}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="group flex items-center pt-3 justify-between">
                    <li
                      style={{ fontFamily: "DMSans, sans-serif", fontSize: 14 }}
                      key={index}
                      className="cursor-pointer"
                      onClick={() =>
                        handleToggleLearn(item.id, item.lesson_learn)
                      }
                    >
                      {item.lesson_learn}
                    </li>
                    <div className="hidden group-hover:flex ml-1 rounded-full">
                      <Clear
                        onClick={() => deleteLearn(item.id)}
                        style={{ fontSize: 14 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <li
                style={{ fontFamily: "DMSans, sans-serif", fontSize: 14 }}
                key={index}
                className="pt-3"
              >
                {item.lesson_learn}
              </li>
            );
          })}
          {user.role === "admin" &&
            (uploadToggle === false ? (
              <PlusOutlined className="mt-4" onClick={handleUploadToggle} />
            ) : (
              <div ref={uploadRef} className="mt-2 gap-2 flex">
                <input
                  value={spike}
                  onChange={handleSpike}
                  className="border border-black px-2 py-1 w-80 text-sm"
                  placeholder="Add new"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleUploadLearn(lesson.id);
                    }
                  }}
                />
                <button
                  className="bg-blue-400 px-3 rounded-lg text-white"
                  onClick={() => handleUploadLearn(lesson.id)}
                >
                  Submit
                </button>
              </div>
            ))}
        </div>

        <div className="Skills">
          <div className="mb-2 text-textPrimary">
            <Typography
              style={{ fontFamily: "DMSans_Bold, sans-serif" }}
              variant="h6"
            >
              Skills you will gain
            </Typography>
          </div>
          <Stack
            direction="row"
            className="flex flex-wrap justify-start gap-[8px]"
          >
            {skilllist.map((item, index) => {
              return user.role === "admin" ? (
                <div key={index} className="items-center">
                  {selectedId === item.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        className="border border-black px-2 py-1 w-32 text-sm"
                        value={value}
                        onChange={handleValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleChangeSkill(item.id);
                          }
                        }}
                        ref={editRef}
                      />
                      <button
                        className="bg-blue-400 px-3 py-1 rounded-lg text-white"
                        type="submit"
                        onClick={() => handleChangeSkill(item.id)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        handleToggleSkill(item.id, item.lesson_skill)
                      }
                      className="bg-[#ebebeb] group"
                      style={{
                        fontFamily: "DMSans, sans-serif",
                        maxWidth: "350px",
                        padding: "8px 10px", // similar to MUI's chip padding
                        // backgroundColor: "#EBEBEB", // light gray like default chip
                        borderRadius: "16px",
                        cursor: "pointer",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        lineHeight: 1.2,
                        display: "flex",
                        fontSize: 13,
                        alignItems: "center",
                      }}
                    >
                      <p>{item.lesson_skill}</p>

                      <div className="hidden group-hover:flex ml-1 rounded-full">
                        <Clear
                          onClick={() => deleteSkill(item.id)}
                          style={{ fontSize: 12 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div key={index}>
                  <div
                    style={{
                      fontFamily: "DMSans, sans-serif",
                      maxWidth: "350px",
                      padding: "8px 10px", // similar to MUI's chip padding
                      backgroundColor: "#EBEBEB", // light gray like default chip
                      borderRadius: "16px",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      lineHeight: 1.2,
                      display: "inline-block",
                      fontSize: 13,
                    }}
                  >
                    {item.lesson_skill}
                  </div>
                </div>
              );
            })}
          </Stack>
          <div className="mt-2">
            {user.role === "admin" &&
              (learnToggle === false ? (
                <PlusOutlined onClick={handleLearnToggle} />
              ) : (
                <div ref={learnRef} className="gap-2 flex">
                  <input
                    value={nore}
                    onChange={handleNore}
                    className="border border-black px-2 py-1 w-32 text-sm"
                    placeholder="Add New"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleUploadSkill(lesson.id);
                      }
                    }}
                  />
                  <button
                    className="bg-blue-400 px-3 py-1 rounded-lg text-white"
                    onClick={() => handleUploadSkill(lesson.id)}
                  >
                    Submit
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {user.role === "admin" && lesson.rightType === true && (
        <div className="mt-4">
          <Typography variant="h5">Upload Left</Typography>
          <div className="w-full flex mt-3 justify-between items-center">
            <input
              type="file"
              accept=".md,.html"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button
              onClick={uploadLeft}
              style={{
                padding: "8px 16px",
                fontFamily: "DMSans, sans-serif",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Upload & View
            </button>
          </div>
        </div>
      )}

      <div className="Sessions flex flex-col items-start self-stretch">
        <CommonMarkdown content={left} />
      </div>
    </div>
  );
};

export default TextBook;
