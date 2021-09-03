import * as React from "react";
import { useState } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { SpriteShowcaseStyles } from "../style/SpriteShowcaseStyles";
import clsx from "clsx";

type Props = {
  classes: {
    gridItem: string;
    sprite: string;
    showcase: string;
    activeItem: string;
  };
};

const SpriteShowcase = ({ classes }: Props) => {
  const [selected, setSelected] = useState(null);
  const importAll = (r) => r.keys().map(r);

  const images = importAll(
    require.context("../../images/sprites/", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <Grid container xs={12} style={{ width: "100%" }} alignItems={"flex-start"}>
      <Grid container xs={8}>
        {images.map((image, index) => (
          <Grid
            item
            className={clsx(classes.gridItem, {
              [classes.activeItem]: selected === index,
            })}
            onClick={() => setSelected(index)}
          >
            <img className={classes.sprite} src={image.default} />
          </Grid>
        ))}
      </Grid>
      <Grid container xs={4} justify={"center"} alignItems={"center"}>
        <Grid item>
          {selected !== null && (
            <img className={classes.showcase} src={images[selected].default} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(SpriteShowcaseStyles)(SpriteShowcase);
