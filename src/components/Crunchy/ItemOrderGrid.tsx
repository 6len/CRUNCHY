import * as React from "react";
import { MatchEventDTO } from "../types/RiotApiTypes";
import {
  Avatar,
  Badge,
  Box,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { BuyBadge, SellBadge } from "./partials";
import { ItemOrderGridStyles } from "./styles";
import { ItemAvatar } from "./utils";

type Props = {
  data: {
    timestamps: string[];
    events: MatchEventDTO[][];
  };
  classes: {
    boxRoot: string;
    itemGroup: string;
    itemRoot: string;
    arrowRoot: string;
  };
};

const getBadgeComponent = (type: string) =>
  type === "ITEM_PURCHASED" ? BuyBadge : SellBadge;

const ItemOrderGrid = ({ data, classes }: Props) => {
  return (
    <Grid item container justify="center">
      <Grid item container justify="center">
        <Grid item>
          <Typography variant="body1">Buy Order</Typography>
        </Grid>
      </Grid>
      {data.events.map((group, index) => (
        <Grid item>
          <Box className={classes.boxRoot}>
            <Grid item container alignItems={"center"}>
              <Grid item>
                <Grid item container className={classes.itemGroup}>
                  {group.map((event) => {
                    const BadgeComponent = getBadgeComponent(event.type);
                    return (
                      <Grid item className={classes.itemRoot}>
                        <BadgeComponent
                          variant="dot"
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        >
                          {ItemAvatar(event.itemId)}
                        </BadgeComponent>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              {index !== data.events.length - 1 && (
                <Grid item className={classes.arrowRoot}>
                  <ArrowRight />
                </Grid>
              )}
            </Grid>
            <div>{`M${data.timestamps[index]}`}</div>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(ItemOrderGridStyles)(ItemOrderGrid);
