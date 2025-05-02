import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LessonCard from "../components/LessonCard";
import countIcon from "../assets/countIcon.svg";
import Lottie from "react-lottie";

const MyCourses = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [isLoading, setIsLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);

  const [zaved, setZaved] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/v1/api/tutorials"
      );
      setTutorials(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    if (user?.role === "admin") {
      return;
    }
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/saved_tutorial/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
            withCredentials: true, // Ensure cookies are sent if needed
          }
        );
        setZaved(response.data.saved_tutorials); // Store saved tutorials in the state
      } catch (error) {
        console.error("Error fetching saved tutorials:", error);
        setZaved(null);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaved();
  }, [user?.id]);
  // zaved.map((inor, index) => {
  //   console.log(tutorials.find((item) => item.id === inor));
  // });

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const unsave = async (userId, tutorialId) => {
    const userConfirmed = window.confirm("Are you going to unsave?");
    if (!userConfirmed) {
      setSelectedId("");
      return; // Stop execution if the user cancels
    } else {
      alert("Tutorial unsaved successfully");
    }
    try {
      // setTonext(true); ?
      if (!userId || !tutorialId) {
        console.warn("Missing user ID or tutorial ID");
        return;
      }

      // Send DELETE request to backend
      const response = await axios.delete(
        `http://localhost:8000/delete_saved_tutorial/${userId}/${tutorialId}`,
        { withCredentials: true } // Ensure cookies/session are sent
      );

      // Check if request was successful
      if (response.status === 200) {
        setZaved((prev) => {
          const updated = prev.filter(
            (inor) => inor.tutorial_id !== tutorialId
          );
          if (updated.length === 0) {
            setShouldNavigate(true);
          }
          return updated;
        });
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error(
        "Error deleting saved tutorial:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/"); // ✅ safely navigate
    }
  }, [shouldNavigate, navigate]);

  const [selectedId, setSelectedId] = useState("");
  const handleSelectedId = (id) => {
    setSelectedId(id);
  };
  return (
    <div>
      <Header />
      <div className="w-[90%] ml-auto mr-auto mt-12">
        {user?.role === "client" && (
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <Typography
                style={{ fontFamily: "DMSans_Bold, sans-serif" }}
                variant="h5"
              >
                My Courses
              </Typography>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : zaved === null ? (
              <p>No tutorials available.</p>
            ) : (
              <div className="List w-full mb-[64px]">
                <div className="CourseList mt-[2rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[24px] gap-y-[50px]">
                  {zaved?.slice(0, 3).map((inor, index) => {
                    const element = tutorials?.find(
                      (item) => item.id === inor.tutorial_id
                    );
                    const formattedExpiresAtStr = inor.expires_at + "Z";
                    const expiresAt = new Date(formattedExpiresAtStr);
                    const now = new Date();
                    const timeDifference = expiresAt - now;

                    let calculateMonths = (startDate, endDate) => {
                      const start = new Date(startDate);
                      const end = new Date(endDate);

                      // Calculate the total number of months between start and end
                      let months =
                        end.getFullYear() * 12 +
                        end.getMonth() -
                        (start.getFullYear() * 12 + start.getMonth());

                      // Check if the end day is before the start day (in the same month difference)
                      if (end.getDate() < start.getDate()) {
                        months--;
                      } else if (end.getDate() == start.getDate()) {
                        if (end.getHours() < start.getHours()) {
                          months--;
                        } else if (end.getHours() == start.getHours()) {
                          if (end.getMinutes() < start.getMinutes()) {
                            months--;
                          } else if (end.getMinutes() == start.getMinutes()) {
                            if (end.getSeconds() < start.getSeconds()) {
                              months--;
                            }
                          }
                        }
                      }
                      return months;
                    };

                    const months = calculateMonths(now, expiresAt);

                    const days = Math.floor(
                      timeDifference / (1000 * 60 * 60 * 24)
                    );
                    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                    const minutes = Math.floor(timeDifference / (1000 * 60));
                    const seconds = Math.floor(timeDifference / 1000);
                    let total = 0;
                    element?.chapters?.map((item) => {
                      total += item.lessons.length;
                    });

                    return (
                      <div
                        key={index}
                        className="w-full h-full flex flex-col gap-1 group"
                      >
                        <LessonCard data={element} user={user} />

                        <div className="progress-bar">
                          <div className="flex justify-between items-center">
                            <div className="flex">
                              <img src={countIcon} alt="Lessons Count" />
                              <Typography
                                variant="body2"
                                style={{ fontFamily: "DMSans, sans-serif" }}
                                className="pl-1 text-gray-600"
                              >
                                {total} Lessons
                              </Typography>
                            </div>
                            {element?.subscribe === "one_time" ? (
                              <Typography
                                variant="body2"
                                style={{
                                  fontFamily: "DMSans, sans-serif",
                                }}
                                className="pl-1 text-amber-600"
                              >
                                Expires in{" "}
                                {months >= 1
                                  ? `${months}M`
                                  : days >= 1
                                  ? `${days}d`
                                  : hours >= 1
                                  ? `${hours}h `
                                  : minutes >= 1
                                  ? `${minutes}m `
                                  : seconds >= 1
                                  ? `${seconds}s`
                                  : ""}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                style={{
                                  fontFamily: "DMSans, sans-serif",
                                }}
                                className="pl-1 text-amber-600"
                              >
                                subscribed
                              </Typography>
                            )}
                          </div>
                          <div
                            className={`hidden ${
                              inor.tutorial_id !== selectedId &&
                              "group-hover:flex"
                            }`}
                          >
                            <Button
                              sx={{
                                backgroundColor: "#F6FAFD",
                                display: "flex",
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "15px",
                              }}
                              onClick={() => {
                                handleSelectedId(inor.tutorial_id);
                                unsave(user.id, inor.tutorial_id);
                              }}
                            >
                              remove subscription
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
