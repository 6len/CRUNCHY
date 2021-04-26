import { find } from "lodash";
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

import { MatchDTO, ParticipantIdentityDTO } from "../types/RiotApiTypes";
import { getParticipant, tooltipTitle } from "./utils";
import {
  Avatar,
  Grid,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import { TeamStyles } from "./styles";

const ddragon = "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/";
const champList = Object.values(ChampData.data);
const summonerList = Object.values(SummonerSpellsData.data);

type Props = {
  classes: {
    team1: string;
    team2: string;
    kda: string;
    summonerSpell1: string;
    playerHighlight: string;
  };
  matchData: MatchDTO;
  participant: ParticipantIdentityDTO;
  summonerName: string;
  onSummonerClick: (value: string) => void;
  team: number;
};

const Team = ({
  classes,
  matchData,
  participant,
  summonerName,
  onSummonerClick,
  team,
}: Props) => {
  const player = getParticipant(matchData, participant.participantId);
  const championId = getParticipant(matchData, participant.participantId)
    .championId;
  // @ts-ignore
  const champ = find(champList, {
    key: player.championId.toString(),
  });
  // @ts-ignore
  const champId = champ.id;
  // @ts-ignore
  const champName = champ.name;
  // @ts-ignore
  const spell1Name = find(summonerList, {
    key: player.spell1Id.toString(),
  }).id;
  // @ts-ignore
  const spell2Name = find(summonerList, {
    key: player.spell2Id.toString(),
  }).id;

  return (
    <Grid
      container
      alignItems="center"
      item
      direction={team === 1 ? "row" : "row-reverse"}
    >
      <Tooltip title={tooltipTitle(champName)} placement="left" arrow>
        <Avatar variant="square" src={`${ddragon}champion/${champId}.png`} />
      </Tooltip>
      <Typography
        display="inline"
        className={clsx({
          [classes.playerHighlight]:
            summonerName === participant.player.summonerName,
          [classes.team1]: team === 1,
          [classes.team2]: team === 2,
        })}
        onClick={() => onSummonerClick(participant.player.summonerName)}
      >
        {participant.player.summonerName}
      </Typography>
      <Typography className={classes.kda} display="inline">
        {" "}
        - {player.stats.kills} / {player.stats.deaths} / {player.stats.assists}{" "}
        - {player.stats.totalMinionsKilled + player.stats.neutralMinionsKilled}{" "}
        CS
      </Typography>
      <Avatar
        variant="square"
        className={classes.summonerSpell1}
        src={`${ddragon}spell/${spell1Name}.png`}
      />
      <Avatar variant="square" src={`${ddragon}spell/${spell2Name}.png`} />
    </Grid>
  );
};

export default withStyles(TeamStyles)(Team);
