import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Table, Button, Form, Modal, Stack } from 'react-bootstrap';
import { addTransaction, updateTransaction, deleteTransaction } from '../store/statementSlice';

interface Activity {
  id: number;
  title: string;
  status: string;
}

export const ActivityManager: React.FC = () => {

  const dispatch = useDispatch();

  const transactions = useSelector((state: RootState) => state.statement.transactions);
  const newTransaction = useRef<Map<string, HTMLInputElement>>(new Map());
  const editTransaction = useRef<Map<string, HTMLInputElement>>(new Map());
  const [editingTransactionId, setEditingTransactionId] = useState<number | null>(null);

  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);
  const balance = totalCredit - totalDebit;  


  console.log("Transactions:", transactions);


  // // 2. CREATE & UPDATE: Handle Save
  // const handleSave = () => {
  //   if (currentActivity) {
  //     // UPDATE logic
  //     setActivities(activities.map(a => 
  //       a.id === currentActivity.id ? { ...a, ...formData } : a
  //     ));
  //   } else {
  //     // CREATE logic
  //     const newActivity = {
  //       id: Date.now(),
  //       ...formData
  //     };
  //     setActivities([...activities, newActivity]);
  //   }
  //   handleClose();
  // };

  // // 3. DELETE: Handle Remove
  // const handleDelete = (id: number) => {
  //   if (window.confirm("Are you sure you want to delete this activity?")) {
  //     setActivities(activities.filter(a => a.id !== id));
  //   }
  // };

  // // UI Helpers
  // const handleClose = () => {
  //   setShowModal(false);
  //   setCurrentActivity(null);
  //   setFormData({ title: '', status: 'Pending' });
  // };

  // const handleEdit = (activity: Activity) => {
  //   setCurrentActivity(activity);
  //   setFormData({ title: activity.title, status: activity.status });
  //   setShowModal(true);
  // };

  const handleAdd = () => {
    const newTransactionData = {
      id: parseInt(newTransaction.current.get('inputId')?.value || '0'),
      date: newTransaction.current.get('inputDate')?.value || '',
      header: newTransaction.current.get('inputDescription')?.value || '',
      credit: parseFloat(newTransaction.current.get('inputCredit')?.value || '0'),
      debit: parseFloat(newTransaction.current.get('inputDebit')?.value || '0'),
    };

    if(newTransactionData.credit === 0 && newTransactionData.debit === 0) {
      alert("Please enter a valid credit or debit amount.");
      return;
    }
    else if(newTransactionData.credit > 0 && newTransactionData.debit > 0) {
      alert("Please enter a valid credit or debit amount.");
      return;
    }
    else{      
      dispatch(addTransaction(newTransactionData))
      newTransaction.current.forEach(input => input.value = '');
    }
  };

  const handleSave = (id: number) => {
    const updatedTransactionData = {
      id: parseInt(editTransaction.current.get('inputId')?.value || '0'), 
      date: editTransaction.current.get('inputDate')?.value || '',
      header: editTransaction.current.get('inputDescription')?.value || '',
      credit: parseFloat(editTransaction.current.get('inputCredit')?.value || '0'),
      debit: parseFloat(editTransaction.current.get('inputDebit')?.value || '0'),
    };  
    dispatch(updateTransaction(updatedTransactionData));
    setEditingTransactionId(null);
  };  

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    } 
  };

  const handleEdit = (id: number) => {
    setEditingTransactionId(id);
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      editTransaction.current.get('editId')!.value = transaction.id.toString();
      editTransaction.current.get('editDate')!.value = transaction.date;
      editTransaction.current.get('editDescription')!.value = transaction.header;
      editTransaction.current.get('editCredit')!.value = transaction.credit.toString();
      editTransaction.current.get('editDebit')!.value = transaction.debit.toString();
    } else {
      alert("Transaction not found!");
    }
  }

  return (
    <div className="container">
    <h1 className="mb-4">Bank Statement Page</h1>

    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <div id="dataGrid" className="table table-striped table-bordered table-hover align-middle">
            <div className="row header-row text-white p-2 fw-bold border">
              <div className="col">Transaction ID</div>
              <div className="col">Transaction Date</div>
            <div className="col">Header</div>
              <div className="col">Credit</div>
              <div className="col">Debit</div>
              <div className="col">Action</div>
            </div>
            <div className="row table-secondary p-2 border">

              {['inputId', 'inputDate', 'inputDescription', 'inputCredit', 'inputDebit'].map((name) => (
                  <div key={name} className="col">
                    <input
                      type="text"
                      className='form-control form-control-sm'
                      ref={(el) => {
                        if (el) {
                          newTransaction.current.set(name, el);
                        } else {
                          newTransaction.current.delete(name);
                        }
                      }}
                    />
                  </div>
                ))}
              <div className="col d-flex justify-content-center"><button id="addBtn" className="btn btn-sm btn-success" onClick={handleAdd}>Add</button></div>
            </div>
            <div id="dataBody">
              {transactions.map((transaction) => (
                <div className="row table-secondary p-2 border">
                  {editingTransactionId === transaction.id ? (<>
                    {['inputId', 'inputDate', 'inputDescription', 'inputCredit', 'inputDebit'].map((name) => (
                      <div key={name} className="col">
                        <input
                          type="text"
                          className='form-control form-control-sm'
                          ref={(el) => {
                            if (el) {
                              editTransaction.current.set(name, el);
                            } else {
                              editTransaction.current.delete(name);
                            }
                          }}
                          defaultValue={(() => {
                            switch (name) {
                              case 'inputId': return transaction.id.toString();
                              case 'inputDate': return transaction.date;
                              case 'inputDescription': return transaction.header;
                              case 'inputCredit': return transaction.credit.toString();
                              case 'inputDebit': return transaction.debit.toString();
                              default: return '';
                            } 
                          })()}
                        />
                      </div>
                    ))}
                    <div className="col d-flex justify-content-center"><button id="editBtn" className="btn btn-sm btn-success" onClick={() => handleSave(transaction.id)}>Save</button></div>
                  </>) : (
                    <>
                    <div className="col">{transaction.id}</div>
                    <div className="col">{transaction.date}</div>
                    <div className="col">{transaction.header}</div>
                    <div className="col">{transaction.credit.toFixed(2)}</div>
                    <div className="col">{transaction.debit.toFixed(2)}</div>
                    <div className="col d-flex justify-content-center">
                      <button id="editBtn" className="btn btn-sm btn-success" onClick={() => handleEdit(transaction.id)}>Edit</button>
                      <button id="deleteBtn" className="btn btn-sm btn-danger" onClick={() => handleDelete(transaction.id)}>Delete</button>
                    </div>
                  </>)
                  }
                  
                </div>
              ))}
            </div>
            <div className="row footer-row text-white p-2 fw-bold border-top border">
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"><strong>Total</strong></div>
              <div className="col text-end"><strong id="footerCredit">{totalCredit.toFixed(2)}</strong></div>
              <div className="col text-end"><strong id="footerDebit">{totalDebit.toFixed(2)}</strong></div>
              <div className="col"></div>
            </div>
            <div className="row footer-row text-white p-2 fw-bold border-top border">
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"><strong>Balance</strong></div>
              <div className="col"></div>
              <div className="col text-end"><strong id="totalBalance">{balance.toFixed(2)}</strong></div>
              <div className="col"></div>
            </div>
        </div>
      </div>
    </div>


    <div id="message" className="mt-2"></div>
    </div>
  </div>
  );
};