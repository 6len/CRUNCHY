import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import GithubButton from "../GithubButton";
import DescriptionContainer from "../DescriptionContainer";
import SummonerSearch from "../Crunchy/SummonerSearch";
import SummonerStats from "../Crunchy/SummonerStats";
import { useEffect, useState } from "react";
import axios from "axios";
import CrunchyProgress from "../Crunchy/CrunchyProgress";
import { CrunchySummoner } from "../types/RiotApiTypes";
import { CrunchyPanelStyles } from "./styles";
import * as queryString from "querystring";

type Props = {
  location: any;
  classes: {
    terms: string;
    midSummonerSearch: string;
  };
  summoner?: string;
};

const CrunchyPanel = ({ location, classes, summoner = "" }: Props) => {
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerQuery, setSummonerQuery] = useState("");
  const [data, setData] = useState<CrunchySummoner>();

  useEffect(() => {
    if (summoner !== "") {
      setSummonerQuery(summoner);
    }
  }, []);

  const resetPage = () => {
    setIsSearched(false);
    setSummonerQuery("");
  };

  useEffect(() => {
    if (summonerQuery !== "") {
      setIsLoading(true);
      axios
        .get(`https://crunchyapi.herokuapp.com/summoner/${summonerQuery}`)
        .then((response) => {
          setIsLoading(false);
          setData(response.data);
          setIsSearched(true);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    const path =
      summonerQuery !== ""
        ? `${location.pathname}?summoner=${summonerQuery}`
        : location.pathname;

    window.history.replaceState({}, "", path);
  }, [summonerQuery]);

  return (
    <div>
      {isLoading && <CrunchyProgress />}
      <ContentContainer>
        <Grid container direction="row" justify="space-between">
          <Box>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <ContentTitle
                color="#C46B16"
                onClick={resetPage}
                clickable={true}
              >
                Crunchy
              </ContentTitle>
              <GithubButton url="https://github.com/6len/CRUNCHY" />
              <GithubButton
                url="https://github.com/6len/CrunchyApi"
                tooltip="View API on Github"
                color="error"
              />
            </Grid>
          </Box>

          {isSearched && <SummonerSearch onEnter={setSummonerQuery} />}
        </Grid>
        {!isSearched && (
          <DescriptionContainer>
            <Typography variant="body1">
              Crunchy is a web based application for querying summoners in
              League of Legends showing their last 10 games in detail and some
              information about their League of Legends account !
            </Typography>
          </DescriptionContainer>
        )}
        {isSearched && (
          <SummonerStats data={data} onSummonerClick={setSummonerQuery} />
        )}
        {!isSearched && (
          <Grid
            container
            justify={"center"}
            className={classes.midSummonerSearch}
          >
            <SummonerSearch onEnter={setSummonerQuery} />
          </Grid>
        )}
        <Grid container className={classes.terms}>
          <Typography variant={"body2"}>
            Crunchy isn't endorsed by Riot Games and doesn't reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games, and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </Typography>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default withStyles(CrunchyPanelStyles)(CrunchyPanel);
