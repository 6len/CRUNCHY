import * as React from "react";
import {Avatar, Badge, withStyles} from "@material-ui/core";
import {AvatarStyles, BuyBadgeStyles, SellBadgeStyles} from "./styles";

type AvatarType = {
    classes: {
        root: string,
    }
}

type BadgeType = {
    children: React.ReactNode;
    classes: {
        badge: string;
    }
}

export const MaxAvatar = withStyles(AvatarStyles)(Avatar);

export const BuyBadge = withStyles(BuyBadgeStyles)(Badge);

export const SellBadge = withStyles(SellBadgeStyles)(Badge);

