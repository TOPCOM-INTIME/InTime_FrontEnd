import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authContext from "../../store/auth-context";

function Notice({ item, setNotices }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(authContext);

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://175.45.204.122:8000/admin/notice=${item.id}`, {
        headers: {
          Authorization: ctx.token,
        },
      });
      const res = await axios.get(`http://175.45.204.122:8000/api/notices`, {
        headers: {
          Authorization: ctx.token,
        },
      });
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li>
      <div>
        <span>{item.title}</span>
        <div>
          {visible ? (
            <Button onClick={() => setVisible(false)}>숨기기</Button>
          ) : (
            <Button onClick={() => setVisible(true)}>내용 보기</Button>
          )}
          <Button
            onClick={() =>
              navigate("/notice/write", {
                state: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                },
              })
            }
          >
            수정
          </Button>
          <Button onClick={deleteHandler}>삭제</Button>
        </div>
      </div>
      {visible && <div>{item.content}</div>}
    </li>
  );
}

export default Notice;
