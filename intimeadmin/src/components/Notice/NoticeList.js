import React from "react";
import Notice from "./Notice";

function NoticeList({ notices, setNotices }) {
  return (
    <div>
      <ul>
        {notices.map((notice) => (
          <Notice key={notice.id} item={notice} setNotices={setNotices} />
        ))}
      </ul>
    </div>
  );
}

export default NoticeList;
