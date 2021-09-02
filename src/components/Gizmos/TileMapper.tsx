import * as React from "react";
import top from "../../images/top.png";
import topLeft from "../../images/topLeft.png";
import topRight from "../../images/topRight.png";
import center from "../../images/center.png";
import left from "../../images/left.png";
import right from "../../images/right.png";
import bottomLeft from "../../images/bottomLeft.png";
import bottom from "../../images/bottom.png";
import bottomRight from "../../images/bottomRight.png";
import alone from "../../images/alone.png";
import absent from "../../images/absent.png";
import horizontalLeft from "../../images/horizontalLeft.png";
import horizontalRight from "../../images/horizontalRight.png";
import horizontalCenter from "../../images/horizontalCenter.png";
import verticalTop from "../../images/verticalTop.png";
import verticalBottom from "../../images/verticalBottom.png";
import verticalCenter from "../../images/verticalCenter.png";
import { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Collapse,
  Grid,
  IconButton,
} from "@material-ui/core";
import { BubbleChart, ExpandLess, ExpandMore } from "@material-ui/icons";
import ExpandedStats from "../Crunchy/ExpandedStats";

export const tileDefinitions = {
  center: center,
  top: top,
  bottom: bottom,
  left: left,
  right: right,
  topLeft: topLeft,
  topRight: topRight,
  bottomLeft: bottomLeft,
  bottomRight: bottomRight,
  alone: alone,
  verticalCenter: verticalCenter,
  verticalTop: verticalTop,
  verticalBottom: verticalBottom,
  horizontalCenter: horizontalCenter,
  horizontalLeft: horizontalLeft,
  horizontalRight: horizontalRight,
  absent: absent,
};

const TileMapper = () => {
  const [expand, setExpand] = useState(false);
  const [dimensions, setDimensions] = useState({ x: 12, y: 12 });
  const [borders, setBorders] = useState(true);
  const [tileMap, setTileMap] = useState(
    Array.from({ length: dimensions.x }, () =>
      Array.from({ length: dimensions.y }, () => tileDefinitions.absent)
    )
  );

  const generateRandom = () => {
    const amount = Math.floor(Math.random() * (12 * 12));

    for (let i = 0; i < amount; i++) {
      const row = Math.floor(Math.random() * 12);
      const col = Math.floor(Math.random() * 12);

      changeNode(row, col);
    }
  };

  const resetTiles = () => {
    setTileMap(
      Array.from({ length: dimensions.x }, () =>
        Array.from({ length: dimensions.y }, () => tileDefinitions.absent)
      )
    );
  };

  const changeNode = (rowIndex, colIndex) => {
    let copy = [...tileMap];
    const newValue =
      copy[rowIndex][colIndex] === tileDefinitions.absent
        ? tileDecider(rowIndex, colIndex, tileMap[rowIndex][colIndex], copy)
        : tileDefinitions.absent;

    copy[rowIndex][colIndex] = newValue;

    copy.forEach((row, rowIndex) =>
      row.forEach((tile, colIndex) => {
        if (tile !== tileDefinitions.absent) {
          const change = tileDecider(
            rowIndex,
            colIndex,
            copy[rowIndex][colIndex],
            copy
          );
          copy[rowIndex][colIndex] = change;
        }
      })
    );

    setTileMap(copy);
  };

  const tileDecider = (rowIndex, colIndex, tile, tiles) => {
    //top
    //bottom
    //left
    //right
    const checkAbsent = (tileMap, rowIndex, colIndex) => {
      if (rowIndex < 0 || rowIndex > 11 || colIndex < 0 || colIndex > 11) {
        return 0;
      } else {
        return tileMap[rowIndex][colIndex] === tileDefinitions.absent ? 0 : 1;
      }
    };

    const tileRules = [
      checkAbsent(tileMap, rowIndex - 1, colIndex),
      checkAbsent(tileMap, rowIndex + 1, colIndex),
      checkAbsent(tileMap, rowIndex, colIndex - 1),
      checkAbsent(tileMap, rowIndex, colIndex + 1),
    ].toString();

    switch (tileRules) {
      case [0, 1, 1, 1].toString():
        return tileDefinitions.top;
      case [0, 1, 0, 1].toString():
        return tileDefinitions.topLeft;
      case [0, 1, 1, 0].toString():
        return tileDefinitions.topRight;
      case [1, 1, 1, 1].toString():
        return tileDefinitions.center;
      case [1, 1, 0, 1].toString():
        return tileDefinitions.left;
      case [1, 1, 1, 0].toString():
        return tileDefinitions.right;
      case [1, 0, 1, 1].toString():
        return tileDefinitions.bottom;
      case [1, 0, 0, 1].toString():
        return tileDefinitions.bottomLeft;
      case [1, 0, 1, 0].toString():
        return tileDefinitions.bottomRight;
      case [1, 1, 0, 0].toString():
        return tileDefinitions.verticalCenter;
      case [0, 1, 0, 0].toString():
        return tileDefinitions.verticalTop;
      case [1, 0, 0, 0].toString():
        return tileDefinitions.verticalBottom;
      case [0, 0, 1, 1].toString():
        return tileDefinitions.horizontalCenter;
      case [0, 0, 0, 1].toString():
        return tileDefinitions.horizontalLeft;
      case [0, 0, 1, 0].toString():
        return tileDefinitions.horizontalRight;
      case [0, 0, 0, 0].toString():
        return tileDefinitions.alone;
    }
    return tileDefinitions.absent;
  };
  return (
    <div style={{ width: "100%" }}>
      <Grid item container justify="center">
        <Grid item>
          <IconButton onClick={() => setExpand(!expand)}>
            {expand ? (
              <ExpandLess fontSize="inherit" />
            ) : (
              <ExpandMore fontSize="inherit" />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={expand} timeout={500}>
        <Grid container xs={12}>
          <Grid item container xs={8} justify={"center"} alignItems={"center"}>
            {tileMap.map((tileRow, rowIndex) => (
              <Grid item container style={{ maxWidth: "768px" }}>
                {tileRow.map((tile, columnIndex) => (
                  <Grid
                    item
                    onClick={() => {
                      changeNode(rowIndex, columnIndex);
                    }}
                    style={{
                      outline: borders ? "1px solid black" : "",
                      height: "64px",
                      width: "64px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={tile}
                      style={{
                        width: "64px",
                        height: "64px",
                        imageRendering: "pixelated",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            xs
            spacing={2}
          >
            <Grid item>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={generateRandom}
              >
                Generate Random
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={resetTiles}
              >
                Clear Tiles
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => setBorders(!borders)}
              >
                Toggle Grid
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
};
export default TileMapper;
