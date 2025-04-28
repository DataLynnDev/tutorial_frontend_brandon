import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/Animation - 1742410434675.json";
import { useSpring, animated } from "@react-spring/web";

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };

  const [isClickable, setIsClickable] = useState(false);

  const navigate = useNavigate();

  const [springs, api] = useSpring(() => ({
    delay: 1400,
    from: { x: 37 },
    to: { x: -207 },
    config: { tension: 85, friction: 20 },
  }));

  useEffect(() => {
    api.start({
      delay: 1400,
      from: { x: 37 },
      to: { x: -207 },
      config: { tension: 85, friction: 20 },
    });
  }, [api]);

  const [springs_x, api_x] = useSpring(() => ({
    delay: 1400,
    from: { x: -500 },
    to: { x: -202 },
    config: { tension: 85, friction: 20 },
  }));

  useEffect(() => {
    api_x.start({
      delay: 1400,
      from: { x: -500 },
      to: { x: -202 },
      config: { tension: 85, friction: 20 },
    });
  }, [api_x]);

  const [springs_fade, api_fade] = useSpring(() => ({
    delay: 2100,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 600 },
    onRest: () => setIsClickable(true),
  }));

  useEffect(() => {
    api_fade.start({
      delay: 2100,
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 600 },
      onRest: () => setIsClickable(true),
    });
  }, [api_fade]);

  return (
    <div className="items-center justify-center flex flex-col min-h-screen">
      <div className="flex flex-row items-center">
        <animated.div
          style={{ ...springs }}
          className="flex items-center pl-[390px] bg-white"
        >
          <Lottie width={150} options={defaultOptions} speed={0.7} />
        </animated.div>
        <animated.div
          style={{
            borderRadius: 8,
            // backgroundColor: "pink",
            width: 470,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            zIndex: -1,
            ...springs_x,
          }}
        >
          <p style={{ fontSize: 50, fontFamily: "DMSans, sans-serif" }}>
            Payment Successful!
          </p>
        </animated.div>
      </div>
      <animated.div
        onClick={() => navigate("/")}
        style={{
          ...springs_fade,
          backgroundColor: "#3C82F6",
          color: "white",
          paddingLeft: 15,
          paddingRight: 15,
          height: 40,
          alignItems: "center",
          display: "flex",
          borderRadius: 5,
          cursor: "pointer",
          pointerEvents: isClickable ? "auto" : "none",
        }}
      >
        go back
      </animated.div>
    </div>
  );
};

export default Success;
