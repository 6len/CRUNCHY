import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Grid, Typography } from "@material-ui/core";
import DescriptionContainer from "../DescriptionContainer";

const DbPanel = () => {
  return (
    <div>
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
      <Grid container direction="row" justify="center" alignItems="center">
        <img src={"/amalg.png"} />
      </Grid>
    </div>
  );
};

export default DbPanel;
