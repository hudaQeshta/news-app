import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../store/news.store";
const Categories = ({ categories, selectedCategory }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)

  return (
    <FormControl className={classes.fullWidth}>
        <InputLabel className={classes.categoryLabel} id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          className={classes.categorySelect}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          input={<OutlinedInput label="Category" />}
        >
          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default Categories;
