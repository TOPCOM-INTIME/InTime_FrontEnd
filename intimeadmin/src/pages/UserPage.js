import React, { useContext, useEffect, useState } from "react";
import authContext from "../store/auth-context";
import axios from "axios";
import User from "../components/User/User";

function UserPage() {
  const [users, setUsers] = useState([]);
  const ctx = useContext(authContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("http://175.45.204.122:8000/admin/users", {
          headers: { Authorization: ctx.token },
        });
        console.log(res);
        setUsers(res.data);
      };
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, [ctx.token]);
  return (
    <React.Fragment>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </React.Fragment>
  );
}

export default UserPage;
