import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Grid, Typography, withStyles } from "@material-ui/core";
import DescriptionContainer from "../DescriptionContainer";
import { AmalgamStyles } from "../style/AmalgamStyles";

type Props = {
  classes: {
    root: string;
  };
};
const AmalgamPanel = ({ classes }: Props) => {
  return (
    <div className={classes.root}>
      <ContentContainer>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ContentTitle color="#ff3737">Amalgam</ContentTitle>
        </Grid>
        <DescriptionContainer>
          <Typography variant="body1">
            Amalgam is a 2D pixelart roguelike currently in development!
          </Typography>
          <Typography variant="body1">
            There will be a demo on this page once it's ready!
          </Typography>
        </DescriptionContainer>
      </ContentContainer>
    </div>
  );
};

export default withStyles(AmalgamStyles)(AmalgamPanel);
