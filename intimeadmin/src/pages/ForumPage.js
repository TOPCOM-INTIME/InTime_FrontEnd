import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import authContext from "../store/auth-context";
import Forum from "../components/Forum/Forum";

function ForumPage() {
  const [forums, setForums] = useState([]);
  const ctx = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://175.45.204.122:8000/api/forums/all", {
        headers: {
          Authorization: ctx.token,
        },
      });

      setForums(res.data);
    };

    fetchData();
  }, [ctx.token]);

  console.log(forums);
  return (
    <React.Fragment>
      <h1>문의사항</h1>
      <div style={{ height: "1px", backgroundColor: "black" }} />
      {forums.map((forum) => (
        <Forum key={forum.id} forum={forum} setForums={setForums} />
      ))}
    </React.Fragment>
  );
}

export default ForumPage;
