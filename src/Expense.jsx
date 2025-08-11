import { useState, useEffect } from "react";
import Members from "./Members";

export default function Expense() {
  const [expense, setExpense] = useState("");
  const [recordExpense, setRecordExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [recordTitle, setRecordTitle] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  // const [listOfMembers, setListOfMembers] = useState([]);
  const [selectMembers, setSelectMembers] = useState("");


  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) {
      setRecordExpense(JSON.parse(storedExpense));
    }

    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      setMembersList(JSON.parse(storedMembers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(recordExpense));
  }, [recordExpense]);

  const handleShowExpense = () => {
    if (expense.trim() === "" || selectedMember.trim() === "") return;
    setRecordExpense([...recordExpense, `${selectedMember}: ${expense}`]);
    setExpense("");
  };



  const handleShowTitle = () => {
    if (title.trim() === "" || selectMembers.trim() === "") return;
    setRecordTitle([...recordTitle, `${selectMembers} : ${title}`]);
    setTitle("");
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
      <button onClick={handleShowExpense}>ثبت</button>

      <h3>نمایش مبلغ</h3>
      <ul>
        {recordExpense.map((exp, index) => (
          <li key={index}>{exp}</li>
        ))}
      </ul>




      <h2>عنوان هزینه</h2>

      <select
        value={selectMembers}
        onChange={(e) => setSelectMembers(e.target.value)}>
        <option value="">انتخاب اعضا</option>
        {membersList.map((member, index) => (
          <option key={index} value={member}>{member}</option>
        ))}
      </select>


      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="لطفا عنوان هزینه را وارد کنید"
      />
      <button onClick={handleShowTitle}>ثبت</button>

      <h3>نمایش عنوان</h3>
      <ul>
        {recordTitle.map((tit, index) => (
          <li key={index}>{tit}</li>
        ))}
      </ul>
    </div>
  );
}
