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
const NewsCard = ({ topStory }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  return (
    <Card className={classes.card}>
      <Link to={NAVIGATION_PATHNAMES.ARTICLEDETAILSSCREEN}>
        <CardMedia
          className={classes.media}
          onClick={() => {
              localStorage.setItem("article", JSON.stringify(topStory))
              dispatch(setArticle(topStory))
          }}
          image={topStory?.multimedia ? topStory?.multimedia[0]?.url : ""}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{topStory?.byline}</Typography>
        <Typography variant="body2">
          {moment(topStory?.published_date).fromNow()}
        </Typography>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {[
            ...topStory?.des_facet?.slice(0, 2),
            ...topStory?.geo_facet,
            topStory?.section,
            topStory?.subsection,
          ]?.map((tag) => {
            const formattedTag =
              !tag.match(":") && tag?.length < 40
                ? tag
                    ?.replaceAll("'", "")
                    .replaceAll(",", "")
                    .replaceAll("( ", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll(" )", "")
                    .replaceAll("-", "")
                    .replaceAll(" ", "_")
                : "";
            return formattedTag &&
              formattedTag !== "" &&
              formattedTag.indexOf("#") !== 0
              ? `#${formattedTag} `
              : `${formattedTag} `;
          })}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {topStory?.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {topStory?.abstract}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
