import * as React from "react";
import { Grid, IconButton, Tab, Tabs } from "@material-ui/core";
import ContentTitle from "./ContentTitle";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactMailIcon from "@material-ui/icons/ContactMail";

type Props = {
  value: number;
  onChange: (value: number) => void;
};
const Navbar = ({ value, onChange }: Props) => {
  const handleChange = (e, newValue) => {
    onChange(newValue);
  };

  return (
    <Grid
      container
      direction={"row"}
      style={{
        backgroundColor: "#48342b",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
      alignItems="center"
      justify={"space-between"}
    >
      <Grid item>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#C46B16">Crunchy</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#FF8AF8">UWB</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#1ea216">MUC-API</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#5FCDE4">DB-40</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#ff3737">Amalgam</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#94931D">Phixel</ContentTitle>
              </div>
            )}
          />
          <Tab
            component={(props) => (
              <div {...props}>
                <ContentTitle color="#8797ea">Gizmos</ContentTitle>
              </div>
            )}
          />
        </Tabs>
      </Grid>

      <Grid item>
        <IconButton href={"https://github.com/6len"} target={"blank"}>
          <GitHubIcon htmlColor={"#FFFFC7"} />
        </IconButton>
        <IconButton href={"https://glencloughley.com"} target={"blank"}>
          <ContactMailIcon htmlColor={"#FFFFC7"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
