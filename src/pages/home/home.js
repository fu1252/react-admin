import React from "react";
import { useHistory } from "react-router-dom";

function Home({ children }) {
  let history = useHistory();

  return (
    <div>
      <button className="custom-btn" onClick={() => history.push("/login")}>
        登录{" "}
      </button>
      主页
      <button className="custom-btn" onClick={() => history.push("/test")}>
        test{" "}
      </button>
    </div>
  );
}

export default Home;
