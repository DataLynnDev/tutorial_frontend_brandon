import React, { useEffect, useRef, useState } from "react";
import CommonMarkdown from "./CommonMarkdown";
import JupyterNodebookFrame from "./JupyterNodebookFrame";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import RichTextEditor from "./RichTextEditor";
import ContentsDrawer from "./ContentsDrawer";

const Code = ({ lesson, user, isMobileScreen }) => {
  const [file, setFile] = useState(null);
  const [post, setPost] = useState("");
  const [right, setRight] = useState(lesson?.right);
  const [rightToggle, setRightToggle] = useState(true);

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
    try {
      const response = await axios.put(
        `http://localhost:8000/upload_right/${lesson.id}`,
        { right: post },
        {
          withCredentials: true, // this stays in config
        }
      );
      setRight(response.data);
      setRightToggle(true);
    } catch (error) {
      console.log("Upload error:", error);
    }
  };
  return (
    <div
      className={`Code pl-6 pr-6 ${
        isMobileScreen ? "w-full" : "w-1/2"
      } flex flex-col items-start`}
    >
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

      <div className="w-full">
        {/* I'm confused... */}
        {user.role === "admin" ? (
          rightToggle === false ? (
            <div>
              <RichTextEditor content={right} onChange={setPost} />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={uploadRight}
              >
                Submit
              </button>
            </div>
          ) : (
            <>
              <div
                className="raw-html  mt-4 break-words tracking-wide prose prose-h1:tracking-wider prose-strong:tracking-[1px]"
                dangerouslySetInnerHTML={{ __html: right }}
              />
              <button
                onClick={() => setRightToggle(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
            </>
          )
        ) : (
          <div
            className="raw-html mt-4 break-words tracking-wide prose prose-h1:tracking-wider prose-strong:tracking-[1px]"
            // style={{ fontFamily: "DMSans, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: right }}
          />
        )}
        {/* {lesson?.rightType === false && ( */}

        {/* )} */}
      </div>
    </div>
  );
};

export default Code;
