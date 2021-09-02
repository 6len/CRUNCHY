import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Grid, Typography } from "@material-ui/core";
import DescriptionContainer from "../DescriptionContainer";
import TileMapper from "../Gizmos/TileMapper";

const GizmosPanel = () => {
  return (
    <div>
      <ContentContainer>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ContentTitle color="#8797ea">Gizmos</ContentTitle>
        </Grid>
        <DescriptionContainer>
          <Typography variant="body1">
            Below is a collection of very small projects I have worked on in my
            spare time
          </Typography>
        </DescriptionContainer>
        <TileMapper />
      </ContentContainer>
    </div>
  );
};

export default GizmosPanel;
