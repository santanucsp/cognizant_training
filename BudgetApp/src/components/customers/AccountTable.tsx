import { useSelector } from "react-redux";
import type { RootState } from "../../state/AppStore";
import AccountRow from "./AccountRow";

const AccountTable = ({ CRIN }: { CRIN: number }) => {

  const accounts = useSelector((state: RootState) =>
    state.accounts.accounts.filter(a => a.CRIN === CRIN)
  );

  const txns = useSelector(
    (state: RootState) => state.statement.txns
  );

  if (accounts.length === 0) {
    return <div className="text-muted">No accounts</div>;
  }

  return (
    <table className="table table-sm table-secondary">
      <thead>
        <tr>
          <th>Acc No</th>
          <th>Type</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {
          accounts.map( account => {
            const balance = txns.filter(t => t.accNum === account.accNum).reduce((bal, t) =>
                  t.txnType === "CREDIT" ? bal + t.amount : bal - t.amount, 0
              );

            return <AccountRow key={account.accNum} account={{ ...account, balance }}/>
          })
        }
      </tbody>
    </table>
  );
};

export default AccountTable;