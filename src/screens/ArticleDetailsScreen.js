import { Button, Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import CommentsCard from "../components/CommentsCard";
import NewsCard from "../components/NewsCard";
import { NAVIGATION_PATHNAMES } from "../constants";
import { listComments, setArticle } from "../store/news.store";
import useStyles from "../styles";

function ArticleDetailsScreen({}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { isAuthed } = auth;
  const [message, setMessage] = useState("");
  const news = useSelector((state) => state.news);
  const { article, comments, error } = news;

  useEffect(() => {
    const tempArticle = JSON.parse(localStorage.getItem("article"))
      ? JSON.parse(localStorage.getItem("article"))
      : {};
    dispatch(setArticle(tempArticle));
    if (comments?.length === 0 && tempArticle?.url) {
      dispatch(listComments(tempArticle?.url));
    }
  }, [localStorage.getItem("article")]);
  return (
    <>
      {!isAuthed && <Navigate to={NAVIGATION_PATHNAMES.LOGINSCREEN} />}
      <Container spacing={10} justifyContent="center" alignItems="stretch">
        <Button
          variant="contained"
          flaot="left"
          onClick={() => localStorage.removeItem("article")}
          className={`${classes.goBackBtn} ${classes.marginSmall}`}
        >
          <Link id="article-back-link" to={NAVIGATION_PATHNAMES.HOMESCREEN}>
            Go Back
          </Link>
        </Button>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {article?.title && <NewsCard topStory={article} />}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CommentsCard comments={comments} />
          </Grid>
          
        </Grid>
      </Container>
    </>
  );
}

export default ArticleDetailsScreen;
