import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { NAVIGATION_PATHNAMES } from "../constants";
const CommentsCard = ({ comments }) => {
  const classes = useStyles();
 
  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <CardContent>
        {comments?.map(comment => 
          <>
            <Typography variant="body2" color="textSecondary">
              {comment?.commentTitle}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {comment?.commentBody}
            </Typography>
            <hr/>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentsCard;
