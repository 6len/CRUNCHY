import { filter } from "lodash";
import * as React from "react";
import { ParticipantDTO } from "../types/RiotApiTypes";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { ItemAvatar } from "./utils";
import { ItemGridStyles } from "./styles";

type Props = {
  classes: {
    root: string;
  };
  summoner: ParticipantDTO;
};
const ItemGrid = ({ classes, summoner }: Props) => {
  const summonerStats = summoner.stats;
  const items = [
    summonerStats.item0,
    summonerStats.item1,
    summonerStats.item2,
    summonerStats.item3,
    summonerStats.item4,
    summonerStats.item5,
    summonerStats.item6,
  ];
  const filteredItems = filter(items, (item) => item !== 0);

  return (
    <Grid item container justify="center">
      <Grid item>
        <Typography variant="body1">Items</Typography>
      </Grid>
      <Grid container className={classes.root} xs={12} justify="center">
        {filteredItems.map((item) => (
          <Grid item>{ItemAvatar(item, "square")}</Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(ItemGridStyles)(ItemGrid);
