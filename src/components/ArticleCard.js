import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { setArticle } from "../store/news.store";
import { NAVIGATION_PATHNAMES } from "../constants";
const ArticleCard = ({ article }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  return (
    <Card className={classes.card}>
      <Link to={NAVIGATION_PATHNAMES.ARTICLEDETAILSSCREEN}>
        <CardMedia
          className={classes.media}
          onClick={() => dispatch(setArticle(article))}
          image={article?.multimedia ? article?.multimedia[0]?.url : ""}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{article?.byline?.original}</Typography>
        <Typography variant="body2">
          {moment(article?.pub_date).fromNow()}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
            {article?.lead_paragraph}
        </Typography>
      </div>
      {/* <Typography className={classes.title} variant="h5" gutterBottom>
        {article?.title}
      </Typography> */}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {article?.abstract}
        </Typography>
        <Link to={article?.web_url}>
            {article?.web_url}
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
