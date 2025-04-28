import React, { useEffect, useRef, useState } from "react";
import CommonMarkdown from "./CommonMarkdown";
import JupyterNodebookFrame from "./JupyterNodebookFrame";
import axios from "axios";
import { Typography } from "@mui/material";

const Code = ({ lesson, user }) => {
  const [file, setFile] = useState(null);
  const [right, setRight] = useState(lesson?.right);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchRight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/right/${lesson.id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setRight(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRight();
  }, [lesson.id]);

  const fileInputRef = useRef(null);
  const uploadRight = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Choose file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `http://localhost:8000/upload_right/${lesson.id}`,
        formData, // send formData here
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // this stays in config
        }
      );
      setRight(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Upload error:", error);
    }
  };
  return (
    <div className="Code pl-6 pr-6 w-1/2 flex flex-col items-start">
      {lesson?.rightType === false ? (
        <div
          className="CodeName flex py-[6px] px-[16px] items-center gap-2 self-stretch"
          style={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            fontFamily: "DMSans, sans-serif",
          }}
        >
          Text Book
        </div>
      ) : (
        <div
          className="CodeName flex py-[6px] px-[16px] items-center gap-2 self-stretch"
          style={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            fontFamily: "DMSans, sans-serif",
          }}
        >
          Code
        </div>
      )}
      {user.role === "admin" && (
        <div className="mt-4 w-full">
          <Typography variant="h5">Upload Right</Typography>
          <div className="w-full flex mt-3 justify-between items-center">
            <input
              type="file"
              accept=".md,.html"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button
              onClick={uploadRight}
              style={{
                padding: "8px",
                width: 130,
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
      <div className="overflow-auto">
        {/* I'm confused... */}
        {lesson?.rightType === false ? (
          <CommonMarkdown content={right} />
        ) : (
          <CommonMarkdown content={right} />
        )}
      </div>
    </div>
  );
};

export default Code;
