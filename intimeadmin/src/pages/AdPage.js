import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import authContext from "../store/auth-context";
import axios from "axios";
import Ad from "../components/Ad/Ad";

function AdPage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const ctx = useContext(authContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://175.45.204.122:8000/advertiser/myAdBanner/all",
          {
            headers: {
              Authorization: ctx.token,
            },
          }
        );
        setAds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (ctx.isLoggedIn) {
      fetchData();
    }
  }, [ctx.token, ctx.isLoggedIn]);

  console.log(ads);

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => navigate("/ad/write")}>추가</Button>
      </div>
      <div>
        {ads.map((ad) => (
          <Ad key={ad.id} ad={ad} setAds={setAds} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default AdPage;
