import { Typography } from "@mui/material";
import React from "react";

const ContentIntro = ({ title, description, img }) => {
  return (
    <div
      className="pb-[2rem] ml-auto mr-auto items-center  sm:pr-[2.5rem] flex sm:flex-row flex-col gap-[20px] sm:gap-[64px] w-[90%]"
      style={{ borderBottom: `1px solid rgba(0,0,0,0.12)` }}
    >
      <div className="Left flex flex-col w-full h-full">
        <Typography
          className="flex self-stretch w-full font-bold"
          style={{ fontFamily: "DMSans_Bold, sans-serif" }}
          variant="h4"
        >
          {title}
        </Typography>
        <div
          className="Desc w-full pt-[16px] h-full"
          style={{
            color: "rgba(0, 0, 0, 0.60)",
          }}
        >
          <Typography
            className="flex self-stretch w-full"
            style={{ fontFamily: "DMSans, sans-serif" }}
            variant="body1"
          >
            {description}
          </Typography>
        </div>
      </div>
      <img
        src={img}
        className="sm:w-[200px] sm:h-[200px] w-full object-contain "
      ></img>
    </div>
  );
};

export default ContentIntro;
