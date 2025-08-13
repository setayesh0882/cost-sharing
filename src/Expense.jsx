import { useState, useEffect } from "react";

export default function Expense() {
  const [expense, setExpense] = useState("");
  const [recordExpense, setRecordExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [recordTitle, setRecordTitle] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(""); // پرداخت‌کننده
  const [selectedMembersList, setSelectedMembersList] = useState([]); // اعضای دخیل

  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) setRecordExpense(JSON.parse(storedExpense));

    const storedMembers = localStorage.getItem("members");
    if (storedMembers) setMembersList(JSON.parse(storedMembers));

    const storedTitles = localStorage.getItem("titles");
    if (storedTitles) setRecordTitle(JSON.parse(storedTitles));
  }, []);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(recordExpense));
  }, [recordExpense]);

  useEffect(() => {
    localStorage.setItem("titles", JSON.stringify(recordTitle));
  }, [recordTitle]);

  const handleShowExpense = () => {
    if (!expense.trim() || !selectedMember.trim()) return;
    setRecordExpense([
      ...recordExpense,
      `پرداخت‌کننده: ${selectedMember} | مبلغ: ${expense}`
    ]);
    setExpense("");
  };

  const handleToggleMember = (member) => {
    if (selectedMembersList.includes(member)) {
      setSelectedMembersList(selectedMembersList.filter((m) => m !== member));
    } else {
      setSelectedMembersList([...selectedMembersList, member]);
    }
  };

  const handleShowTitle = () => {
    if (!title.trim() || selectedMembersList.length === 0) return;
    setRecordTitle([
      ...recordTitle,
      `اعضا: ${selectedMembersList.join(", ")} | عنوان: ${title}`
    ]);
    setTitle("");
    setSelectedMembersList([]);
  };

  const handleDeleteExpense = (indexDelete) => {
    setRecordExpense(recordExpense.filter((_, index) => index !== indexDelete));
  };

  const handleDeleteTitle = (indexDelete) => {
    setRecordTitle(recordTitle.filter((_, index) => index !== indexDelete));
  };

  return (
    <div>
      <h2>ثبت خرج صورت گرفته</h2>

      <select
        value={selectedMember}
        onChange={(e) => setSelectedMember(e.target.value)}
      >
        <option value="">انتخاب پرداخت کننده</option>
        {membersList.map((member, index) => (
          <option key={index} value={member}>
            {member}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
        placeholder="لطفا مبلغ را وارد کنید"
      />
      <button onClick={handleShowExpense}>ثبت هزینه</button>

      <h3>لیست هزینه‌ها</h3>
      <ul>
        {recordExpense.map((exp, index) => (
          <li key={index}>
            {exp}
            <button onClick={() => handleDeleteExpense(index)}>حذف</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>انتخاب اعضا</h2>
      {membersList.map((member, index) => (
        <label key={index} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedMembersList.includes(member)}
            onChange={() => handleToggleMember(member)}
          />
          {member}
        </label>
      ))}

      <h2>ثبت عنوان هزینه</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="لطفا عنوان هزینه را وارد کنید"
      />
      <button onClick={handleShowTitle}>ثبت عنوان</button>

      <h3>لیست عنوان‌</h3>
      <ul>
        {recordTitle.map((tit, index) => (
          <li key={index}>
            {tit}
            <button onClick={() => handleDeleteTitle(index)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
