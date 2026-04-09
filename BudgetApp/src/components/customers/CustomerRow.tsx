import { useState } from "react";
import { useDispatch } from "react-redux";

import { setSelectedCRIN } from "../../state/CustomerSlice";
import type { Customer } from "../../models/Customer";
import AccountTable from "./AccountTable";

const CustomerRow = ({ customer }: { customer: Customer }) => {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>
          <button className="btn btn-sm" onClick={() => setOpen(!open)}>
            <i className="bi bi-caret-down-fill"></i>
          </button>
        </td>
        <td>{customer.CRIN}</td>
        <td>{customer.name}</td>
        <td>{customer.mobile}</td>
        <td>{customer.mailId}</td>
        <td>
          <button
            className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#accountModal" onClick={() => dispatch(setSelectedCRIN(customer.CRIN))}>
            Add Account
          </button>
        </td>
      </tr>

      {
        open && (
          <tr>
            <td colSpan={6}>
              <AccountTable CRIN={customer.CRIN} />
            </td>
          </tr>
        )
      }
    </>
  );
};

export default CustomerRow;