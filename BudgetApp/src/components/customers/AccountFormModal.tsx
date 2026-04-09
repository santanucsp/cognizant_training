import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../state/AppStore";
import { addAccount } from "../../state/AccountSlice";

const AccountFormModal = () => {

  const dispatch: AppDispatch = useDispatch();

  const CRIN = useSelector(
    (state: RootState) => state.customers.selectedCRIN
  );


  const [accNum, setAccNum] = useState<number | "">("");
  const [type, setType] = useState<"Savings" | "Current">("Savings");
  const [balance, setBalance] = useState<number>(0);

  const saveAccount = () => {
    if (!CRIN || accNum === "") return;

    dispatch(
      addAccount({accNum, type, balance, CRIN})
    );

    setAccNum("");
    setType("Savings");
    setBalance(0);
  };

  return (
    <div className="modal fade" id="accountModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add Account</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            <input type="number" className="form-control mb-3" placeholder="AccNum" value={accNum} onChange={e => setAccNum(Number(e.target.value))}/>

            <select className="form-select mb-3" value={type} onChange={e => setType(e.target.value as "Savings" | "Current")}>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>

            <input type="number" className="form-control" placeholder="CurrentBalance" value={balance} onChange={e => setBalance(Number(e.target.value))}/>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={saveAccount}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountFormModal;