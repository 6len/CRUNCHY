import * as React from "react";
import { ParticipantDTO } from "../types/RiotApiTypes";
import {
  Avatar,
  Box,
  Grid,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
// @ts-ignore
import RuneData from "../../content/runes.json";
import { find } from "lodash";
import { RunesStyles } from "./styles";
import parse from "html-react-parser";
import { tooltipTitle } from "./utils";

type Props = {
  selectedSummonerStats: ParticipantDTO;
  classes: {
    runeBox: string;
  };
};

const Runes = ({ selectedSummonerStats, classes }: Props) => {
  const firstTree = find(RuneData, {
    id: selectedSummonerStats.stats.perkPrimaryStyle,
  });
  const secondTree = find(RuneData, {
    id: selectedSummonerStats.stats.perkSubStyle,
  });

  const getRuneWithInfo = (runeMap, perkId, secondTree = false) => {
    let rune = find(runeMap.runes, { id: perkId });
    if (secondTree) {
      const runeOne = find(runeMap.runes, {
        id: selectedSummonerStats.stats.perk4,
      });
      const runeTwo = find(runeMap.runes, {
        id: selectedSummonerStats.stats.perk5,
      });
      rune = runeOne ? runeOne : runeTwo;
    }
    if (rune) {
      return (
        <Grid item>
          <Tooltip
            title={tooltipTitle(rune.name, rune.shortDesc)}
            placement="top"
            arrow
          >
            <Avatar src={`/league/${rune.icon}`} />
          </Tooltip>
        </Grid>
      );
    }
  };

  return (
    <Grid item container>
      <Grid item container justify="center">
        <Grid item>
          <Typography variant="body1">Runes</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.runeBox} item container xs={12}>
        <Grid item container xs={6} direction="column" alignItems="center">
          <Grid item>
            <Tooltip title={tooltipTitle(firstTree.name)} placement="top" arrow>
              <Avatar src={`/league/${firstTree.icon}`} />
            </Tooltip>
          </Grid>
          {firstTree.slots.map((runes, index) =>
            getRuneWithInfo(runes, selectedSummonerStats.stats["perk" + index])
          )}
        </Grid>
        <Grid item container xs={6} direction="column" alignItems="center">
          <Grid item>
            <Tooltip
              title={tooltipTitle(secondTree.name)}
              placement="top"
              arrow
            >
              <Avatar src={`/league/${secondTree.icon}`} />
            </Tooltip>
          </Grid>
          {secondTree.slots.map((runes, index) =>
            getRuneWithInfo(runes, 0, true)
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(RunesStyles)(Runes);
