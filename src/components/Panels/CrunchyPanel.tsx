import * as React from "react";
import ContentContainer from "../ContentContainer";
import ContentTitle from "../ContentTitle";
import { Box, Grid, Typography } from "@material-ui/core";
import GithubButton from "../GithubButton";
import DescriptionContainer from "../DescriptionContainer";
import SummonerSearch from "../Crunchy/SummonerSearch";
import SummonerStats from "../Crunchy/SummonerStats";
import { useEffect, useState } from "react";
import axios from "axios";
import CrunchyProgress from "../Crunchy/CrunchyProgress";
import { CrunchySummoner } from "../types/RiotApiTypes";

const CrunchyPanel = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerQuery, setSummonerQuery] = useState("");
  const [data, setData] = useState<CrunchySummoner>();

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
          console.log(error);
        });
    }
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
      </ContentContainer>
      <Grid container justify={"center"}>
        {!isSearched && <SummonerSearch onEnter={setSummonerQuery} />}
      </Grid>
    </div>
  );
};

export default CrunchyPanel;
