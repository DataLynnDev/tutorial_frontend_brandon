import { LockFilled } from "@ant-design/icons";
import {
  CheckCircle,
  ChevronRight,
  Close,
  ExpandMore,
  GraphicEq,
  PlayCircleOutline,
  List as ListIcon,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ContentsDrawer = ({
  isMobileScreen,
  chapters,
  tutorial,
  lesson,
  chapter,
  completed,
  chap,
  user,
  detail,
  chaptersAlt,
}) => {
  const [subStatus, setSubStatus] = useState(
    new Array(chapters && chapters.length).fill(true)
  );
  const [drawerShow, setDrawerShow] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(lesson.id);
  const navigate = useNavigate();

  // Converts video duration from seconds to "X min Y sec" format
  const renderVideoDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes
      ? `${minutes} min ${remainingSeconds} sec`
      : `${remainingSeconds} sec`;
  };

  const allLessons = chapters.flatMap((chapter) => chapter.lessons || []);

  // Toggles chapter expansion/collapse
  const toggleSubStatus = (index) => {
    setSubStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  // Handles drawer open/close
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (!open) {
      const focusTarget = document.getElementById("drawer-trigger-button");
      if (focusTarget) focusTarget.focus();

      // Delay hiding the drawer slightly to allow focus transition
      setTimeout(() => {
        setDrawerShow(open);
      }, 10); // 10ms should be enough
    } else {
      setDrawerShow(open);
    }
  };

  // Syncs selected lesson ID when tutorial updates
  useEffect(() => {
    if (tutorial?.selectedLessonId) {
      setSelectedLessonId(tutorial.selectedLessonId);
    }
  }, [tutorial?.selectedLessonId]);

  const [localDetail, setLocalDetail] = useState(detail);

  const saveTutorial = async (tutorialId) => {
    const isConfirmed = confirm("Are you going to purchase the tutorial?");

    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:8000/v1/api/save_tutorial/${tutorialId}`,
          {},
          { withCredentials: true }
        );

        setLocalDetail({ saved: true });
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
      }
      alert("Tutorial purchased successfully!");
      // Optionally update UI state here, e.g., setDetail({ saved: true, tutorial_id: tutorialId });
    } else {
      return;
    }
  };

  const prevSavedRef = useRef(localDetail?.saved);

  useEffect(() => {
    const fetchSavedDetail = async () => {
      try {
        if (!user?.id || !tutorial?.id) return;
        const response = await axios.get(
          `http://localhost:8000/saved_detail/${user.id}/${tutorial.id}`,
          { withCredentials: true }
        );
        setLocalDetail(response.data);
      } catch (err) {
        console.error("Error fetching saved detail:", err);
      }
    };

    fetchSavedDetail();
    const interval = setInterval(fetchSavedDetail, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, [user?.id, tutorial?.id]);

  useEffect(() => {
    if (
      prevSavedRef.current === true &&
      localDetail?.saved === false &&
      tutorial.subscribe === "one_time"
    ) {
      alert("Your 6-month access period has ended.");
    }

    prevSavedRef.current = localDetail?.saved;
  }, [localDetail?.saved]);

  const subscribeTutorial = async (tutorialId) => {
    const isConfirmed = confirm("Are you going to subscribe the tutorial?");
    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:8000/v1/api/subscribe_monthly_tutorial/${tutorialId}`,
          {},
          { withCredentials: true } // Ensures session cookies are sent
        );
        setLocalDetail({ saved: true });
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
        const response = await axios.post(
          `http://localhost:8000/v1/api/subscribe_yearly_tutorial/${tutorialId}`,
          {},
          { withCredentials: true } // Ensures session cookies are sent
        );
        setLocalDetail({ saved: true });
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
      }
      alert("Tutorial subscribed successfully!");
    } else {
      return;
    }
  };

  return (
    <div className="ContentDrawer">
      <Fragment key="left">
        <Box
          id="drawer-trigger-button"
          onClick={toggleDrawer(true)}
          className="text-textPrimary flex justify-center items-center cursor-pointer"
          sx={{ textTransform: "none" }}
        >
          <ListIcon className="mr-3" />
          {/* </IconButton> */}
          {!isMobileScreen && (
            <Typography
              style={{ fontFamily: "DMSans", fontWeight: 900 }}
              variant="body1"
              className="text-textPrimary"
            >
              Contents
            </Typography>
          )}
        </Box>
        {/* <p>{newcomplete === true ? "true" : "false"}</p> */}

        <Drawer
          anchor={isMobileScreen ? "bottom" : "left"}
          open={drawerShow}
          onClose={toggleDrawer(false)}
          ModalProps={{
            disableEnforceFocus: true,
          }}
          PaperProps={{
            style: {
              maxHeight: isMobileScreen ? "80vh" : "100%",
              height: isMobileScreen ? "80vh" : "100%",
              overflowY: "auto",
            },
          }}
        >
          <Box
            sx={{
              width: isMobileScreen ? "auto" : "100%",
            }}
            role="presentation"
          >
            <div className="flex py-2 px-4 items-center gap-4 self-stretch">
              <div className="text-textPrimary flex-1 flex-shrink-0">
                <Typography
                  style={{ fontFamily: "DMSans_Bold, sans-serif" }}
                  variant="h6"
                >
                  Contents
                </Typography>
              </div>
              <IconButton
                className="h-[40px] w-[40px] flex items-center justify-center"
                onClick={toggleDrawer(false)}
              >
                <Close className="h-[24px] w-[24px]" color="action" />
              </IconButton>
            </div>
            <Divider />
            <List
              sx={{
                width: isMobileScreen ? "100%" : "310px",
                // bgcolor: "background.paper",
                // backgroundColor: "blue",
                paddingY: "16px",
                gap: "4px",
              }}
              component="nav"
            >
              {chap
                ?.sort((a, b) => a.id - b.id)
                .map((chapter, indexChapter) => (
                  <div key={indexChapter}>
                    <ListItemButton
                      className="flex py-[12px] items-center" // Ensure this is flex
                      onClick={() => toggleSubStatus(indexChapter)}
                      sx={{ display: "flex", justifyContent: "space-between" }} // Flex with justifyContent
                    >
                      <Typography
                        className="text-textPrimary text-base not-italic font-normal tracking-[0.15px]"
                        style={{ fontFamily: "DMSans, sans-serif" }}
                        variant="body1"
                      >
                        {`${indexChapter + 1}. ${chapter?.name}`}
                      </Typography>
                      {subStatus[indexChapter] ? (
                        <ExpandMore color="action" />
                      ) : (
                        <ChevronRight color="action" />
                      )}
                    </ListItemButton>

                    <Collapse
                      in={subStatus[indexChapter]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {chapter.lessons.length > 0 ? (
                          chapter.lessons
                            .sort((a, b) => a.id - b.id)
                            .map((lesson, index) => {
                              if (Array.isArray(completed)) {
                                const progress =
                                  completed.find(
                                    (item) => item.lesson_id === lesson.id
                                  ) || null;

                                const lessonIndex = allLessons
                                  .sort((a, b) => a.id - b.id)
                                  .findIndex((l) => l.id === lesson.id);
                                const isDisabled =
                                  user.role !== "admin" &&
                                  localDetail?.saved === false &&
                                  lessonIndex >= 2;

                                return (
                                  <div className="flex" key={index}>
                                    <ListItem
                                      key={`lesson-${lesson.id}`}
                                      disablePadding
                                      className={`flex flex-col ${
                                        isDisabled ? "cursor-not-allowed" : ""
                                      }`}
                                      sx={{
                                        "&:not(:last-child)": {
                                          mb: "6px",
                                        },
                                      }}
                                    >
                                      <ListItemButton
                                        className="w-full" // Disables lessons beyond the first two
                                        disabled={isDisabled}
                                        onClick={() => {
                                          setSelectedLessonId(lesson.id);
                                          !isDisabled &&
                                            navigate(`/lesson/${lesson.id}`, {
                                              state: {
                                                lesson,
                                                chapters,
                                                tutorial,
                                                user,
                                                chapter,
                                                localDetail,
                                                chapterindex: indexChapter,
                                                chaptersAlt,
                                              },
                                            });
                                          // setTimeout(() => {
                                          //   window.location.reload();
                                          // }, 0);
                                        }}
                                      >
                                        {user.role === "admin" ? (
                                          ""
                                        ) : lesson.id === selectedLessonId ? (
                                          <GraphicEq color="info" />
                                        ) : (
                                          !isDisabled &&
                                          (progress ? (
                                            <CheckCircle color="success" />
                                          ) : (
                                            <PlayCircleOutline color="action" />
                                          ))
                                        )}

                                        <Typography
                                          style={{
                                            fontFamily: "DMSans, sans-serif",
                                            marginLeft: 13,
                                          }}
                                        >
                                          {lesson.title}
                                        </Typography>
                                      </ListItemButton>
                                    </ListItem>
                                    <div className="flex mb-[6px]">
                                      {isDisabled && (
                                        <>
                                          {localDetail?.saved === false ? (
                                            tutorial.subscribe ===
                                            "one_time" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Purchase Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      saveTutorial(tutorial.id);
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : tutorial.subscribe ===
                                              "monthly" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Subscribe Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      subscribeTutorial(
                                                        tutorial.id
                                                      );
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : tutorial.subscribe ===
                                              "yearly" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Subscribe Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      subscribeYearlyTutorial(
                                                        tutorial.id
                                                      );
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              } else {
                                const lessonIndex = allLessons.findIndex(
                                  (l) => l.id === lesson.id
                                );
                                const isDisabled =
                                  user.role !== "admin" &&
                                  localDetail.saved === false &&
                                  lessonIndex >= 2;

                                return (
                                  <div className="flex" key={index}>
                                    <ListItem
                                      key={`lesson-${lesson.id}`}
                                      disablePadding
                                      className={`flex flex-col ${
                                        isDisabled ? "cursor-not-allowed" : ""
                                      }`}
                                      sx={{
                                        "&:not(:last-child)": {
                                          mb: "6px",
                                        },
                                      }}
                                    >
                                      <ListItemButton
                                        className="w-full"
                                        // Disables lessons beyond the first two
                                        disabled={isDisabled}
                                        onClick={() => {
                                          setSelectedLessonId(lesson.id);
                                          !isDisabled &&
                                            navigate(`/lesson/${lesson.id}`, {
                                              state: {
                                                lesson,
                                                chapters,
                                                tutorial,
                                                user,
                                                chapter,
                                                localDetail,
                                                chapterindex: indexChapter,
                                                chaptersAlt,
                                              },
                                            });
                                        }}
                                      >
                                        {user.role === "admin" ? (
                                          ""
                                        ) : lesson.id === selectedLessonId ? (
                                          <GraphicEq color="info" />
                                        ) : (
                                          !isDisabled &&
                                          (lesson.completed ? (
                                            <CheckCircle color="success" />
                                          ) : (
                                            <PlayCircleOutline color="action" />
                                          ))
                                        )}

                                        <Typography
                                          style={{
                                            fontFamily: "DMSans, sans-serif",
                                            marginLeft: 13,
                                          }}
                                        >
                                          {lesson.title}
                                        </Typography>
                                      </ListItemButton>
                                    </ListItem>
                                    <div className="flex mb-[6px]">
                                      {isDisabled && (
                                        <>
                                          {localDetail?.saved === false ? (
                                            tutorial.subscribe ===
                                            "one_time" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Purchase Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      saveTutorial(tutorial.id);
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : tutorial.subscribe ===
                                              "monthly" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Subscribe Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      subscribeTutorial(
                                                        tutorial.id
                                                      );
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : tutorial.subscribe ===
                                              "yearly" ? (
                                              <div className="flex pr-5">
                                                <Tooltip
                                                  title="Subscribe Tutorial"
                                                  arrow
                                                  PopperProps={{
                                                    modifiers: [
                                                      {
                                                        name: "offset",
                                                        options: {
                                                          offset: [0, -17],
                                                        },
                                                      },
                                                    ],
                                                  }}
                                                >
                                                  <LockFilled
                                                    onClick={() => {
                                                      subscribeYearlyTutorial(
                                                        tutorial.id
                                                      );
                                                    }}
                                                    className="justify-center text-[#9E9E9E] cursor-pointer"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            })
                        ) : (
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <PlayCircleOutline
                                  style={{ color: "#0000008F" }}
                                />
                              </ListItemIcon>
                              <Typography
                                style={{
                                  fontFamily: "DMSans, sans-serif",
                                }}
                              >
                                Coming Soon...
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        )}
                      </List>
                    </Collapse>
                  </div>
                ))}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default ContentsDrawer;
