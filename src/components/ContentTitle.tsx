import * as React from "react";
import {Typography, withStyles} from "@material-ui/core";
import {ContentTitleStyles} from "./style/ContentTitle";
import { identity } from "lodash";
import clsx from "clsx";

type Props = {
    classes: {
        root: string;
        clickable: string;
    },
    color?: string,
    onClick?: () => void;
    clickable?: boolean;
    children: React.ReactNode;
}

const ContentTitle = ({classes, children, color = "black", onClick = identity, clickable = false}: Props) => (
    <Typography variant="h4" style={{ color: color }} className={clsx(classes.root, {[classes.clickable]: clickable})} onClick={onClick}>
        {children}
    </Typography>

)

export default withStyles(ContentTitleStyles)(ContentTitle);
