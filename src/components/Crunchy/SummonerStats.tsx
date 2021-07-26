import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import { SummonerStatStyles } from "./styles";
import { CrunchySummoner } from "../types/RiotApiTypes";
import CardStats from "./CardStats";
import TeamStats from "./TeamStats";

const ddragon = "http://ddragon.leagueoflegends.com/cdn/11.15.1/img/";

type Props = {
  data: CrunchySummoner;
  classes: {
    cardRoot: string;
    matchRoot: string;
    media: string;
    gridRoot: string;
    team1: string;
    team2: string;
    kda: string;
    summonerSpell1: string;
    victory: string;
    defeat: string;
    playerHighlight: string;
  };
  onSummonerClick: (value: string) => void;
};

const SummonerStats = ({ classes, data, onSummonerClick }: Props) => {
  return (
    <Grid
      classes={{ root: classes.gridRoot }}
      container
      justify="flex-start"
      spacing={1}
    >
      <Grid item xs={2}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardMedia
            className={classes.media}
            image={`${ddragon}profileicon/${data.summoner.profileIconId}.png`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.summoner.name}
            </Typography>
            <CardStats data={data.summonerStats} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10}>
        {data.matchList.map((matchData) => {
          return (
            <Card classes={{ root: classes.matchRoot }}>
              <TeamStats
                matchData={matchData}
                onSummonerClick={onSummonerClick}
                summonerName={data.summoner.name}
              />
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

// @ts-ignore
export default withStyles(SummonerStatStyles)(SummonerStats);
