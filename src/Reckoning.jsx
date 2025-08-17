import { useState, useEffect } from "react";

export default function Reckoning() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      //تبدیل اعضا به آرایه
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  return (
    <div>
      <h3>لیست اعضا</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
