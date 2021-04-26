import GitHubIcon from "@material-ui/icons/GitHub";
import {IconButton, Tooltip} from "@material-ui/core";
import * as React from "react";

type Props = {
    url: string;
    tooltip?: string;
    color?: string;
}
const GithubButton = ({url, tooltip = "View on Github", color="inherit"}: Props) => (
    <Tooltip title={tooltip} placement="top" arrow>
        <IconButton href={url} target="blank">
            <GitHubIcon color={color}/>
        </IconButton>
    </Tooltip>
)

export default GithubButton