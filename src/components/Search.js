import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import { searchResults } from "../store/news.store";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { Autocomplete } from "@material-ui/lab";

const Search = ({ keyword, setKeyword }) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword && keyword !== "") {
      const topFiveSearch = JSON.parse(localStorage.getItem("topFiveSearch")) || []
      let topFiveSearchInLocalStorage = topFiveSearch?.includes(keyword) ? topFiveSearch : [...topFiveSearch, keyword]
      const topFiveSearchInLocalStorageLength = topFiveSearchInLocalStorage?.length
      if (topFiveSearchInLocalStorageLength > 5) {
        topFiveSearchInLocalStorage = topFiveSearchInLocalStorage.slice(1, topFiveSearchInLocalStorageLength)
      }
      localStorage.setItem("topFiveSearch", JSON.stringify(topFiveSearchInLocalStorage))
      dispatch(searchResults(keyword))
    }
  }
  
  return (
    <form onSubmit={submitHandler} className={classes.fullHeightCard}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={JSON.parse(localStorage.getItem("topFiveSearch")) || []}
          sx={{ width: 300 }}
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          placeholder="Search for a story..."
          inputValue={keyword}
          onInputChange={(e, newInputValue) => setKeyword(newInputValue)}
          renderInput={(params) => 
            <TextField 
            {...params} 
            classes={{
              root: classes.inputRoot,
            }}
            />}
        />
      </div>
    </form>
  );
};

export default Search;
