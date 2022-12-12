import axios from "axios";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../store/auth-context";
import Button from "../UI/Button";

function Ad({ ad, setAds }) {
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const d = await axios.delete(
        `http://175.45.204.122:8000/advertiser/adBanner=${ad.id}`,
        { headers: { Authorization: ctx.token } }
      );
      console.log(d);

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

  return (
    <div>
      <div>
        <img
          src={`http://175.45.204.122:8000${ad.fileUrl}`}
          alt="ad-img"
          style={{ width: "320px" }}
        />
      </div>
      <div>노출 횟수: {ad.impression}회</div>
      <Button
        onClick={() =>
          navigate("/ad/write", {
            state: {
              ad,
            },
          })
        }
      >
        수정
      </Button>
      <Button onClick={deleteHandler}>삭제</Button>
    </div>
  );
}

export default Ad;
