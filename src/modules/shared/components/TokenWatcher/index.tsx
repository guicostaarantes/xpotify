import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ApplicationState } from "#/shared/store";

const TokenWatcher = () => {
  const token = useSelector((store: ApplicationState) => store.user.token);
  const fetchUserStatus = useSelector(
    (store: ApplicationState) => store.user.fetchUserStatus,
  );

  const history = useHistory();

  useEffect(() => {
    if (token === "" && fetchUserStatus === "idle") {
      history.push("/token");
    }
  }, [token]);

  return null;
};

export default TokenWatcher;
