import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Collapse, Typography } from "@mui/material";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  KeyboardArrowDown,
  KeyboardArrowRight,
  LineAxis,
} from "@mui/icons-material";

const AddTutorialPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [outside_img, setOutsideImage] = useState("");
  const [price, setPrice] = useState("");

  const [lost, setLost] = useState("");
  const [learn, setLearn] = useState([]);

  const [list, setList] = useState("");
  const [skills, setSkills] = useState([]);

  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [chapters, setChapters] = useState([]);

  const [lessons, setLessons] = useState([]);
  const [lessontitle, setLessontitle] = useState("");
  const [right, setRight] = useState("");
  const [left, setLeft] = useState("");
  const [rightType, setRightType] = useState(false);

  const [lessonskills, setLessonskills] = useState([]);
  const [skillList, setSkillList] = useState("");

  const [lessonlearn, setLessonlearn] = useState([]);
  const [learnList, setLearnList] = useState("");

  const [subscribe, setSubscribe] = useState("one_time");
  const [open, setOpen] = useState(false);

  const [file_name, setFile_name] = useState("");
  const [file_link, setFile_link] = useState("");
  const [downloads, setDownloads] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open); // Toggle visibility
  };

  const handleFileNameInput = () => {
    if (file_name.trim() !== "" && file_link.trim() !== "") {
      setDownloads((prev) => [
        ...prev,
        {
          file_name: file_name,
          file_link: file_link,
        },
      ]);
      setFile_name("");
      setFile_link("");
    }
  };

  const handleRightType = () => {
    setRightType(!rightType);
  };

  const handleLessonLearnInput = () => {
    if (learnList.trim() !== "") {
      setLessonlearn((prev) => [...prev, { lesson_learn: learnList }]);
      setLearnList("");
    }
  };

  const handleLessonSkillsInput = () => {
    if (skillList.trim() !== "") {
      setLessonskills((prev) => [...prev, { lesson_skill: skillList }]); // Store as an object
      setSkillList(""); // Clear the input field after adding
    }
  };

  // Handle the addition of learning items
  const handleLearnInput = () => {
    if (lost.trim() !== "") {
      setLearn((prev) => [...prev, { learning_item: lost }]); // Store as an object
      setLost(""); // Clear the input field after adding
    }
  };

  const handleSkillsInput = () => {
    if (list.trim() !== "") {
      setSkills((prev) => [...prev, { skill_item: list }]);
      setList("");
    }
  };

  const handleAddLesson = () => {
    if (lessontitle.trim()) {
      setLessons((prev) => [
        ...prev,
        {
          title: lessontitle,
          right: right,
          left: left,
          rightType: rightType,
          skills: lessonskills,
          learn: lessonlearn,
          downloads: downloads,
        },
      ]);
      setLessontitle("");
      setRight("");
      setLeft("");
      setLessonskills([]);
      setLessonlearn([]);
      setDownloads([]);
    } else {
      alert("Lesson name and description cannot be empty.");
    }
  };

  const handleAddChapter = () => {
    if (chapterName.trim() && chapterDescription.trim()) {
      setChapters((prev) => [
        ...prev,
        { name: chapterName, description: chapterDescription, lessons },
      ]);

      setChapterName("");
      setChapterDescription("");
      setLessons([]);
    } else {
      alert("Chapter name and description cannot be empty.");
    }
  };

  const handleSubscribe = (value) => {
    setSubscribe(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      outside_img: outside_img.trim(),
      description: description.trim(),
      price: parseFloat(price),
      learn,
      skills,
      chapters,
      subscribe: subscribe,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/v1/api/add_tutorial",
        payload
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const [pages, setPages] = useState(1);
  const plus = () => {
    setPages(pages + 1);
  };

  const minus = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  };

  return (
    <div className="bg-[#E2E2E2] min-h-screen items-center justify-center flex">
      <div
        className={`bg-white p-11 flex flex-col rounded-3xl items-center justify-center text-center  h-[780px] ${
          pages === 3 ? "w-[1050px]" : "w-[800px]"
        }`}
      >
        <Typography variant="h5" className="h-14">
          <p>Add New Tutorial</p>
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 69,
          }}
        >
          {pages === 1 ? (
            <>
              <div className="flex flex-col gap-12">
                <div className="flex flex-col">
                  <p className="mr-auto">Course Name</p>
                  <input
                    style={borderStyle}
                    className="h-12"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mr-auto">Course Image</p>
                  <input
                    style={borderStyle}
                    className="h-12"
                    type="text"
                    value={outside_img}
                    onChange={(e) => setOutsideImage(e.target.value)}
                    placeholder="Image URL"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mr-auto">Course Description</p>
                  <textarea
                    style={borderStyle}
                    className="h-28"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-16">
                <div className="flex flex-col">
                  <p className="mr-auto">Course Price</p>
                  <input
                    style={borderStyle}
                    className="h-12"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <Typography variant="h6">Select a Pricing Option</Typography>
                  <div></div>
                  <button
                    type="button"
                    onClick={() => handleSubscribe("one_time")}
                    style={{
                      padding: 10,
                      width: 120,
                      borderRadius: 14,
                      backgroundColor:
                        subscribe === "one_time" ? "lightblue" : "white",
                    }}
                  >
                    one_time
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubscribe("monthly")}
                    style={{
                      padding: 10,
                      width: 120,
                      borderRadius: 14,
                      backgroundColor:
                        subscribe === "monthly" ? "lightblue" : "white",
                    }}
                  >
                    monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubscribe("yearly")}
                    style={{
                      padding: 10,
                      width: 120,
                      borderRadius: 14,
                      backgroundColor:
                        subscribe === "yearly" ? "lightblue" : "white",
                    }}
                  >
                    yearly
                  </button>
                </div>
              </div>
            </>
          ) : pages === 2 ? (
            <div className="flex flex-col items-center gap-7">
              <div>
                <div className="flex gap-2">
                  <input
                    style={borderStyle}
                    type="text"
                    value={lost}
                    onChange={(e) => setLost(e.target.value)}
                    placeholder="Enter learn"
                  />
                  <Button
                    style={{
                      backgroundColor: "#E2E2E2",
                      width: 110,
                      padding: 10,
                      borderRadius: 14,
                    }}
                    onClick={handleLearnInput} // Correct function remains the same
                  >
                    Add Learn
                  </Button>
                </div>

                <div className="mt-5">
                  <h3>Learn List:</h3>
                  <div className="mt-5 h-28 overflow-auto">
                    <ul>
                      {learn.map((item, index) => (
                        <li className="text-left" key={index}>
                          {item.learning_item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="gap-2 flex">
                  <input
                    style={borderStyle}
                    type="text"
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                    placeholder="Enter skill"
                  />
                  <Button
                    style={{
                      backgroundColor: "#E2E2E2",
                      width: 110,
                      padding: 10,
                      borderRadius: 14,
                    }}
                    type="button"
                    onClick={handleSkillsInput}
                  >
                    Add Skill
                  </Button>
                </div>
                <div className="mt-5">
                  <h3>Skills List:</h3>
                  <div className="mt-5 h-28 overflow-auto">
                    <ul>
                      {skills.map((item, index) => (
                        <li className="text-left" key={index}>
                          {item.skill_item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : pages === 3 ? (
            <div className="flex flex-col h-[500px]">
              <div className="flex gap-20">
                <div className="flex flex-row">
                  <div className="flex flex-col gap-[22px] p-5 w-[340px] items-center">
                    <h3>Chapter</h3>
                    <input
                      style={borderStyle}
                      type="text"
                      value={chapterName}
                      onChange={(e) => setChapterName(e.target.value)}
                      placeholder="Chapter Name"
                    />
                    <textarea
                      style={borderStyle}
                      value={chapterDescription}
                      onChange={(e) => setChapterDescription(e.target.value)}
                      placeholder="Chapter Description"
                    />
                  </div>
                  <div className="h-[510px] overflow-auto w-[340px] shadow-md">
                    <div className="flex flex-col border-t border-black border-b gap-5 p-5 items-center">
                      <div
                        onClick={handleClick}
                        className="flex justify-center w-[100%] *:cursor-pointer"
                      >
                        <h3>Lesson</h3>
                      </div>

                      <div>
                        {/* <Collapse in={open}> */}
                        <div className="flex flex-col gap-6 items-center">
                          <input
                            style={borderStyle}
                            type="text"
                            value={lessontitle}
                            onChange={(e) => setLessontitle(e.target.value)}
                            placeholder="Lesson Title"
                          />

                          <Button
                            style={{
                              backgroundColor: "#E2E2E2",
                              width: 120,
                              padding: 10,
                              borderRadius: 14,
                            }}
                            type="button"
                            onClick={handleRightType}
                          >
                            Switch Type
                          </Button>
                          {rightType === false ? "md" : "code"}

                          <input
                            style={borderStyle}
                            type="text"
                            value={learnList}
                            onChange={(e) => setLearnList(e.target.value)}
                            placeholder="Learn"
                          />

                          <Button
                            style={{
                              backgroundColor: "#E2E2E2",
                              width: 120,
                              padding: 10,
                              borderRadius: 14,
                            }}
                            type="button"
                            onClick={handleLessonLearnInput}
                          >
                            Add Learn
                          </Button>
                          <ul className="list-disc list-inside">
                            {lessonlearn.map((item, index) => (
                              <li className="text-left" key={index}>
                                {item.lesson_learn}
                              </li>
                            ))}
                          </ul>

                          <input
                            style={borderStyle}
                            type="text"
                            value={skillList}
                            onChange={(e) => setSkillList(e.target.value)}
                            placeholder="Skill"
                          />
                          <Button
                            style={{
                              backgroundColor: "#E2E2E2",
                              width: 120,
                              padding: 10,
                              borderRadius: 14,
                            }}
                            type="button"
                            onClick={handleLessonSkillsInput}
                          >
                            Add Skills
                          </Button>

                          <ul className="list-disc list-inside">
                            {lessonskills.map((item, index) => (
                              <li className="text-left" key={index}>
                                {item.lesson_skill}
                              </li>
                            ))}
                          </ul>

                          <Button
                            style={{
                              backgroundColor: "#E2E2E2",
                              width: 120,
                              padding: 10,
                              borderRadius: 14,
                            }}
                            type="button"
                            onClick={handleAddLesson}
                          >
                            Add Lesson
                          </Button>
                        </div>
                        {/* </Collapse> */}
                      </div>
                    </div>
                  </div>
                  <div className="gap-5 flex flex-col w-[340px]">
                    <div>
                      <h3 className="p-5">Lessons List:</h3>
                      <div className="h-36 w-60 overflow-auto ml-auto mr-auto">
                        <ul className="list-disc list-inside items-center ">
                          {lessons.map((chap, index) => (
                            <li className="text-left" key={index}>
                              {chap.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-7 items-center">
                      <Button
                        style={{
                          backgroundColor: "#E2E2E2",
                          width: 130,
                          padding: 10,
                          borderRadius: 14,
                        }}
                        type="button"
                        onClick={handleAddChapter}
                      >
                        Add Chapter
                      </Button>

                      <h3>Chapters List:</h3>
                      <div className="h-36 w-60 overflow-auto">
                        <ul className="list-disc list-inside">
                          {chapters.map((chap, index) => (
                            <li className="text-left" key={index}>
                              {chap.name}: {chap.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[40px]">
                <Button
                  style={{
                    backgroundColor: "#E2E2E2",
                    width: 110,
                    padding: 10,
                    borderRadius: 14,
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>

        <div
          className="flex mt-auto justify-center gap-3 
        "
        >
          {pages > 1 ? (
            <ArrowBack className="cursor-pointer" onClick={minus} />
          ) : (
            <ArrowBack className="opacity-30 pointer-events-none" />
          )}
          {pages}
          {pages < 3 ? (
            <ArrowForward className="cursor-pointer" onClick={plus} />
          ) : (
            <ArrowForward className="opacity-30 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};

const borderStyle = {
  width: 300,
  padding: 10,
  border: "1px solid",
};

const innerStyle = {
  width: 250,
  padding: 10,
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  border: "solid",
};

export default AddTutorialPage;
