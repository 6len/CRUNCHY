import * as React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import PagePanel from "../components/Panels/PagePanel";
import CrunchyPanel from "../components/Panels/CrunchyPanel";
import DbPanel from "../components/Panels/DbPanel";
import UwbPanel from "../components/Panels/UwbPanel";
import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { GlobalTheme } from "../styles/theme";
import MucPanel from "../components/Panels/MucPanel";
import AmalgamPanel from "../components/Panels/AmalgamPanel";
import GizmosPanel from "../components/Panels/GizmosPanel";
import { useEffect } from "react";
import PhixelPanel from "../components/Panels/PhixelPanel";

const IndexPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const summoner = params.get("summoner") || "";

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (value !== 0) {
      params.delete("summoner");
      location.search = "";
      window.history.replaceState({}, "", location.pathname);
    }
  }, [value]);

  return (
    <MuiThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <Box id={value === 4 && "amalgam"} height="100%">
        <Navbar value={value} onChange={setValue} />
        <PagePanel value={value} index={0}>
          <CrunchyPanel location={location} summoner={summoner} />
        </PagePanel>
        <PagePanel value={value} index={1}>
          <UwbPanel />
        </PagePanel>
        <PagePanel value={value} index={2}>
          <MucPanel />
        </PagePanel>
        <PagePanel value={value} index={3}>
          <DbPanel />
        </PagePanel>
        <PagePanel value={value} index={4}>
          <AmalgamPanel />
        </PagePanel>
        <PagePanel value={value} index={5}>
          <PhixelPanel />
        </PagePanel>
        <PagePanel value={value} index={6}>
          <GizmosPanel />
        </PagePanel>
      </Box>
    </MuiThemeProvider>
  );
};

export default IndexPage;
