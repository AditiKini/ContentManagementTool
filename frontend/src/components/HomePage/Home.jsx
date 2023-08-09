import React from "react";
import BlogImage from "../BlogImage/BlogImage";
import Category from "./Category";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Posts from "./post/Posts";

const Home = () => {

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid container>
        {isMediumScreen ? (
          <> useMediaQuery
            <Grid item xs={12} lg={10} md={9} sm={8} order={{ xs: 1, sm:  1}}>
              <Grid container>
                <Grid item xs={12}>
                  <BlogImage />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={2} md={3} sm={4} order={{ xs: 2, sm: 2 }}>
              <Category />
            </Grid>
            <Grid item xs={12} lg={10} md={9} sm={8} order={{ xs: 3, sm: 3 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Posts />
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={2} md={3} sm={4}>
              <Category />
            </Grid>
            <Grid item xs={12} lg={10} md={9} sm={8}>
              <Grid container>
                <Grid item xs={12}>
                  <BlogImage />
                </Grid>
                <Grid item xs={12}>
                  <Posts />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Home;
