import { EditOutlined } from "@ant-design/icons";
import {
  ArrowBack,
  PlayLessonOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({
  id,
  name,
  banner,
  description,
  videoCount,
  viewCount,
  user,
}) => {
  const [currentName, setCurrentName] = useState(name);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentBanner, setCurrentBanner] = useState(banner);

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newBanner, setNewBanner] = useState(banner);

  const navigate = useNavigate();

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewDescription = (e) => setNewDescription(e.target.value);
  const handleNewBanner = (e) => setNewBanner(e.target.value);

  const updateHeader = async (tutoid) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/v1/api/tutorial/${tutoid}`,
        {
          name: newName,
          description: newDescription,
          outside_img: newBanner,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setCurrentName(newName);
        setCurrentDescription(newDescription);
        setCurrentBanner(newBanner);
        setToggle(false);
      }
    } catch (err) {
      console.error("Error updating tutorial:", err);
      alert("Failed to update tutorial. Check the console for more info.");
    }
  };

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const bannerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (bannerRef.current && !bannerRef.current.contains(event.target)) {
          setToggle(false);
        }
      }, 100);
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${currentBanner})`,
      }}
      className={`rounded-lg flex flex-row p-[2rem] bg-cover bg-no-repeat bg-[top]`}
    >
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[0.5rem]">
            <Typography
              style={{
                fontFamily: "DMSans_Bold, sans-serif",
              }}
              variant={`h4`}
              color={`white`}
            >
              {currentName}
            </Typography>
            <Typography
              style={{
                fontFamily: "DMSans, sans-serif",
              }}
              variant={`body2`}
              sx={{ color: "rgba(255, 255, 255, 0.90)" }}
            >
              {currentDescription}
            </Typography>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-6">
              <ArrowBack
                className="hover:cursor-pointer"
                onClick={() => navigate("/")}
                style={{ color: "white" }}
              />
              <div className="flex flex-row gap-1">
                <PlayLessonOutlined
                  fontSize={`small`}
                  style={{ color: "#FFFFFFCC" }}
                />
                <Typography
                  style={{
                    fontFamily: "DMSans, sans-serif",
                  }}
                  variant="caption"
                  color={`white`}
                >
                  {`${videoCount} Videos`}
                </Typography>
              </div>
              <div className="hidden flex-row gap-1">
                <VisibilityOutlined
                  fontSize={`small`}
                  style={{ color: "blue" }}
                />
                <Typography variant="caption" color={`white`}>
                  {viewCount}
                </Typography>
              </div>
            </div>
            {user.role === "admin" && (
              <EditOutlined
                className="text-white items-center justify-center"
                style={{
                  fontSize: 24,
                }}
                onClick={handleToggle}
              />
            )}
          </div>
        </div>

        {/* Editable fields */}
        {toggle === true && (
          <div ref={bannerRef} className="mt-4 flex flex-col gap-2">
            <input
              value={newName}
              onChange={handleNewName}
              placeholder="Change title"
              className="border p-2 rounded"
            />
            <input
              value={newDescription}
              onChange={handleNewDescription}
              placeholder="Change description"
              className="border p-2 rounded"
            />
            <input
              value={newBanner}
              onChange={handleNewBanner}
              placeholder="Change banner URL"
              className="border p-2 rounded"
            />
            <button
              onClick={() => updateHeader(id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
