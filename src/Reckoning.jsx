import { useState, useEffect } from "react";

export default function Reckoning() {
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) setMembers(JSON.parse(storedMembers));

    const storedExpenses = localStorage.getItem("expense");
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  }, []);

  const handleReckoning = () => {
    let totalExpense = expenses.reduce((sum, exp) => sum + Number(exp.total), 0);
    let share = totalExpense / members.length;

    let paid = {};
    members.forEach((m) => (paid[m] = 0));

    expenses.forEach((exp) => {
      for (let [member, amount] of Object.entries(exp.details)) {
        paid[member] += Number(amount);
      }
    });

    let balances = members.map((m) => ({
      name: m,
      balance: paid[m] - share,
    }));

    let debtors = balances.filter((b) => b.balance < 0); بدهکار
    let creditors = balances.filter((b) => b.balance > 0); بستانکار

    let tx = [];

    for (let d of debtors) {
      for (let c of creditors) {
        if (d.balance === 0) break;
        if (c.balance === 0) continue;

        let amount = Math.min(Math.abs(d.balance), c.balance);
        if (amount > 0) {
          tx.push(`${d.name} باید به ${c.name} ${amount} بدهد`);
          d.balance += amount;
          c.balance -= amount;
        }
      }
    }

    setTransactions(tx);
  };

  const downloadData = () => {
    const text = transactions.join("\n");
    const link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    link.download = "reckoning.txt";
    link.click();
  };

  return (
    <div>
      <h3>لیست اعضا</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>

      <button onClick={handleReckoning}>تسویه</button>

      <h3>نتیجه تسویه</h3>
      <ul>
        {transactions.length === 0 ? (
          <li>هنوز تسویه انجام نشده</li>
        ) : (
          transactions.map((t, i) => <li key={i}>{t}</li>)
        )}
      </ul>

      {transactions.length > 0 && (
        <button onClick={downloadData}>دانلود فایل</button>
      )}
    </div>
  );
}
