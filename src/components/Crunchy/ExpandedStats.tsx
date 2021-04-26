import {
  Avatar,
  Box,
  Collapse,
  Grid,
  Input,
  NativeSelect,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import {
  MatchDTO,
  MatchTimelineDTO,
  ParticipantDTO,
} from "../types/RiotApiTypes";
import { ExpandedStatsStyles } from "./styles";
import {
  extractItemEvents,
  extractSpellLevel,
  getGameEvents,
  matchDtoToData,
  matchDtoToTableHeaders,
  spellLevelToTable,
} from "./utils";
import SummonerTable from "./SummonerTable";
import { useEffect, useMemo, useState } from "react";
import PagePanel from "../Panels/PagePanel";
import Runes from "./Runes";
import CrunchyProgress from "./CrunchyProgress";
import axios from "axios";
import LevelTable from "./LevelTable";
import ItemOrderGrid from "./ItemOrderGrid";
import ItemGrid from "./ItemGrid";

type Props = {
  matchData: MatchDTO;
  selectedSummoner: string;
  selectedSummonerStats: ParticipantDTO;
  handleChange: () => void;
  classes: {
    summonerSelector: string;
    statBox: string;
    levelBox: string;
    workInProgress: string;
  };
};

const ExpandedStats = ({
  matchData,
  selectedSummoner,
  selectedSummonerStats,
  handleChange,
  classes,
}) => {
  const columns = matchDtoToTableHeaders(matchData);
  const dataSet = matchDtoToData(matchData);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MatchTimelineDTO>();

  const [tab, setTab] = useState(0);

  const tabChange = (e, newValue) => {
    setTab(newValue);
  };

  const getLevelTable = () => {
    const { tableData, tableHead } = spellLevelToTable(
      data,
      selectedSummonerStats
    );
    return <LevelTable columns={tableHead} data={tableData} />;
  };

  useMemo(() => {
    if (!data && tab > 0) {
      axios
        .get(
          `https://crunchyapi.herokuapp.com/match-timeline/${matchData.gameId}`
        )
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(true);
        });
    }
  }, [tab]);

  return (
    <Box>
      <Tabs value={tab} onChange={tabChange}>
        <Tab label="Game Stats" />
        <Tab label="Summoner Builds" />
        <Tab label="Map Events" />
      </Tabs>
      <PagePanel value={tab} index={0}>
        <SummonerTable columns={columns} data={dataSet} />
      </PagePanel>
      <PagePanel value={tab} index={1}>
        <NativeSelect
          value={selectedSummoner}
          onChange={handleChange}
          input={<Input />}
          className={classes.summonerSelector}
        >
          {matchData.participantIdentities.map((participant) => (
            <option value={participant.player.summonerName}>
              {participant.player.summonerName}
            </option>
          ))}
        </NativeSelect>
        <Grid container className={classes.statBox}>
          <Grid item container xs={3} className={classes.runeBox}>
            <Runes selectedSummonerStats={selectedSummonerStats} />
            <ItemGrid summoner={selectedSummonerStats} />
          </Grid>
          <Grid item container xs={9} direction={"row"}>
            <Grid
              item
              container
              xs={12}
              direction="column"
              alignItems={"center"}
              className={classes.levelBox}
            >
              {isLoading && !data ? (
                <CrunchyProgress />
              ) : (
                <Grid item container justify="center">
                  <Grid item>
                    <Typography variant="body1">Skill Order</Typography>
                  </Grid>
                  {getLevelTable()}
                </Grid>
              )}
            </Grid>
            {!isLoading && data && (
              <Grid
                item
                container
                justify={"center"}
                alignItems="flex-start"
                xs={12}
              >
                <ItemOrderGrid
                  data={extractItemEvents(data, selectedSummonerStats)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </PagePanel>
      <PagePanel value={tab} index={2}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.workInProgress}
        >
          <Typography variant="body1">Work In Progress</Typography>
        </Grid>
      </PagePanel>
    </Box>
  );
};

export default withStyles(ExpandedStatsStyles)(ExpandedStats);
