import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users From PostgreSQL</h1>

      {users.map((user) => (
        <div key={user.id}>
          {user.id} - {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;