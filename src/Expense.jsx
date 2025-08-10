import { useState, useEffect } from "react";

export default function Expense() {
  const [expense, setExpense] = useState("");
  const [recordExpense, setRecordExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [recordTitle, setRecordTitle] = useState([]);

  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) {
      setRecordExpense(JSON.parse(storedExpense));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(recordExpense));
  }, [recordExpense]);

//   useEffect(() => {
//     const storedTitle = localStorage.getItem("title");
//     if (storedTitle) {
//       setRecordTitle(JSON.parse(storedTitle));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("title", JSON.stringify(recordTitle));
//   }, [recordTitle]);

  const handleShowExpense = () => {
    if (expense.toString().trim() === "") return; // اگر می‌خوای این خط بمونه
    setRecordExpense([...recordExpense, expense]);
    setExpense("");
  };

  const handleShowTitle = () => {
    if (title.trim() === "") return;
    setRecordTitle([...recordTitle, title]);
    setTitle("");
  };

  return (
    <div>
      <h2>ثبت خرج صورت گرفته</h2>
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
