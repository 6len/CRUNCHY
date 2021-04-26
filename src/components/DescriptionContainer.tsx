import * as React from "react";
import {withStyles} from "@material-ui/core";
import {DescriptionStyles} from "./style/DescriptionStyles";

type Props = {
    classes: {
        root: string;
    },
    children: React.ReactNode;
}

const DescriptionContainer = ({classes, children}: Props) => (
    <div className={classes.root}>
        {children}
    </div>
)

export default withStyles(DescriptionStyles)(DescriptionContainer);