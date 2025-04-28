import { Typography } from "@mui/material";
import React, { useState } from "react";
import pic from "../assets/Lynn_Logo.png";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  ArrowForward,
  ArrowForwardTwoTone,
  KeyboardArrowRight,
} from "@mui/icons-material";
import axios from "axios";

const Header = ({ tutorialName, tutorialId, user, tutorialData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [tutorial, setTutorial] = useState(tutorialData)
  const deleteTutorial = async (tutorial_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tutorial? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      const response = await axios.delete(
        `http://localhost:8000/v1/api/tutorial/${tutorial_id}`
      );
      if (response.status === 200) {
        alert("Tutorial deleted successfully.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      alert("Failed to delete the tutorial. Please try again later.");
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#025BEC] via-[#0368FF] to-[#00D8D9] p-4 flex items-center relative">
        <div onClick={() => navigate("/")} className="flex cursor-pointer">
          <HomeOutlined className="text-white pr-3 pl-1" />
          <p
            style={{
              fontFamily: "DMSans, sans-serif",
            }}
            className="text-white"
          >
            Home
          </p>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img src={pic} style={{ width: 40, height: 31, marginRight: 2 }} />
          <Typography
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 19,
              fontWeight: "lighter",
            }}
            className="text-white"
            variant="h6"
          >
            DataLynn
          </Typography>
        </div>
      </div>
      <div className="flex items-center w-[87%]  ml-auto mr-auto justify-between">
        <div className="flex mb-5 items-center">
          {(location.pathname === "/" ||
            location.pathname === `/detail/${tutorialId}` ||
            location.pathname === "/my_courses") && (
            <div className="flex mt-5">
              <p
                style={{
                  fontFamily: "DMSans, sans-serif",
                }}
              >
                Home
              </p>
              <KeyboardArrowRight className="ml-3 mr-3" />
              <p
                style={{
                  fontFamily: "DMSans, sans-serif",
                }}
              >
                Tutorial
              </p>
            </div>
          )}

          {location.pathname === `/my_courses` && (
            <div className="flex mt-5">
              <KeyboardArrowRight className="ml-3 mr-3" />
              <p
                style={{
                  fontFamily: "DMSans, sans-serif",
                }}
              >
                My Courses
              </p>
            </div>
          )}
          {location.pathname === `/detail/${tutorialId}` && (
            <div className="flex mt-5">
              <KeyboardArrowRight className="ml-3 mr-3" />
              <p
                style={{
                  fontFamily: "DMSans, sans-serif",
                }}
              >
                {tutorialName}
              </p>
            </div>
          )}
        </div>
        {user &&
          user.role === "admin" &&
          location.pathname === `/detail/${tutorialId}` && (
            <div
              onClick={() => deleteTutorial(tutorialId)}
              className="bg-red-500 p-2 text-white rounded-lg cursor-pointer"
            >
              <p
                style={{
                  fontFamily: "DMSans, sans-serif",
                }}
              >
                Delete Tutorial
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Header;
