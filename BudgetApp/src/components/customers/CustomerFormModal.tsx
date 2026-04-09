import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../state/AppStore";
import { addCustomer } from "../../state/CustomerSlice";

const CustomerFormModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const [CRIN, setCRIN] = useState<number | "">("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mailId, setMailId] = useState("");

  const saveCustomer = () => {
    if (CRIN === "" || !name || !mobile || !mailId) return;

    dispatch(
      addCustomer({CRIN, name, mobile, mailId})
    );

    setCRIN("");
    setName("");
    setMobile("");
    setMailId("");
  };

  return (
    <div className="modal fade" id="customerModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add Customer</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            <input type="number" className="form-control mb-3" placeholder="CRIN" value={CRIN} onChange={e => setCRIN(Number(e.target.value))}/>

            <input type="text" className="form-control mb-3" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>

            <input type="text" className="form-control mb-3" placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)}/>

            <input type="email" className="form-control" placeholder="MailId" value={mailId} onChange={e => setMailId(e.target.value)}/>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={saveCustomer}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerFormModal;