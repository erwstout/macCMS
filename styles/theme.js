import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
  palette: {
    type: "dark"
    // primary: lightBlue,
    // secondary: amber
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
