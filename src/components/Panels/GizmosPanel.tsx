import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Card, Grid, Link, Typography, withStyles } from "@material-ui/core";
import DescriptionContainer from "../DescriptionContainer";
import TileMapper from "../Gizmos/TileMapper";
import { GizmosPanelStyles } from "../style/GizmosPanelStyles";
import SpriteShowcase from "../Gizmos/SpriteShowcase";

type Props = {
  classes: {
    card: string;
    gridItem: string;
  };
};
const GizmosPanel = ({ classes }: Props) => {
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
        <Grid item container spacing={3}>
          <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
              <Typography variant="h6"> TILER </Typography>
              <DescriptionContainer>
                <Typography variant="body1">
                  Tiler is a small javascript application which automatically
                  determines which tiles should be placed based on the
                  surrounding tiles.
                </Typography>
                <Typography variant="body1">
                  Click on the grid to spawn and despawn tiles
                </Typography>
              </DescriptionContainer>
              <Grid item container>
                <TileMapper />
              </Grid>
            </Card>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
              <Typography variant="h6"> Game Mods </Typography>
              <DescriptionContainer>
                <Typography variant="body1">
                  The game mods I have created can be seen{" "}
                  <Link
                    href={"https://github.com/6len/game-mods"}
                    target="_blank"
                  >
                    here
                  </Link>
                </Typography>
                <Typography variant="body1">
                  Currently I have created mods for Risk of Rain 2 and Monster
                  Sanctuary
                </Typography>
              </DescriptionContainer>
            </Card>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Card className={classes.card}>
              <Typography variant="h6"> Pixel Showcase </Typography>
              <Typography variant="body1">
                A small showcase of the progress of learning pixelart for
                game-development
              </Typography>
              <SpriteShowcase />
            </Card>
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default withStyles(GizmosPanelStyles)(GizmosPanel);
