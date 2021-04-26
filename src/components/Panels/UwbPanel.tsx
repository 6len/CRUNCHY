import * as React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import { UwbStyles } from "../style/UwbStyles";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import GithubButton from "../GithubButton";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import DescriptionContainer from "../DescriptionContainer";

type Props = {
  classes: {
    boxRoot: string;
    gridRoot: string;
  };
};

const UwbPanel = ({ classes }: Props) => {
  const unityContent = new UnityContent(
    "/UWBWEB2/Build/UWBWEB2.json",
    "/UWBWEB2/Build/UnityLoader.js"
  );

  return (
    <ContentContainer>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <ContentTitle color="#FF8AF8">UWB</ContentTitle>
        <GithubButton url="https://github.com/6len/UWB" />
        <GithubButton
          url="https://github.com/6len/UWB-BUILD"
          tooltip="View build on Github"
          color="error"
        />
      </Grid>
      <Typography variant="h6"> Unity World Builder </Typography>
      <DescriptionContainer>
        <Typography variant="body1">
          UWB is a project made in Unity to convert OpenStreetMap data to a 3d
          rendering. It uses data extracted from .OSM files from the MUC-API
          (Map to Unity Converter API).
        </Typography>
        <Typography variant="body1">
          These maps can be uploaded directly to the MUC-API in return for a map
          id.
        </Typography>
        <Typography variant="body1">
          This map id can then be entered into UWB for a 3d rendering !
        </Typography>
        <Typography variant="body1">
          Why not try it out below with map id <b>pgsnapshot</b> for a map of
          Maynooth University!
        </Typography>
      </DescriptionContainer>
      <Box className={classes.boxRoot}>
        <Unity unityContent={unityContent} />
      </Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className={classes.gridRoot}
      >
        <Grid item>
          <Typography variant="body2">W A S D for movement</Typography>
          <Typography variant="body2">Space to jump</Typography>
          <Typography variant="body2">Mouse to look around</Typography>
          <Typography variant="body2">
            ESC to exit fullscreen and to free cursor
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => unityContent.setFullscreen(true)}>
            <FullscreenIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </ContentContainer>
  );
};

export default withStyles(UwbStyles)(UwbPanel);
