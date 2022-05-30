import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import newsLogo from "../logo.svg";
// import Header from "../components/Header/Header";
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORIES, NAVIGATION_PATHNAMES } from "../constants";
import Categories from "../components/Categories";
import {
  clearSearchReasults,
  clearTopStories,
  listTopStories,
  searchResults,
  setSelectedCategory,
} from "../store/news.store";
import { Pagination } from "@material-ui/lab";
import NewsCard from "../components/NewsCard";
import Search from "../components/Search";
import ArticleCard from "../components/ArticleCard";
import { logout } from "../store/auth.store";
const HomeScreen = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const auth = useSelector((state) => state.auth);
  const { isAuthed } = auth;
  const news = useSelector((state) => state.news);
  const { topStories, loading, selectedCategory, searchResults } = news;
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "") {
      dispatch(listTopStories(selectedCategory));
    }
  }, [selectedCategory]);
  return (
    <>
      {!isAuthed && (
        <Navigate id="login-link" to={NAVIGATION_PATHNAMES.LOGINSCREEN} />
      )}
      {loading ? (
        <Box>
          <CircularProgress
            color="secondary"
            left={-20}
            top={-20}
            className={classes.circularProgress}
          />
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Button
            variant="contained"
            flaot="left"
            onClick={() => {
              dispatch(clearTopStories());
              dispatch(clearSearchReasults());
              dispatch(logout());
            }}
            className={`${classes.goBackBtn} ${classes.marginSmall}`}
          >
            Logout
          </Button>
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              News
            </Typography>
            <img
              className={classes.image}
              src={newsLogo}
              alt="logo"
              height="60"
            />
          </AppBar>
          <Grow in>
            <Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Categories
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Search keyword={keyword} setKeyword={setKeyword} />
                </Grid>
              </Grid>
              {searchResults?.length > 0 && (
                <Button
                  variant="contained"
                  flaot="left"
                  onClick={() => {
                    setKeyword("");
                    dispatch(clearSearchReasults());
                  }}
                  className={`${classes.goBackBtn}`}
                >
                  <Link
                    id="article-back-link"
                    to={NAVIGATION_PATHNAMES.HOMESCREEN}
                  >
                    Go Back
                  </Link>
                </Button>
              )}
              <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                {searchResults?.length > 0 ? (
                  <>
                    {searchResults[page - 1]
                      ?.filter(
                        (article) =>
                          article?.byline && article?.byline?.original !== ""
                      )
                      ?.map((article) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          key={article?.uri}
                        >
                          <ArticleCard article={article} />
                        </Grid>
                      ))}
                    <Grid
                      container
                      xs={12}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Pagination
                        count={searchResults?.length}
                        page={page}
                        onChange={(event, value) => {
                          setPage(value);
                        }}
                        variant="outlined"
                        shape="rounded"
                        className={classes.centeredContent}
                      />
                    </Grid>
                  </>
                ) : (
                  topStories
                    ?.filter(
                      (topStory) => topStory?.byline && topStory?.byline !== ""
                    )
                    ?.map((topStory) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        key={topStory?.uri}
                      >
                        <NewsCard topStory={topStory} />
                      </Grid>
                    ))
                )}
              </Grid>
            </Grid>
          </Grow>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
