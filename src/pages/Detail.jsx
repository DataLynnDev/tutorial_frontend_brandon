import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import ExtendInfo from "../components/ExtendInfo";
import Chapters from "../components/Chapters";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import { useRef } from "react";

const DialogType = {
  NONE: "",
  LOGIN: "LOGIN",
  SUBSCRIBE: "SUBSCRIBE",
};

const Detail = () => {
  const location = useLocation();
  const initialData = location.state?.data;
  const user = location.state?.user;
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tonext, setTonext] = useState(false);
  const theme = useTheme();

  const matches = useMediaQuery("(min-width:600px)");

  // Fetch the latest tutorial data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!initialData?.id) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/v1/api/tutorial/${initialData.id}`
        );
        if (response.status === 200) {
          setTutorialData(response.data);
          setTonext(response.data.saved);
        }
      } catch (error) {
        console.error("Error fetching tutorial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData?.id]);

  const [detail, setDetail] = useState([]);

  const saveTutorial = async (tutorialId) => {
    const isConfirmed = confirm("Are you going to purchase the tutorial?");

    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:8000/v1/api/save_tutorial/${tutorialId}`,
          {},
          { withCredentials: true }
        );

        setDetail({ saved: true });
        // Check if response contains a checkout URL
      } catch (error) {
        console.error("Error saving tutorial:", error);

        // Show relevant error message
        if (error.response) {
          alert(
            error.response.data.detail ||
              "An error occurred while saving the tutorial."
          );
        } else {
          alert("Network error. Please try again.");
        }
      } finally {
        setTonext(false);
      }
      alert("Tutorial purchased successfully!");
      // Optionally update UI state here, e.g., setDetail({ saved: true, tutorial_id: tutorialId });
    } else {
      return;
    }
  };

  const subscribeTutorial = async (tutorialId) => {
    const isConfirmed = confirm("Are you going to subscribe to the tutorial?");
    if (isConfirmed) {
      try {
        setTonext(true);
        const response = await axios.post(
          `http://localhost:8000/v1/api/subscribe_monthly_tutorial/${tutorialId}`,
          {},
          { withCredentials: true } // Ensures session cookies are sent
        );
        setDetail({ saved: true });
      } catch (error) {
        console.error("Error saving tutorial:", error);

        // Show relevant error message
        if (error.response) {
          alert(
            error.response.data.detail ||
              "An error occurred while saving the tutorial."
          );
        } else {
          alert("Network error. Please try again.");
        }
      } finally {
        setTonext(false);
      }
      alert("Tutorial subscribed successfully!");
    } else {
      return;
    }
  };

  const subscribeYearlyTutorial = async (tutorialId) => {
    const isConfirmed = confirm("Are you going to subscribe to the tutorial?");
    if (isConfirmed) {
      try {
        setTonext(true);
        const response = await axios.post(
          `http://localhost:8000/v1/api/subscribe_yearly_tutorial/${tutorialId}`,
          {},
          { withCredentials: true } // Ensures session cookies are sent
        );
        setDetail({ saved: true });
      } catch (error) {
        console.error("Error saving tutorial:", error);

        // Show relevant error message
        if (error.response) {
          alert(
            error.response.data.detail ||
              "An error occurred while saving the tutorial."
          );
        } else {
          alert("Network error. Please try again.");
        }
      } finally {
        setTonext(false);
      }
      alert("Tutorial subscribed successfully!");
    } else {
      return;
    }
  };

  const prevSavedRef = useRef(detail?.saved);

  useEffect(() => {
    if (!user?.id || !initialData?.id) return;

    const fetchSavedDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/saved_detail/${user.id}/${initialData.id}`,
          { withCredentials: true }
        );
        setDetail(response.data);
      } catch (err) {
        console.error("Error fetching saved detail:", err);
      }
    };

    fetchSavedDetail(); // Initial fetch

    const interval = setInterval(fetchSavedDetail, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, [user?.id, initialData?.id]);

  useEffect(() => {
    if (
      prevSavedRef.current === true &&
      detail?.saved === false &&
      tutorialData.subscribe === "one_time"
    ) {
      alert("Your 6-month access period has ended.");
    }

    prevSavedRef.current = detail?.saved;
  }, [detail?.saved]);

  const unsave = async (userId, tutorialId) => {
    if (detail?.saved === true) {
      const userConfirmed = window.confirm("Are you going to unsave?");
      if (!userConfirmed) {
        return; // Stop execution if the user cancels
      } else {
        alert("Tutorial unsaved successfully");
      }
    }
    try {
      setTonext(true);
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
        setDetail({ saved: false });
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error(
        "Error deleting saved tutorial:",
        err.response?.data || err.message
      );
    } finally {
      setTonext(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading course...</div>;
  }

  if (!tutorialData) {
    return <div className="text-center text-gray-500">Course not found.</div>;
  }

  const {
    id,
    name,
    outside_img,
    description,
    chapters,
    views,
    learn,
    skills,
    isSubscribed,
  } = tutorialData;
  const getTotalVideoCount = (chapters) =>
    chapters?.reduce(
      (total, chapter) => total + (chapter?.lessons?.length || 0),
      0
    );
  return (
    <div>
      <Header
        user={user}
        tutorialData={tutorialData}
        tutorialId={id}
        tutorialName={name}
      />

      <div className="w-full flex flex-row">
        <div className="flex-1 flex flex-col">
          {matches ? (
            <div className="flex flex-col pb-16 gap-10 pt-7 w-[95%] ml-auto mr-auto">
              <Banner
                id={id}
                name={name}
                user={user}
                banner={outside_img}
                description={description}
                videoCount={getTotalVideoCount(chapters)}
                viewCount={views}
                tutorialData={tutorialData}
              />
              {/* {user?.role === "client" &&
                (detail?.saved === false ? (
                  <div className="flex gap-4">
                    {tutorialData.subscribe === false ? (
                      <button
                        onClick={() => {
                          saveTutorial(id);
                        }} // Call the save function only when clicked
                        className="w-40 h-10 flex bg-blue-500 text-white rounded items-center justify-center"
                        disabled={tonext}
                      >
                        {tonext ? (
                          <CircularProgress size={20} color="white" />
                        ) : (
                          "Purchase Tutorial"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          subscribeTutorial(id);
                        }}
                        className="h-10 w-32 flex bg-blue-500 text-white rounded items-center justify-center"
                        disabled={tonext}
                      >
                        {tonext ? (
                          <CircularProgress size={20} color="white" />
                        ) : (
                          "Subscribe"
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      unsave(user?.id, initialData?.id);
                    }}
                    className="p-2 w-32 bg-blue-500 text-white rounded"
                  >
                    Unsave Tutorial
                  </button>
                ))} */}

              <div className="grid grid-cols-12 gap-6">
                <Chapters
                  tutorialId={id}
                  chapters={chapters}
                  tutorial={tutorialData}
                  isSubscribed={isSubscribed}
                  saveTutorial={saveTutorial}
                  subscribeTutorial={subscribeTutorial}
                  subscribeYearlyTutorial={subscribeYearlyTutorial}
                  detail={detail}
                  videoCount={getTotalVideoCount(chapters)}
                  user={user}
                />
                <ExtendInfo
                  user={user}
                  tutorialId={id}
                  learn={learn}
                  skills={skills}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-[95%] ml-auto mr-auto">
              <Banner
                id={id}
                name={name}
                user={user}
                banner={outside_img}
                description={description}
                videoCount={getTotalVideoCount(chapters)}
                viewCount={views}
                tutorialData={tutorialData}
              />
              {/* {user?.role === "client" &&
                (detail?.saved === false ? (
                  <div className="flex gap-4">
                    {tutorialData.subscribe === false ? (
                      <button
                        onClick={() => {
                          saveTutorial(id);
                        }} // Call the save function only when clicked
                        className="w-40 h-10 flex bg-blue-500 text-white rounded items-center justify-center"
                        disabled={tonext}
                      >
                        {tonext ? (
                          <CircularProgress size={20} color="white" />
                        ) : (
                          "Purchase Tutorial"
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          subscribeTutorial(id);
                        }}
                        className="h-10 w-32 flex bg-blue-500 text-white rounded items-center justify-center"
                        disabled={tonext}
                      >
                        {tonext ? (
                          <CircularProgress size={20} color="white" />
                        ) : (
                          "Subscribe"
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      unsave(user?.id, initialData?.id);
                    }}
                    className="p-2 w-32 bg-blue-500 text-white rounded"
                  >
                    Unsave Tutorial
                  </button>
                ))} */}
              <div className="ml-10">
                <ExtendInfo
                  tutorialId={id}
                  user={user}
                  learn={learn}
                  skills={skills}
                />
              </div>
              <Chapters
                tutorialId={id}
                isSubscribed={isSubscribed}
                chapters={chapters}
                tutorial={tutorialData}
                saveTutorial={saveTutorial}
                subscribeTutorial={subscribeTutorial}
                subscribeYearlyTutorial={subscribeYearlyTutorial}
                detail={detail}
                user={user}
                videoCount={getTotalVideoCount(chapters)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
