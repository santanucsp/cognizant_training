import { useSelector } from "react-redux";
import { useParams } from "react-router";

import type { RootState } from "../../state/AppStore";
import TxnsHeader from "./TxnsHeader";
import TxnForm from "./TxnForm";
import TxnRow from "./TxnRow";
import TxnsFooter from "./TxnsFooter";

const Statement = () => {

  const { accNum } = useParams();
  const accountNo = Number(accNum);

  const txns = useSelector((state: RootState) =>
    state.statement.txns.filter(t => t.accNum === accountNo)
  );

  const summary = txns.reduce(
    (acc, txn) => {
      if (txn.txnType === "CREDIT") {
        acc.totalCredit += txn.amount;
      } else if (txn.txnType === "DEBIT") {
        acc.totalDebit += txn.amount;
      }
      acc.balance = acc.totalCredit - acc.totalDebit;
      return acc;
    },
    { totalCredit: 0, totalDebit: 0, balance: 0 }
  );

  return (
    <section className="col-sm-10 m-2 mx-auto p-2">
      <h3>Statement</h3>

      <TxnsHeader />
      <TxnForm accNum={accountNo} />

      {txns.map(t =>
        t.isEditable ? (
          <TxnForm key={t.id} t={t} accNum={accountNo} />
        ) : (
          <TxnRow key={t.id} txn={t} />
        )
      )}

      <TxnsFooter summary={summary} />
    </section>
  );
};

export default Statement;