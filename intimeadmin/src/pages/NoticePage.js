import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import NoticeList from "../components/Notice/NoticeList";
import authContext from "../store/auth-context";
import axios from "axios";

function NoticePage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const ctx = useContext(authContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://175.45.204.122:8000/api/notices", {
          headers: {
            Authorization: ctx.token,
          },
        });
        setNotices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (ctx.isLoggedIn) {
      fetchData();
    }
  }, [ctx.token, ctx.isLoggedIn]);

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => navigate("/notice/write")}>추가</Button>
      </div>
      <div>
        <NoticeList notices={notices} setNotices={setNotices} />
      </div>
    </React.Fragment>
  );
}

export default NoticePage;
