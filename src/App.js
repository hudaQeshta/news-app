import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import {
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import ArticleDetailsScreen from "./screens/ArticleDetailsScreen";
import { NAVIGATION_PATHNAMES } from "./constants";

const App = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Routes>
          <Route path={NAVIGATION_PATHNAMES.HOMESCREEN} exact element={<HomeScreen/>} />
          <Route path={NAVIGATION_PATHNAMES.LOGINSCREEN} element={<LoginScreen/>} />
          <Route path={NAVIGATION_PATHNAMES.REGISTERSCREEN} element={<RegisterScreen/>} />
          <Route path={NAVIGATION_PATHNAMES.ARTICLEDETAILSSCREEN} element={<ArticleDetailsScreen/>} />
        </Routes>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
