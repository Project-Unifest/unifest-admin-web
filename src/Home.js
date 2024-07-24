import { useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";

function Home({ accessToken }) {
  const navigator = useNavigate();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    console.log("loaded!");
    forceUpdate();
  });
  console.log(accessToken);
  return (
    <div style={{ height: "100%" }}>
      {accessToken ? navigator("/members") : navigator("/login")}
    </div>
  );
}

export default Home;
