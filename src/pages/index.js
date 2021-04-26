import * as React from "react";
import Navbar from "../components/Navbar";
import PagePanel from "../components/Panels/PagePanel";
import CrunchyPanel from "../components/Panels/CrunchyPanel";
import DbPanel from "../components/Panels/DbPanel";
import UwbPanel from "../components/Panels/UwbPanel";
import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { GlobalTheme } from "../styles/theme";
import MucPanel from "../components/Panels/MucPanel";
import AmalgamPanel from "../components/Panels/AmalgamPanel";

const IndexPage = () => {
  const [value, setValue] = React.useState(0);

  return (
    <MuiThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <Box height="100%">
        <Navbar value={value} onChange={setValue} />
        <PagePanel value={value} index={0}>
          <CrunchyPanel />
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
      </Box>
    </MuiThemeProvider>
  );
};

export default IndexPage;
