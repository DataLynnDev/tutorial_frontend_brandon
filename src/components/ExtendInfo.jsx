import { PlusOutlined } from "@ant-design/icons";
import { Clear } from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ExtendInfo = ({ user, tutorialId, learn = [], skills = [] }) => {
  // ✅ Default to empty arrays
  const [newLearn, setNewLearn] = useState("");
  const [newLearnList, setNewLearnList] = useState(learn);
  const handleLearn = (e) => {
    setNewLearn(e.target.value);
  };

  const updateLearn = async (learning_id) => {
    const response = await axios.put(
      `http://localhost:8000/v1/api/tutorial/${learning_id}/learn`,
      {
        learning_item: newLearn,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setNewLearnList((prevLearns) =>
        prevLearns.map((learn) =>
          learn.id === learning_id
            ? { ...learn, learning_item: response.data.learning_item }
            : learn
        )
      );
      setNewLearn("");
    }
  };
  const [selectedId, setSelectedId] = useState("");
  // console.log(newLearnList);
  const selectId = (id) => {
    setSelectedId(id);
  };

  const [nore, setNore] = useState("");

  const handleNore = (e) => {
    setNore(e.target.value);
  };

  const createLearn = async (tutorial_id) => {
    const payload = {
      learning_item: nore,
    };
    const response = await axios.post(
      `http://localhost:8000/v1/api/learn/${tutorial_id}`,
      payload
    );
    const nLearn = response.data;
    if (response.status === 200) {
      setNewLearnList((prev) => [...prev, nLearn]);
    }
  };

  const learnRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (learnRef.current && !learnRef.current.contains(event.target)) {
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

  const [newSkill, setNewSkill] = useState("");
  const [newSkillList, setNewSkillList] = useState(skills);
  const handleSkill = (e) => {
    setNewSkill(e.target.value);
  };

  const updateSkill = async (skill_id) => {
    const response = await axios.put(
      `http://localhost:8000/v1/api/tutorial/${skill_id}/skill`,
      {
        skill_item: newSkill,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setNewSkillList((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skill_id
            ? { ...skill, skill_item: response.data.skill_item }
            : skill
        )
      );
      setNewSkill("");
    }
  };

  const [spike, setSpike] = useState("");
  const handleSpike = (e) => {
    setSpike(e.target.value);
  };

  const createSkill = async (tutorial_id) => {
    const payload = {
      skill_item: spike,
    };
    const response = await axios.post(
      `http://localhost:8000/v1/api/skill/${tutorial_id}`,
      payload
    );
    const nSkill = response.data;
    if (response.status === 200) {
      setNewSkillList((prev) => [...prev, nSkill]);
    }
  };

  const deleteLearn = async (learn_id) => {
    const response = await axios.delete(
      `http://localhost:8000/v1/api/tutorial/${learn_id}/learn`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setNewLearnList((prev) => prev.filter((learn) => learn.id !== learn_id));
    }
  };
  const deleteSkill = async (skill_id) => {
    const response = await axios.delete(
      `http://localhost:8000/v1/api/tutorial/${skill_id}/skill`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setNewSkillList((prev) => prev.filter((skill) => skill.id !== skill_id));
    }
  };

  const [learnToggle, setLearnToggle] = useState(false);

  const handleLearnToggle = () => {
    setLearnToggle(true);
  };

  const uploadLearnRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uploadLearnRef.current &&
        !uploadLearnRef.current.contains(event.target)
      ) {
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

  const skillRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillRef.current && !skillRef.current.contains(event.target)) {
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

  const [skillToggle, setSkillToggle] = useState(false);

  const handleSkillToggle = () => {
    setSkillToggle(true);
  };

  const uploadSkillRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uploadSkillRef.current &&
        !uploadSkillRef.current.contains(event.target)
      ) {
        setSkillToggle(false);
        setSpike("");
      }
    };

    if (skillToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [skillToggle]);
  return (
    <div className="col-span-4">
      <div className="overflow-y-auto flex flex-col gap-8">
        {/* What you will learn */}
        <div className="flex flex-col gap-2">
          <Typography
            style={{
              fontFamily: "DMSans_Bold, sans-serif",
            }}
            variant="h6"
          >
            What you will learn
          </Typography>
          <div className="flex flex-col gap-2">
            {newLearnList ? ( // ✅ Check if `learn` has values
              newLearnList.map((l, index) => (
                <div key={index} className="flex flex-row gap-[0.38rem]">
                  {user.role === "admin" ? (
                    l.id === selectedId ? (
                      <>
                        <input
                          value={newLearn}
                          onChange={handleLearn}
                          className="border border-black"
                          ref={learnRef}
                        />
                        <button
                          className="bg-blue-400 px-3 py-1 rounded-lg text-white"
                          onClick={() => {
                            updateLearn(selectedId), setSelectedId("");
                          }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <div className="flex gap-3 group cursor-pointer items-center">
                        <Typography
                          style={{
                            fontFamily: "DMSans, sans-serif",
                          }}
                          variant="body2"
                        >
                          •
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "DMSans, sans-serif",
                          }}
                          onClick={() => {
                            selectId(l.id), setNewLearn(l.learning_item);
                          }}
                          variant="body2"
                        >
                          {l.learning_item}
                        </Typography>
                        <div className="hidden group-hover:flex ml-1 rounded-full">
                          <Clear
                            onClick={() => deleteLearn(l.id)}
                            style={{ fontSize: 14 }}
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex gap-3 group">
                      <Typography
                        style={{
                          fontFamily: "DMSans, sans-serif",
                        }}
                        variant="body2"
                      >
                        •
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "DMSans, sans-serif",
                        }}
                        variant="body2"
                      >
                        {l.learning_item}
                      </Typography>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No learning objectives available.
              </Typography>
            )}

            {user.role === "admin" &&
              (learnToggle === false ? (
                <div>
                  <PlusOutlined onClick={handleLearnToggle} />
                </div>
              ) : (
                <div ref={uploadLearnRef} className="gap-3 flex">
                  <input
                    value={nore}
                    onChange={handleNore}
                    className="border border-black"
                  />
                  <button
                    type="submit"
                    onClick={() => {
                      createLearn(tutorialId), setNore("");
                    }}
                  >
                    Submit
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Skills you will gain */}
        <div className="flex flex-col gap-2">
          <Typography
            style={{
              fontFamily: "DMSans_Bold, sans-serif",
            }}
            variant="h6"
          >
            Skills you will gain
          </Typography>
          <div className="flex flex-row flex-wrap gap-2">
            {newSkillList ? ( // ✅ Check if `skills` has values
              newSkillList.map((skill, index) => (
                <div key={index}>
                  {user.role === "admin" ? (
                    skill.id === selectedId ? (
                      <div ref={skillRef}>
                        <input
                          value={newSkill}
                          onChange={handleSkill}
                          className="border border-black"
                        />
                        <button
                          className="bg-blue-400 px-3 py-1 rounded-lg text-white"
                          type="submit"
                          onClick={() => {
                            updateSkill(skill.id), setSelectedId("");
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3 group">
                        <div
                          className="bg-[#ebebeb] group"
                          onClick={() => {
                            selectId(skill.id), setNewSkill(skill.skill_item);
                          }}
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
                          {skill.skill_item}
                          <div className="hidden group-hover:flex ml-1 rounded-full">
                            <Clear
                              onClick={() => deleteSkill(skill.id)}
                              style={{ fontSize: 12 }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex gap-3">
                      <div
                        className="bg-[#ebebeb] "
                        style={{
                          fontFamily: "DMSans, sans-serif",
                          maxWidth: "350px",
                          padding: "8px 10px", // similar to MUI's chip padding
                          // backgroundColor: "#EBEBEB", // light gray like default chip
                          borderRadius: "16px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          lineHeight: 1.2,
                          display: "flex",
                          fontSize: 13,
                          alignItems: "center",
                        }}
                      >
                        {skill.skill_item}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No skills listed.
              </Typography>
            )}
          </div>
          {user.role === "admin" &&
            (skillToggle === false ? (
              <div>
                <PlusOutlined onClick={handleSkillToggle} />
              </div>
            ) : (
              <div ref={uploadSkillRef} className="gap-3 flex">
                <input
                  value={spike}
                  onChange={handleSpike}
                  className="border border-black"
                />
                <button
                  type="submit"
                  onClick={() => {
                    createSkill(tutorialId), setSpike("");
                  }}
                >
                  Submit
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExtendInfo;
