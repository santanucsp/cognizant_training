import CustomerTable from "./CustomerTable";
import CustomerFormModal from "./CustomerFormModal";
import AccountFormModal from "./AccountFormModal";

const CustomerPage = () => {
  return (
    <div className="container mt-4">

      <div className="mb-3 text-end">
        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#customerModal">
          Add Customer
        </button>
      </div>

      <CustomerTable />

      <CustomerFormModal />
      <AccountFormModal />
    </div>
  );
};

export default CustomerPage;