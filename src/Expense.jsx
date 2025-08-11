import { useState, useEffect } from "react";

export default function Expense() {
  const [expense, setExpense] = useState("");
  const [recordExpense, setRecordExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [recordTitle, setRecordTitle] = useState([]);
  const [membersList, setMembersList] = useState([]); 
  const [selectedMember, setSelectedMember] = useState(""); 
  const [listOfMembers , setListOfMembers] = useState ([]);
  const [selectMembers , setSelectMembers] = useState ("");


  // useEffect (()=>{
  //   const storedMemberList = localStorage.getItem ("membersList");
  //   if (storedMemberList) {
  //     setSelectedMember (JSON.parse(storedMemberList));
  //   }
  // },[]);

  // useEffect (()=>{
  //   localStorage.setItem("membersList" , JSON.stringify(selectedMember));
  // }, [selectedMember]);


  useEffect(() => {
    const storedExpense = localStorage.getItem("expense");
    if (storedExpense) {
      setRecordExpense(JSON.parse(storedExpense));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(recordExpense));
  }, [recordExpense]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      setMembersList(JSON.parse(storedMembers));
    }
  }, []);

  //   useEffect(() => {
//     const storedTitle = localStorage.getItem("title");
//     if (storedTitle) {
//       setRecordTitle(JSON.parse(storedTitle));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("title", JSON.stringify(recordTitle));
//   }, [recordTitle]);


  const handleShowTitle = () => {
    if (title.trim() === "" || selectedMember ==="" ) return;
    setRecordTitle([...recordTitle, `$ {selectedMember}: $ {title}`]);
    setTitle("");
    selectedMember('');
  };

    const handleShowExpense = () => {
    if (expense.toString().trim() === "") return; 
    setRecordExpense([...recordExpense, expense]);
    setExpense("");
  };


  return (
    <div>
      <h2>ثبت خرج صورت گرفته</h2>
      
      <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
        <option value="">-- انتخاب پرداخت کننده --</option>
        {membersList.map((member, idx) => (
          <option key={idx} value={member}>
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
