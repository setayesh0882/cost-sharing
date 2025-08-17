import { useState, useEffect } from "react";

export default function Summary() {
  const [members, setMembers] = useState([]);
  const [recordExpense, setRecordExpense] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberTotal, setMemberTotal] = useState(0);

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) setMembers(JSON.parse(storedMembers));

    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) setRecordExpense(JSON.parse(storedExpense));
  }, []);

  const handleClickMember = (member) => {
    setSelectedMember(member);
    const total = recordExpense.reduce((sum, exp) => {
      return sum + (Number(exp.details[member] || 0));
    }, 0);
    setMemberTotal(total);
  };

  return (
    <div>
      <h3>اعضا</h3>
      <ul>
        {members.map((member) => (
          <li
            key={member}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickMember(member)}
          >
            {member}
          </li>
        ))}
      </ul>

      {selectedMember && (
        <div>
          <h4>مبلغ پرداختی {selectedMember}:</h4>
          <p>{memberTotal}</p>
        </div>
      )}
    </div>
  );
}
