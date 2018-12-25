import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepOrange
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
