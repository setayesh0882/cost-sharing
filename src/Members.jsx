import { useState , useEffect } from "react";
import Expense from "./Expense";

export default function Members() {
  const [members, setMembers] = useState("");
  const [saveMembers, setSaveMembers] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editVal, setEditVal] = useState("");

   useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      setSaveMembers(JSON.parse(storedMembers));
    }
  }, []);

    useEffect(() => {
    localStorage.setItem("members", JSON.stringify(saveMembers));
  }, [saveMembers]);

  const handleShow = () => {
    if (members.trim() === "") return;
    setSaveMembers([...saveMembers, members]);
    setMembers("");
  };

  const handleDelete = (indexToDelete) => {
    setSaveMembers(saveMembers.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index) => {
    setEditIdx(index);
    setEditVal(saveMembers[index]);
  };

  const handleSaveEdit = () => {
    const updated = [...saveMembers];
    updated[editIdx] = editVal;
    setSaveMembers(updated);
    setEditIdx(null);
    setEditVal("");
  };

  return (
    <div>
      <h2>ورود اعضا</h2>
      <input
        type="text"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        placeholder="نام اعضا را وارد کنید"
      />
      <button onClick={handleShow}>ثبت اعضا</button>

      <h3>اعضای ثبت شده</h3>
      <ul>
        {saveMembers.map((member, index) =>
          editIdx === index ? (
            <li key={index}>
              <input
                value={editVal}
                onChange={(e) => setEditVal(e.target.value)}
              />
              <button onClick={handleSaveEdit}>ذخیره</button>
              {/* <button onClick={() => setEditIdx(null)}>انصراف</button> */}
            </li>
          ) : (
            <li key={index}>
              {member}{" "}
              <button onClick={() => handleEdit(index)}>ویرایش</button>
              <button onClick={() => handleDelete(index)}>حذف</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
