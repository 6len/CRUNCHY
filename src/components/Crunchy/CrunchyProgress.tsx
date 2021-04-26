import {LinearProgress, withStyles} from "@material-ui/core";
import * as React from "react";
import {CrunchyProgressStyles} from "./styles";

type Props = {
    classes: {
        divRoot: string;
        root: string;
        colorPrimary: string;
        colorSecondary: string;
    }
}
const CrunchyProgress = ({classes}: Props) => (
    <div className={classes.divRoot}>
        <LinearProgress
            classes={{
                root: classes.root,
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.colorSecondary
            }}
        />
    </div>
)

export default withStyles(CrunchyProgressStyles)(CrunchyProgress)