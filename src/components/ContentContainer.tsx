import * as React from "react";
import {Container, withStyles} from "@material-ui/core";
import {ContentContainerStyles} from "./style/ContentContainerStyles";

type Props = {
    classes: {
        root: string;
    },
    children: React.ReactNode;
}

const ContentContainer = ({classes, children}: Props) => (
        <Container className={classes.root}>
            {children}
        </Container>
)

export default withStyles(ContentContainerStyles)(ContentContainer);
