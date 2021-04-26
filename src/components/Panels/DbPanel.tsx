import * as React from "react";
import ContentContainer from "../ContentContainer";
import { useState } from "react";
import ContentTitle from "../ContentTitle";
import { Grid, Typography } from "@material-ui/core";
import GithubButton from "../GithubButton";
import DescriptionContainer from "../DescriptionContainer";

const DbPanel = () => {
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
          <ContentTitle color="#5FCDE4">DB-40</ContentTitle>
          <GithubButton url="https://github.com/6len/MusicProject" />
        </Grid>
        <Typography variant="h6"> Drum Blast 40 </Typography>
        <DescriptionContainer>
          <Typography variant="body1">
            DB-40 is a web-based drum & rhythm machine where you can create and
            download patterns.
          </Typography>
          <Typography variant="body1">Give it a try below!</Typography>
        </DescriptionContainer>
      </ContentContainer>
      <Grid container direction="row" justify="center" alignItems="center">
        {isOpen && (
          <iframe
            scrolling="no"
            style={{ width: "90%", height: "1300px" }}
            src={"https://drumblast-39a22.web.app/"}
          />
        )}
      </Grid>
    </div>
  );
};

export default DbPanel;
