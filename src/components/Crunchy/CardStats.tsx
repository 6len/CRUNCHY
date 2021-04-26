import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { LeagueEntryDTO, QUEUE } from "../types/RiotApiTypes";
import { CardStatStyles } from "./styles";

type Props = {
  data: LeagueEntryDTO[];
  classes: {
    wins: string;
    losses: string;
  };
};

const CardStats = ({ data, classes }: Props) =>
  data.map((entry) => (
    <Box>
      <Typography variant="body2" color="textSecondary" component="p">
        {QUEUE[entry.queueType]} {entry.tier} {entry.rank} {entry.leaguePoints}
        LP
      </Typography>
      <Box>
        <Grid item container justify="flex-start">
          <Typography
            className={classes.wins}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {entry.wins}
          </Typography>
          <Typography
            className={classes.losses}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {entry.losses}
          </Typography>
        </Grid>
      </Box>
    </Box>
  ));

// @ts-ignore
export default withStyles(CardStatStyles)(CardStats);
