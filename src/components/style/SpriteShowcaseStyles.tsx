import * as React from "react";

export const SpriteShowcaseStyles = {
  gridItem: {
    height: "64px",
    minWidth: "64px",
    cursor: "pointer",
    textAlign: "center",
    position: "relative",
    "&:hover": {
      outline: "1px solid #8797ea",
    },
  },
  sprite: {
    imageRendering: "pixelated",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  showcase: {
    imageRendering: "pixelated",
    minHeight: "256px",
  },
  activeItem: {
    outline: "1px solid #c46b16",
  },
};
