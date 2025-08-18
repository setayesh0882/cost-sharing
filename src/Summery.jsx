import { useState, useEffect } from "react";

export default function Summary() {
    const [members, setMembers] = useState([]);
    const [recordExpense, setRecordExpense] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberTotalPaid, setMemberTotalPaid] = useState(0);
    const [memberShouldPay, setMemberShouldPay] = useState(0);

    useEffect(() => {
        const storedMembers = localStorage.getItem("members");
        if (storedMembers) setMembers(JSON.parse(storedMembers));

        const storedExpense = localStorage.getItem("expense");
        if (storedExpense) setRecordExpense(JSON.parse(storedExpense));
    }, []);

    const handleClickMember = (member) => {
        setSelectedMember(member);

        const totalPaid = recordExpense.reduce((sum, exp) => {
            return sum + (Number(exp.details[member] || 0));
        }, 0);
        setMemberTotalPaid(totalPaid);

        const totalExpense = recordExpense.reduce((sum, exp) => sum + Number(exp.total), 0);
        const perMember = members.length > 0 ? totalExpense / members.length : 0;
        setMemberShouldPay(perMember);
    };

    const memberDebt = memberShouldPay - memberTotalPaid;
    const memberCredit = memberTotalPaid - memberShouldPay;

    return (
        <div>
            <h3>اعضا</h3>
            <ul>
                {members.map((member) => (
                    <li
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickMember(member)}
                    >
                        {member}
                    </li>
                ))}
            </ul>

            {selectedMember && (
                <div>
                    <h4>وضعیت مالی {selectedMember}:</h4>
                    <p>پرداخت کرده: {memberTotalPaid}</p>
                    <p>باید پرداخت می‌کرد: {memberShouldPay}</p>
                    <p>بدهکاری: {memberDebt > 0 ? memberDebt : 0}</p>
                    <p>بستانکاری: {memberCredit > 0 ? memberCredit : 0}</p>
                </div>
            )}
        </div>
    );
}
