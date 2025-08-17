import { useState, useEffect } from "react";

export default function Summary() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  return (
    <div>
      <h3>اعضا</h3>
      <ul>
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
