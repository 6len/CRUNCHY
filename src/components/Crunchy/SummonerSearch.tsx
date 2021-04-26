import * as React from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  withStyles,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { SummonerSearchStyles } from "./styles";
import { useRef, useState } from "react";

type Props = {
  classes: {
    buttonRoot: string;
  };
  onEnter: (value: string) => void;
};

const SummonerSearch = ({ classes, onEnter }: Props) => {
  const [textValue, setTextValue] = useState("");
  const handleChange = (event) => {
    setTextValue(event.target.value);
  };
  return (
    <TextField
      id="outlined-margin-dense"
      placeholder="Summoner Name"
      margin="dense"
      variant="outlined"
      value={textValue}
      onKeyPress={(e) => {
        if (e.code === "Enter") {
          onEnter(textValue);
        }
      }}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              classes={{ root: classes.buttonRoot }}
              onClick={() => onEnter(textValue)}
            >
              <NavigateNextIcon fontSize={"large"} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(SummonerSearchStyles)(SummonerSearch);
