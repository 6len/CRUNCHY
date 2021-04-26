import {
  Avatar,
  Box,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  getParticipant,
  getParticipantId,
  getPositionNumber,
  getWinOrLoss,
  tooltipTitle,
} from "./utils";
import { find, map, sortBy } from "lodash";
import clsx from "clsx";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
// @ts-ignore
import ChampData from "../../content/champion.json";
// @ts-ignore
import SummonerSpellsData from "../../content/summoner.json";
// @ts-ignore
import GameTypes from "../../content/gameType.json";

import { teamSplit } from "../../scripts/Utils";
import { MatchDTO } from "../types/RiotApiTypes";
import { TeamStatStyles } from "./styles";
import ExpandedStats from "./ExpandedStats";
import * as moment from "moment/moment.js";
import Team from "./Team";

const ddragon = "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/";
const champList = Object.values(ChampData.data);
const summonerList = Object.values(SummonerSpellsData.data);

type Props = {
  matchData: MatchDTO;
  classes: {
    victory: string;
    defeat: string;
    expandButton: string;
    cardContent: string;
    topColumn: string;
  };
  onSummonerClick: (value: string) => void;
  summonerName: string;
};
const TeamStats = ({
  matchData,
  classes,
  onSummonerClick,
  summonerName,
}: Props) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [selectedSummonerStats, setSelectedSummonerStats] = useState(
    getParticipant(matchData, getParticipantId(matchData, summonerName))
  );
  const [selectedSummoner, setSelectedSummoner] = React.useState(summonerName);

  const handleChange = (event) => {
    setSelectedSummoner(event.target.value);
    setSelectedSummonerStats(
      getParticipant(matchData, getParticipantId(matchData, event.target.value))
    );
  };

  const handleAdvancedToggle = () => {
    setShowAdvanced(!showAdvanced);
  };

  const participantIdentities = teamSplit(matchData.participantIdentities);
  const participants = teamSplit(matchData.participants);
  const iteratees = (obj) =>
    getPositionNumber(obj.participant.timeline.lane, "");

  const team1 = sortBy(
    map(participantIdentities.team1, (participant, index) => ({
      ...participant,
      participant: participants.team1[index],
    })),
    iteratees
  );
  const team2 = sortBy(
    map(participantIdentities.team2, (participant, index) => ({
      ...participant,
      participant: participants.team2[index],
    })),
    iteratees
  );

  const matchResult = getWinOrLoss(matchData, summonerName);

  return (
    <CardContent className={classes.cardContent}>
      <Grid container justify="space-between" className={classes.topColumn}>
        <Typography>
          {" "}
          {find(GameTypes, { queueId: matchData.queueId }).description.replace(
            "games",
            ""
          )}{" "}
        </Typography>
        <Typography className={matchResult ? classes.victory : classes.defeat}>
          {matchResult ? "Victory" : "Defeat"}
        </Typography>
        <Typography> {moment(matchData.gameCreation).fromNow()} </Typography>
      </Grid>
      <Grid container justify="space-between">
        <Grid container direction={"column"} item xs={6} spacing={1}>
          {team1.map((participant) => (
            <Team
              matchData={matchData}
              participant={participant}
              summonerName={summonerName}
              onSummonerClick={onSummonerClick}
              team={1}
            />
          ))}
        </Grid>
        <Grid
          container
          justify="flex-end"
          direction={"column"}
          item
          xs={6}
          spacing={1}
        >
          {team2.map((participant) => (
            <Team
              matchData={matchData}
              participant={participant}
              summonerName={summonerName}
              onSummonerClick={onSummonerClick}
              team={2}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container justify="center">
        <IconButton
          onClick={handleAdvancedToggle}
          className={classes.expandButton}
        >
          {showAdvanced ? (
            <ExpandLess fontSize="inherit" />
          ) : (
            <ExpandMore fontSize="inherit" />
          )}
        </IconButton>
      </Grid>
      <Collapse in={showAdvanced}>
        <ExpandedStats
          matchData={matchData}
          selectedSummoner={selectedSummoner}
          selectedSummonerStats={selectedSummonerStats}
          handleChange={handleChange}
        />
      </Collapse>
    </CardContent>
  );
};

// @ts-ignore
export default withStyles(TeamStatStyles)(TeamStats);
