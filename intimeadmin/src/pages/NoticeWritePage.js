import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import authContext from "../store/auth-context";

function NoticeWritePage() {
  const data = useLocation();
  const isEdit = !!data?.state?.id;
  const [title, setTitle] = useState(isEdit ? data.state.title : "");
  const [content, setContent] = useState(isEdit ? data.state.content : "");
  const navigate = useNavigate();
  const ctx = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEdit) {
      try {
        await axios.put(
          `http://175.45.204.122:8000/admin/notice=${data.state.id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: ctx.token,
            },
          }
        );
        navigate(-1);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(
          `http://175.45.204.122:8000/admin/notice`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: ctx.token,
            },
          }
        );
        console.log(res.data);
        console.log(title, content);
        navigate(-1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const titleChangeHandler = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={titleChangeHandler}
      />
      <label htmlFor="content">내용</label>
      <textarea
        id="content"
        style={{ resize: "none" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">작성</Button>
    </form>
  );
}

export default NoticeWritePage;
