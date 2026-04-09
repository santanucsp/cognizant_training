import { Fragment } from "react/jsx-runtime";
import type { TxnsSummary } from "../../models/TxnsSummary";

const TxnsFooter = ({ summary }: { summary: TxnsSummary }) => (
  <Fragment>
    <div className="row p-1 mb-1 border-bottom border-dark fw-bold">
      <div className="col text-end">Totals</div>
      <div className="col-2 text-end">{summary.totalCredit}</div>
      <div className="col-2 text-end">{summary.totalDebit}</div>
      <div className="col-2"></div>
    </div>

    <div className="row p-1 mb-1 border-bottom border-dark fw-bold">
      <div className="col text-end">Balance</div>
      <div className="col-2"></div>
      <div className="col-2 text-end">{summary.balance}</div>
      <div className="col-2"></div>
    </div>
  </Fragment>
);

export default TxnsFooter;