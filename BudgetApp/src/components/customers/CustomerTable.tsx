import { useSelector } from "react-redux";

import type { RootState } from "../../state/AppStore";
import CustomerRow from "./CustomerRow";

const CustomerTable = () => {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );

  return (
    <table className="table table-bordered">
      <thead>
        <tr className="table-warning">
          <th></th>
          <th>CRIN</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>MailId</th>
          <th>Add Account</th>
        </tr>
      </thead>
      <tbody>
        {
          customers.map(c => (
            <CustomerRow key={c.CRIN} customer={c} />
          ))
        }
      </tbody>
    </table>
  );
};

export default CustomerTable;