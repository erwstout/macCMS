import React from "react";
import Typography from "@material-ui/core/Typography";
import AdminContainer from "./common/AdminContainer";

const NoAccess = () => (
  <AdminContainer>
    <Typography variant="h3">Restricted</Typography>
    <Typography variant="body1">
      Sorry, it looks like you ventured off the beaten path. This page is
      unavailable to your user type.
    </Typography>
  </AdminContainer>
);

export default NoAccess;
