import {
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ContentIntro from "../components/ContentIntro";
import tutorialImg from "../assets/tutorial.svg";
import LessonCard from "../components/LessonCard";
import axios from "axios";
import countIcon from "../assets/countIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import { Clear } from "@mui/icons-material";

const ITEMS_PER_PAGE = 9;

const Main = () => {
  const [tutorials, setTutorials] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nprice, setNPrice] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [zaved, setZaved] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const totalPages = Math.ceil(tutorials.length / ITEMS_PER_PAGE);
  const displayedTutorials = tutorials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user?.id || user?.role === "admin") return;
    const fetchSaved = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/saved_tutorial/${user?.id}`,
          { withCredentials: true }
        );
        setZaved(response.data?.saved_tutorials || []);
      } catch (error) {
        console.log("Error fetching saved tutorials:", error);
        setZaved(null);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaved();
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/v1/api/tutorials"
      );
      setTutorials(response.data);
    };
    fetchData();
  }, []);

  const handleNPrice = (e) => setNPrice(e.target.value);
  const handleSelectedId = (id) => setSelectedId(id);

  const updatePrice = async (tutorial_id) => {
    if (nprice === "" || nprice === null || nprice === undefined) {
      setSnack({
        open: true,
        message:
          "No price entered. Only subscription will be updated if selected.",
        severity: "info",
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/v1/api/tutorial/${tutorial_id}/price`,
        { price: nprice },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTutorials((prevTutorials) =>
          prevTutorials.map((tutorial) =>
            tutorial.id === tutorial_id
              ? { ...tutorial, price: response.data.price }
              : tutorial
          )
        );
        setSnack({
          open: true,
          message: "Price updated successfully!",
          severity: "success",
        });
      } else {
        setSnack({
          open: true,
          message: "Invalid price value.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error updating price:", error);
      setSnack({
        open: true,
        message: "Failed to update the price. Please enter a valid number.",
        severity: "error",
      });
    } finally {
      setSelectedId("");
      setNPrice("");
    }
  };

  const [nSubscribe, setNSubscribe] = useState("");
  const handleNSubscribe = (value) => {
    setNSubscribe(value);
  };

  const updateSubscription = async (tutorial_id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/v1/api/tutorial/${tutorial_id}/subscribe`,
        {
          subscribe: nSubscribe,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTutorials((prevTutorials) =>
          prevTutorials.map((tutorial) =>
            tutorial.id === tutorial_id
              ? { ...tutorial, subscribe: response.data.subscribe }
              : tutorial
          )
        );
        setSnack({
          open: true,
          message: "Subscription updated successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      setSnack({
        open: true,
        message: "Failed to update the subscription.",
        severity: "error",
      });
    } finally {
      setSelectedId("");
      setNSubscribe("");
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (selectedId) {
          setSelectedId("");
          setNPrice("");
          setNSubscribe("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId]);
  console.log(tutorials);
  return (
    <div>
      <Header user={user} />
      <div style={{ position: "absolute", left: "80%", top: "8%" }}>
        {user?.role === "admin" && (
          <>
            <h1>Welcome, {user.username}!</h1>
            <p>Role: {user.role}</p>
          </>
        )}
      </div>
      <ContentIntro
        img={tutorialImg}
        title="Tutorial"
        description="The Tutorial not only covers the theoretical aspects of AI but places significant
                    emphasis on practical application. Our curriculum provides an extensive range of
                    hands-on content and code, designed to enhance users' practical skills. Included in
                    our courses are cutting-edge AI technologies such as LLM, deep learning, GenAI, and
                    image generation."
      />

      <div className="w-[90%] ml-auto mr-auto mt-16">
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            style={{ fontFamily: "DMSans_Bold, sans-serif" }}
          >
            All Courses
          </Typography>

          {user?.role === "client" && zaved.length > 0 && (
            <div className="flex flex-col justify-between">
              <div className="flex justify-between">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/my_courses", { state: { user } })}
                >
                  See All
                </p>
              </div>
            </div>
          )}

          {user?.role === "admin" && (
            <Link to="/add_tutorial">
              <PlusOutlined style={{ fontSize: 25 }} />
            </Link>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : tutorials.length === 0 ? (
          <p>No tutorials available.</p>
        ) : (
          <div className="List mt-[40px] w-full mb-[64px]">
            <div className="CourseList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[24px]">
              {displayedTutorials.map((element) => {
                let total = element.chapters?.reduce(
                  (acc, chapter) => acc + chapter.lessons.length,
                  0
                );

                return (
                  <div
                    key={element.id}
                    className="w-full h-full flex flex-col gap-1 mb-10"
                  >
                    <LessonCard data={element} user={user} />
                    <div className="progress-bar flex flex-col">
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
                      </div>
                    </div>
                    {user?.role === "admin" ? (
                      <div
                        onClick={() => setSelectedId(element.id)}
                        className="Price group flex items-center gap-2 mt-4 cursor-pointer"
                      >
                        {element.price === 0 ? (
                          <div>
                            <Typography variant="h6">Free</Typography>
                          </div>
                        ) : (
                          <>
                            <div>
                              <Typography variant="h6">
                                ${element.price}
                              </Typography>
                            </div>
                            {element.subscribe === "one_time" && (
                              <p className="text-sm text-blue-500 font-medium flex items-center">
                                One-Time (6-Month Access)
                              </p>
                            )}
                            {element.subscribe === "monthly" && (
                              <p className="text-sm text-green-600 font-medium flex items-center">
                                Monthly Subscription
                              </p>
                            )}
                            {element.subscribe === "yearly" && (
                              <p className="text-sm text-amber-600 font-medium flex items-center">
                                Yearly Subscription
                              </p>
                            )}
                          </>
                        )}

                        <div
                          className={`hidden ${
                            element.id !== selectedId && "group-hover:flex"
                          } ml-1 rounded-full`}
                        >
                          <EditOutlined style={{ fontSize: 14 }} />
                        </div>
                        {element.id === selectedId && (
                          <div
                            ref={containerRef}
                            className="flex gap-3 items-center"
                          >
                            <Tooltip
                              title="One-Time Purchase"
                              arrow
                              className="cursor-pointer"
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -5],
                                    },
                                  },
                                ],
                              }}
                            >
                              <div
                                onClick={() => setNSubscribe("one_time")}
                                className={`${
                                  nSubscribe === "one_time"
                                    ? "bg-blue-400"
                                    : "bg-blue-500"
                                } w-6 h-6 rounded-2xl`}
                              />
                            </Tooltip>
                            <Tooltip
                              title="Monthly Purchase"
                              arrow
                              className="cursor-pointer"
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -5],
                                    },
                                  },
                                ],
                              }}
                            >
                              <div
                                onClick={() => setNSubscribe("monthly")}
                                className={`${
                                  nSubscribe === "monthly"
                                    ? "bg-green-400"
                                    : "bg-green-500"
                                } w-6 h-6 rounded-2xl`}
                              />
                            </Tooltip>
                            <Tooltip
                              title="Yearly Purchase"
                              arrow
                              className="cursor-pointer"
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -5],
                                    },
                                  },
                                ],
                              }}
                            >
                              <div
                                onClick={() => setNSubscribe("yearly")}
                                className={`${
                                  nSubscribe === "yearly"
                                    ? "bg-amber-400"
                                    : "bg-amber-500"
                                } w-6 h-6 rounded-2xl`}
                              />
                            </Tooltip>
                            <input
                              value={nprice}
                              onChange={handleNPrice}
                              placeholder="Price"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  updatePrice(element.id);
                                  if (nSubscribe) {
                                    updateSubscription(element.id);
                                  }
                                  setNSubscribe("");
                                }
                              }}
                              className="border border-black pl-2 w-14"
                            />
                            <ReloadOutlined
                              onClick={() => {
                                updatePrice(element.id);
                                if (nSubscribe) {
                                  updateSubscription(element.id);
                                }
                                setNSubscribe("");
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="Price flex items-center gap-2 mt-4">
                        {element.price === 0 ? (
                          <div>
                            <Typography variant="h6">Free</Typography>
                          </div>
                        ) : (
                          <>
                            <div>
                              <Typography variant="h6">
                                ${element.price}
                              </Typography>
                            </div>
                            {element.subscribe === "one_time" && (
                              <p className="text-sm text-blue-500 font-medium flex items-center">
                                One-Time (6-Month Access)
                              </p>
                            )}
                            {element.subscribe === "monthly" && (
                              <p className="text-sm text-green-600 font-medium flex items-center">
                                Monthly Subscription
                              </p>
                            )}
                            {element.subscribe === "yearly" && (
                              <p className="text-sm text-amber-600 font-medium flex items-center">
                                Yearly Subscription
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <Button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <Button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
