import * as React from "react";
import ContentContainer from "../ContentContainer";
import { useState } from "react";
import ContentTitle from "../ContentTitle";
import { Grid, Typography } from "@material-ui/core";
import GithubButton from "../GithubButton";
import DescriptionContainer from "../DescriptionContainer";

const MucPanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <ContentContainer>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ContentTitle color="#1ea216">MUC-API</ContentTitle>
          <GithubButton url="https://github.com/6len/MUCAPI" />
        </Grid>
        <Typography variant="h6"> Map Unity Converter API </Typography>
        <DescriptionContainer>
          <Typography variant="body1">
            The Map Unity Converter API manages all data for use by UWB.
          </Typography>
          <Typography variant="body1">
            It allows users to get map information and create new maps!
          </Typography>
        </DescriptionContainer>
      </ContentContainer>
      <Grid container direction="row" justify="center" alignItems="center">
        {isOpen && (
          <iframe
            scrolling="no"
            style={{ width: "90%", height: "600px" }}
            src={"https://mucapi.herokuapp.com/mucapi.html"}
          />
        )}
      </Grid>
    </div>
  );
};

export default MucPanel;
