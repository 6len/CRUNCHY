import * as React from "react";
import { eq, filter, find, flattenDeep, groupBy, reduce } from "lodash";
import {
  MatchDTO,
  MatchTimelineDTO,
  ParticipantDTO,
  POSITION_ORDER,
} from "../types/RiotApiTypes";
import GitHubIcon from "@material-ui/icons/GitHub";
// @ts-ignore
import ChampData from "../../content/champion.json";
// @ts-ignore
import FullChampData from "../../content/championFull.json";
// @ts-ignore
import ItemData from "../../content/items.json";
// @ts-ignore
import SummonerSpellsData from "../../content/summoner.json";
// @ts-ignore
import DataKeys from "../../content/dataKeyMap.json";
import { Avatar, Box, Tooltip, Typography } from "@material-ui/core";
import SummonerStats from "./SummonerStats";
import { MaxAvatar } from "./partials";
import parse from "html-react-parser";

const ddragon = "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/";
const champList = Object.values(ChampData.data);
const fullChampList = Object.values(FullChampData.data);
const summonerList = Object.values(SummonerSpellsData.data);

const dataKeys = [
  "largestKillingSpree",
  "largestMultiKill",
  "timeCCingOthers",
  "totalDamageDealtToChampions",
  "physicalDamageDealtToChampions",
  "magicDamageDealtToChampions",
  "trueDamageDealtToChampions",
  "totalDamageDealt",
  "physicalDamageDealt",
  "magicDamageDealt",
  "trueDamageDealt",
  "largestCriticalStrike",
  "damageDealtToTurrets",
  "damageDealtToObjectives",
  "null",
  "totalHeal",
  "totalDamageTaken",
  "physicalDamageTaken",
  "magicalDamageTaken",
  "trueDamageTaken",
  "damageSelfMitigated",
  "null",
  "visionScore",
  "wardsPlaced",
  "wardsKilled",
  "visionWardsBoughtInGame",
  "null",
  "goldEarned",
  "goldSpent",
  "totalMinionsKilled",
  "neutralMinionsKilled",
  "neutralMinionsKilledTeamJungle",
  "neutralMinionsKilledEnemyJungle",
  "null",
  "turretKills",
  "inhibitorKills",
];

export const getWinOrLoss = (data: MatchDTO, summonerName: string) => {
  const participantId = find(data.participantIdentities, {
    player: { summonerName: summonerName },
  }).participantId;
  const teamIndex = participantId <= 5 ? 0 : 1;
  return eq(data.teams[teamIndex].win, "Win");
};

const roundTo = (num, factor = 1) => {
  const quotient = num / factor;
  const res = Math.round(quotient) * factor;
  return res;
};

export const getParticipantId = (data: MatchDTO, summonerName: string) =>
  find(data.participantIdentities, { player: { summonerName: summonerName } })
    .participantId;

export const getChampNameByParticipant = (
  matchData: MatchDTO,
  participantId: number
) => {
  const championId = getParticipant(matchData, participantId).championId;
  // @ts-ignore
  return find(champList, { key: championId.toString() }).id;
};

export const getParticipant = (data: MatchDTO, id: number) =>
  find(data.participants, { participantId: id });

export const getPositionNumber = (lane: string, role: string) => {
  return POSITION_ORDER[lane];
};

export const tooltipTitle = (
  name: string,
  description: string = "",
  extra = ""
) => (
  <Box>
    <Typography variant={"body1"} style={{ color: "#00e0d9" }}>
      {name}
    </Typography>
    <Typography variant={"body2"}>
      <div>{parse(description)}</div>
    </Typography>
    {extra && (
      <Typography variant={"body2"}>
        <div>{parse(extra)}</div>
      </Typography>
    )}
  </Box>
);
const getSpell = (championId: number, spell: number) => {
  // @ts-ignore
  return find(fullChampList, { key: championId.toString() }).spells[spell - 1];
};

export const getSpellIcon = (championId: number, spellNumber: number) => {
  const spell = getSpell(championId, spellNumber);
  return (
    <Tooltip
      title={tooltipTitle(spell.name, spell.description)}
      placement="top"
      arrow
    >
      <MaxAvatar
        variant="square"
        src={`http://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/${spell.id}.png`}
      />
    </Tooltip>
  );
};

export const matchDtoToTableHeaders = (data: MatchDTO) => {
  const columns = data.participantIdentities.map((participant) => ({
    Header: () => (
      <Avatar
        variant="square"
        src={`${ddragon}champion/${getChampNameByParticipant(
          data,
          participant.participantId
        )}.png`}
      />
    ),
    accessor: participant.participantId.toString(),
  }));
  return [{ Header: "", accessor: "key" }, ...columns];
};

export const getRowData = (data, index, key) => {
  const stats = getParticipant(data, index).stats[key];
  if (stats !== undefined) {
    return stats.toLocaleString();
  } else return "null";
};

export const matchDtoToData = (data: MatchDTO) => {
  const dataSet = dataKeys.map((dataKey) => ({
    key: DataKeys[dataKey],
    "1": getRowData(data, 1, dataKey),
    "2": getRowData(data, 2, dataKey),
    "3": getRowData(data, 3, dataKey),
    "4": getRowData(data, 4, dataKey),
    "5": getRowData(data, 5, dataKey),
    "6": getRowData(data, 6, dataKey),
    "7": getRowData(data, 7, dataKey),
    "8": getRowData(data, 8, dataKey),
    "9": getRowData(data, 9, dataKey),
    "10": getRowData(data, 10, dataKey),
  }));
  return dataSet;
};

export const getGameEvents = (data: MatchTimelineDTO) =>
  reduce(data.frames, (result, value) => result.concat(value.events), []);

export const extractSpellLevel = (
  data: MatchTimelineDTO,
  summoner: ParticipantDTO
) => {
  const events = getGameEvents(data);
  return filter(events, {
    participantId: summoner.participantId,
    type: "SKILL_LEVEL_UP",
  });
};

export const extractItemEvents = (
  data: MatchTimelineDTO,
  summoner: ParticipantDTO
) => {
  const events = getGameEvents(data);
  const gameStart = events[0].timestamp;
  const eventmap = filter(
    events,
    (event) =>
      event.participantId === summoner.participantId &&
      (event.type === "ITEM_PURCHASED" || event.type === "ITEM_SOLD")
  );
  const groupedEvents = groupBy(
    eventmap,
    (event) => roundTo(event.timestamp / 1000, 60) / 60
  );
  const groupedEventsArray = Object.values(groupedEvents);
  const groupedTimestampsArray = Object.keys(groupedEvents);
  return { timestamps: groupedTimestampsArray, events: groupedEventsArray };
};

export const spellLevelToTable = (
  data: MatchTimelineDTO,
  summoner: ParticipantDTO
) => {
  const spellLevelData = extractSpellLevel(data, summoner);
  const header = spellLevelData.map((spellLevel, index) => ({
    Header: index + 1,
    accessor: index.toString(),
  }));

  const tableData = reduce(
    spellLevelData,
    (result, value, key) => {
      return {
        ...result,
        [key.toString()]: getSpellIcon(summoner.championId, value.skillSlot),
      };
    },
    {}
  );

  return { tableHead: header, tableData: [tableData] };
};

const ddragonItem = (id: number) =>
  `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/item/${id}.png`;

export const ItemAvatar = (itemId: number, variant = "circle") => {
  const item = ItemData.data[itemId];
  const itemCost = `<goldcost> ${ItemData.data[itemId].gold.total}g </goldcost>`;
  console.log(item);
  return (
    <Tooltip
      title={tooltipTitle(item.name, item.description, itemCost)}
      placement="top"
      arrow
    >
      <Avatar src={ddragonItem(itemId)} variant={variant} />
    </Tooltip>
  );
};
