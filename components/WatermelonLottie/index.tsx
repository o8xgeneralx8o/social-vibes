"use client";

import React from 'react'
import Lottie from "react-lottie";
import animationData from "@/public/animations/watermelon.json";

const WatermelonLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },

  };
  return (
    <>
      <Lottie options={defaultOptions} isClickToPauseDisabled={true} />

    </>
  )
}

export default WatermelonLottie