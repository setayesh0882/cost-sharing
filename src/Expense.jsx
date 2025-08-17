import { useState, useEffect } from "react";

export default function Expense() {
  const [expense, setExpense] = useState("");
  const [recordExpense, setRecordExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [recordTitle, setRecordTitle] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [memberAmounts, setMemberAmounts] = useState({});

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
    let total = 0;
    membersList.forEach((m) => {
      total += Number(memberAmounts[m] || 0);
    });

    if (total !== Number(expense)) {
      alert("جمع مبلغ وارد شده برای اعضا باید برابر با مبلغ کل باشد");
      return;
    }

    setRecordExpense([
      ...recordExpense,
      { total: expense, details: { ...memberAmounts } },
    ]);

    setExpense("");
    setMemberAmounts({});
  };

  const handleDeleteExpense = (index) => {
    setRecordExpense(recordExpense.filter((_, i) => i !== index));
  };

  const handleShowTitle = () => {
    if (!title.trim()) return;
    setRecordTitle([...recordTitle, title]);
    setTitle("");
  };

  const handleDeleteTitle = (index) => {
    setRecordTitle(recordTitle.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>ثبت خرج صورت گرفته</h2>

      <input
        type="number"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
        placeholder="مبلغ کل را وارد کنید"
      />

      <h4>مبلغ هر عضو</h4>
      {membersList.map((member, index) => (
        <div key={index}>
          {member}:{" "}
          <input
            type="number"
            value={memberAmounts[member] || ""}
            onChange={(e) =>
              setMemberAmounts({
                ...memberAmounts,
                [member]: e.target.value,
              })
            }
            placeholder="مبلغ پرداخت شده"
          />
        </div>
      ))}

      <button onClick={handleShowExpense}>ثبت هزینه</button>

      <h3>لیست هزینه‌ها</h3>
      <ul>
        {recordExpense.map((exp, index) => (
          <li key={index}>
            <b>مبلغ کل:</b> {exp.total}
            <ul>
              {Object.entries(exp.details).map(([member, amount]) => (
                <li key={member}>
                  {member}: {amount}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDeleteExpense(index)}>حذف</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>ثبت عنوان هزینه</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان هزینه"
      />
      <button onClick={handleShowTitle}>ثبت عنوان</button>

      <h3>لیست عنوان‌ها</h3>
      <ul>
        {recordTitle.map((tit, index) => (
          <li key={index}>
            {tit}{" "}
            <button onClick={() => handleDeleteTitle(index)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
