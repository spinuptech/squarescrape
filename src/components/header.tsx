import React from "react";
import { style as common, colors } from "../styles/common";

export const Header = () => {
  const style = {
    container: {
      background: colors.primaryDark,
      color: colors.textLight,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "44px",
    },
    title: {
      fontWeight: 700,
      marginRight: "20px",
    },
    subTitle: {
      fontSize: ".8em",
      opacity: 0.75,
    },
  };

  return (
    <div style={style.container}>
      <div style={style.title}>SquareScrape</div>
      <div style={style.subTitle}>
        Move event and blog data from Squarespace feeds into an email friendly
        format.
      </div>
    </div>
  );
};
