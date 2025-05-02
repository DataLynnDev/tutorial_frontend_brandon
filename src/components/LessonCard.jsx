import React, { useEffect, useState } from "react";
import img1 from "../assets/course.svg";
import countIcon from "../assets/countIcon.svg";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DownCircleOutlined } from "@ant-design/icons";
import { CheckCircleOutline } from "@mui/icons-material";

const DialogType = {
  NONE: "",
  LOGIN: "LOGIN",
  SUBSCRIBE: "SUBSCRIBE",
};

const LessonCard = ({ data, user }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState({});

  // useEffect(() => {
  //   const savedSubscriptions =
  //     JSON.parse(localStorage.getItem("subscriptions")) || {};
  //   setSubscriptions(savedSubscriptions);
  // }, []);

  // const isSubscribed = subscriptions[data._id]?.isSubscribed ?? false;

  const [dialogOpen, setDialogOpen] = useState(DialogType.NONE);
  const {
    id = "",
    outside_img = img1,
    name = "Unknown Course",
    description = "No description available",
    price = 0,
    chapters = [],
  } = data || {};
  if (!data) {
    return <div>Loading...</div>;
  }
  let total = 0;
  chapters?.map((item) => {
    total += item.lessons.length;
  });
  return (
    <div
      className="Card flex flex-col w-full cursor-pointer"
      onClick={() => navigate(`/detail/${id}`, { state: { data, user } })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="Pic rounded-xl overflow-hidden">
        <img
          className={`w-full aspect-video bg-divider object-cover rounded-xl transition-transform duration-300 ease-in-out ${
            isHover ? "scale-110" : ""
          }`}
          src={outside_img || img1}
          alt="Course Thumbnail"
        />
      </div>
      <div className="pt-[0.875rem]">
        <Typography
          variant="h6"
          style={{
            fontFamily: "DMSans_Regular, sans-serif",
            fontWeight: "900",
            letterSpacing: "1.5px", // Adjust spacing as needed
          }}
          className="Card-title overflow-hidden text-ellipsis"
        >
          {name}
        </Typography>
      </div>

      <div className="Description overflow-hidden text-overflow ellipsis line-clamp-3 mt-[6px]">
        {/* <Tooltip title={description} arrow> */}
        <Typography
          style={{ fontFamily: "DMSans, sans-serif" }}
          variant="body1"
          noWrap
        >
          {description}
        </Typography>
        {/* </Tooltip> */}
      </div>

      {/* <div className="flex pt-[6px]">
        <img src={countIcon} alt="Lessons Count" />
        <Typography
          variant="body2"
          style={{ fontFamily: "DMSans, sans-serif" }}
          className="pl-1 text-gray-600"
        >
          {total} Lessons
        </Typography>
      </div> */}
    </div>
  );
};

export default LessonCard;
