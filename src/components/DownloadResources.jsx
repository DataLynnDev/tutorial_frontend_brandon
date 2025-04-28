import { Clear, FileDownloadOutlined } from "@mui/icons-material";
import { ListItemButton, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const DownloadResources = ({ lesson, user }) => {
  const [downloadList, setDownloadList] = useState(lesson?.downloads || []);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:8000/v1/api/upload/${lesson.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newFile = response.data;
      setDownloadList((prev) => [...prev, newFile]);
      setSelectedFile(null);
      fileInputRef.current.value = null; // Reset the file input
    } catch (error) {
      console.error("Upload failed:", error);
      alert("No same file can be uploaded in this lesson");
    }
  };

  // console.log(downloadList);
  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get(
        `http://localhost:8000/v1/api/upload/${lesson.id}`
      );
      if (response.status === 200) {
        setDownloadList(response.data);
      }
    };
    fetchFiles();
  }, [lesson.id]);
  // console.log(downloadList);

  const uninstall = async (download_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/v1/api/uninstall/${download_id}`
      );
      if (response.status === 200) {
        setDownloadList((prev) =>
          prev.filter((download) => download.id !== download_id)
        );
      }
    } catch (error) {
      console.log("Uninstall failed:", error);
    }
  };
  return (
    <div>
      {user.role === "admin" && (
        <div className="flex items-center justify-between pb-2">
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </div>
      )}

      {downloadList?.map((item, index) => (
        <div className="group" key={index}>
          <ListItemButton className="flex px-[16px] items-center self-stretch text-textPrimary">
            {/* <div className=" bg-yellow-300"> */}
            <Typography
              style={{ fontFamily: "DMSans" }}
              variant="body1"
              className="flex-grow"
            >
              {item.file_name}
            </Typography>

            <div className="flex items-center">
              <div className="hidden group-hover:flex mr-2 rounded-full">
                {user.role === "admin" && (
                  <Clear
                    onClick={() => uninstall(item.id)}
                    style={{ fontSize: 18 }}
                  />
                )}
              </div>
              <FileDownloadOutlined
                onClick={() => handleDownload(item.file_link)}
                className="text-[#707070] text-active cursor-pointer"
              />
            </div>
          </ListItemButton>
        </div>
      ))}
    </div>
  );
};

export default DownloadResources;
