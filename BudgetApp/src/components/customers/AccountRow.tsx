import { useNavigate } from "react-router";

import type { Account } from "../../models/Account";

const AccountRow = ({ account }: { account: Account }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{account.accNum}</td>
      <td>{account.type}</td>
      <td>{account.balance}</td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={() => navigate(`/${account.CRIN}/statement/${account.accNum}`)}>
          Statement
        </button>
      </td>
    </tr>
  );
};

export default AccountRow;