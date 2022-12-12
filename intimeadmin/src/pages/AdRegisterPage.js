import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import authContext from "../store/auth-context";

function AdRegisterPage() {
  const data = useLocation();
  const isEdit = !!data?.state?.ad;
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const [imageSrc, setImageSrc] = useState(
    isEdit ? `http://175.45.204.122:8000${data.state.ad.fileUrl}` : ""
  );
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const imgRef = useRef();

  console.log(isEdit);
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (image === null) {
      return;
    }

    const img = new FormData();
    img.append("banner", image);
    img.append("url", url);
    if (isEdit) {
      try {
        await axios.put(
          `http://175.45.204.122:8000/advertiser/adBanner=${data.state.ad.id}`,
          img,
          {
            headers: {
              Authorization: ctx.token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axios.post(
          `http://175.45.204.122:8000/advertiser/adBanner`,
          img,
          {
            headers: {
              Authorization: ctx.token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
    navigate(-1);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="url">이동 url</label>
        <br />
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="image">광고 이미지</label> <br />
        <input
          type="file"
          id="image"
          ref={imgRef}
          accept="image/*"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setImage(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
        <Button
          onClick={() => {
            imgRef.current.click();
          }}
        >
          사진 업로드
        </Button>
      </div>
      <div>
        {imageSrc && <img src={imageSrc} alt="ad" style={{ width: "320px" }} />}
      </div>
      <Button type="submit">작성</Button>
    </form>
  );
}

export default AdRegisterPage;
