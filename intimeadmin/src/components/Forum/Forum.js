import axios from "axios";
import React, { useContext } from "react";
import authContext from "../../store/auth-context";
import Button from "../UI/Button";

function Forum({ forum, setForums }) {
  const ctx = useContext(authContext);
  return (
    <div>
      <div style={{ height: "1px", backgroundColor: "black" }} />
      <h3>제목: {forum.title}</h3>
      <h4>내용: {forum.content}</h4>
      <div>작성일: {new Date(forum.createDate).toLocaleString()}</div>
      <div>
        작성자: {forum.writer.username} / {forum.writer.email}
      </div>
      <div>
        <Button
          onClick={async () => {
            try {
              await axios.delete(
                `http://175.45.204.122:8000/api/forum=${forum.id}`,
                {
                  headers: {
                    Authorization: ctx.token,
                  },
                }
              );
              const res = await axios.get(
                "http://175.45.204.122:8000/api/forums/all",
                {
                  headers: {
                    Authorization: ctx.token,
                  },
                }
              );

              setForums(res.data);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          처리 완료
        </Button>
      </div>
    </div>
  );
}

export default Forum;
