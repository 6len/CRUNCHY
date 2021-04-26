import * as React from "react";

export const SummonerSearchStyles = {
  buttonRoot: {
    padding: 0,
    borderRadius: 0,
    color: "#C46B16",
  },
};

export const SummonerStatStyles = {
  cardRoot: {
    background: "#ffefd5",
  },
  matchRoot: {
    background: "#ffefd5",
    marginBottom: "8px",
  },
  media: {
    height: 0,
    paddingBottom: "100%",
  },
  gridRoot: {
    marginTop: "30px",
  },
};

export const TeamStyles = {
  team1: {
    marginLeft: "5px",
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  team2: {
    marginRight: "5px",
    color: "red",
    textAlign: "end",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  kda: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  summonerSpell1: {
    marginRight: "5px",
    marginLeft: "5px",
  },
  playerHighlight: {
    color: "#259100",
  },
};
export const TeamStatStyles = {
  topColumn: {
    marginBottom: "5px",
  },
  victory: {
    color: "#769f30",
  },
  defeat: {
    color: "#9d3f61",
  },
  playerHighlight: {
    color: "#259100",
  },
  expandButton: {
    color: "#C46B16",
    fontSize: "32px",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "5px",
    },
  },
};
export const CardStatStyles = {
  wins: {
    color: "green",
    marginRight: "5px",
  },
  losses: {
    color: "red",
  },
};

export const CrunchyProgressStyles = {
  divRoot: {
    height: "0px",
  },
  root: {
    height: "10px",
  },
  colorPrimary: {
    backgroundColor: "#C46B16",
  },
  colorSecondary: {
    backgroundColor: "#ba8f61",
  },
};

export const ExpandedStatsStyles = {
  summonerSelector: {
    marginBottom: "10px",
    color: "#C46B16",
  },
  statBox: {
    background: "#f7e0e0",
    borderRadius: "10px",
  },
  runeBox: {
    borderRight: "5px solid #ffefd5",
  },
  levelBox: {
    borderBottom: "5px solid #ffefd5",
  },
  workInProgress: {
    height: "150px",
  },
};

export const SummonerTableStyles = {
  tableDiv: {
    marginBottom: "5px",
    maxHeight: "300px",
    overflowX: "hidden",
    overflowY: "scroll",
    padding: "1rem",

    "& $table": {
      borderSpacing: 0,
      border: "1px solid black",
      "& $tr": {
        ":last-child": {
          "& $td": {
            borderBottom: 0,
          },
        },
      },

      "& $td, $th": {
        margin: 0,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
        ":last-child": {
          borderRight: 0,
        },
      },
    },
  },
  expand: {
    paddingLeft: "1rem",
  },
  expanded: {
    maxHeight: "fit-content",
    overflowY: "hidden",
  },
};

export const RunesStyles = {
  runeBox: {
    paddingTop: "5px",
    paddingBottom: "5px",
    height: "fit-content",
    borderBottom: "5px solid #ffefd5",
  },
};

export const ItemGridStyles = {
  root: {},
};

export const AvatarStyles = {
  root: {
    width: "auto",
    height: "auto",
  },
};

const BadgeStyles = {
  badge: {
    boxShadow: `0 0 0 2px #bdb4aa`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
};
export const BuyBadgeStyles = {
  badge: {
    ...BadgeStyles.badge,
    color: "#39812c",
    background: "#39812c",
  },
};

export const SellBadgeStyles = {
  badge: {
    ...BadgeStyles.badge,
    color: "#960a0a",
    background: "#960a0a",
  },
};

export const ItemOrderGridStyles = {
  boxRoot: {
    paddingTop: "5px",
    textAlign: "center",
  },
  itemGroup: {
    backgroundColor: "#dea9a9",
    borderRadius: "5px",
  },
  itemRoot: {
    padding: "5px",
  },
  arrowRoot: {
    backgroundColor: "#dea9a9",
  },
};
