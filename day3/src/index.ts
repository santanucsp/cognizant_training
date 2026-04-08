import { DataItem, FormElements } from './model/txn';

const grid: HTMLElement | null = document.getElementById('dataBody');
const msg: HTMLElement | null = document.getElementById('message');
const footerCredit: HTMLElement | null = document.getElementById('footerCredit');
const footerDebit: HTMLElement | null = document.getElementById('footerDebit');
const totalBalance: HTMLElement | null = document.getElementById('totalBalance');



const form: FormElements = {
  id: document.getElementById('inputId') as HTMLInputElement,
  date: document.getElementById('inputDate') as HTMLInputElement,
  description: document.getElementById('inputDescription') as HTMLInputElement,
  credit: document.getElementById('inputCredit') as HTMLInputElement,
  debit: document.getElementById('inputDebit') as HTMLInputElement,
  addBtn: document.getElementById('addBtn') as HTMLButtonElement
};


function renderRow(item: DataItem, index: number): HTMLElement {
  const row = document.createElement('div');
  row.className = 'row p-2 border-bottom' + (index % 2 === 0 ? ' bg-light' : '');
  row.dataset.id = item.id;

  const idCol = document.createElement('div');
  idCol.className = 'col';
  idCol.textContent = item.id;

  const dateCol = document.createElement('div');
  dateCol.className = 'col';
  const date = new Date(item.date);
  const formattedDate = Number.isNaN(date.getTime()) ? item.date : `${date.getDate()}-${date.toLocaleString('en-GB', { month: 'short' })}-${date.getFullYear()}`;
  
    dateCol.textContent = formattedDate;

    const descCol = document.createElement('div');
    descCol.className = 'col';
    descCol.textContent = item.description;

    const creditCol = document.createElement('div');
    creditCol.className = 'col text-end';
    creditCol.textContent = item.type === 'credit' ? item.amount.toFixed(2) : '';

    const debitCol = document.createElement('div');
    debitCol.className = 'col text-end';
    debitCol.textContent = item.type === 'debit' ? item.amount.toFixed(2) : '';

    const actionCol = document.createElement('div');
    actionCol.className = 'col d-flex justify-content-center';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-danger';
    removeBtn.textContent = 'Remove';
    
      removeBtn.addEventListener('click', () => deleteItem(item.id));

      actionCol.appendChild(removeBtn);

      row.appendChild(idCol);
      row.appendChild(dateCol);
      row.appendChild(descCol);
      row.appendChild(creditCol);
      row.appendChild(debitCol);
      row.appendChild(actionCol);

      return row;
}

const storageKey: string= 'datagrid_crud_items';

function getData(): DataItem[] {
   return JSON.parse(localStorage.getItem(storageKey) || '[]') as DataItem[];
}

function setData(data: DataItem[]): void {
   localStorage.setItem(storageKey, JSON.stringify(data));
}

function refreshGrid(): void {
   const data= getData().slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
   let balance=0; 
   let totalCredit=0; 
   let totalDebit=0; 
   if (grid) grid.innerHTML='';

   data.forEach((item, idx) => {
       const amount=parseFloat(item.amount.toString()) ||0; 
       if (item.type==='debit') { 
           balance-=amount; 
           totalDebit+=amount; 
       } else if (item.type==='credit'){ 
           balance+=amount; 
           totalCredit+=amount; 
       }

       item.balance=balance; 
       if (grid) grid.appendChild(renderRow(item, idx)); 
   });

   if (footerCredit) footerCredit.textContent=totalCredit.toFixed(2); 
   if (footerDebit) footerDebit.textContent=totalDebit.toFixed(2); 
   if (totalBalance) totalBalance.textContent=balance.toFixed(2); 
}

function clearForm(): void {
   form.id.value=''; 
   form.date.value=''; 
   form.description.value=''; 
   form.credit.value=''; 
   form.debit.value='';  
}

function showMessage(text:string, type:string ='success'):void{
     if(msg){
         msg.textContent=text;  
         msg.className=`mt-2 text-${type}`;     
         setTimeout(() => {   
             msg!.textContent='';  
             msg!.className='mt-2';   
         },2000);   
     }
}

function addItem(): void {
     const id=form.id.value.trim()|| Date.now().toString();  
     const date=form.date.value;  
     const description=form.description.value.trim();  
     const credit=parseFloat(form.credit.value)||0;  
     const debit=parseFloat(form.debit.value)||0;

     if (!date|| !description||(credit===0&&debit===0)||(credit>0&&debit>0)) {       
         showMessage ('Date, description required. Enter amount in either Credit or Debit (not both).','danger');       
         return;      
     }

     const data=getData();     
     if(data.some(item=>item.id===id)){          
         showMessage ('Transaction ID must be unique.','danger');         
         return ;        
     }

     const amount=(credit>0? credit : debit );     
     const type=(credit>0?'credit':'debit');

     data.unshift({id,date,description,amount,type});     
     showMessage ('Transaction added.');

     setData(data);     
     refreshGrid();     
     clearForm();    
}

function deleteItem(id:string):void{    
        const data=getData().filter(x=>x.id!==id);    
        setData(data);    
        refreshGrid();    
        showMessage ('Item deleted.','warning');   
} 

form.addBtn.addEventListener ('click',addItem);

window.addEventListener ('DOMContentLoaded',()=>{   
refreshGrid();   
});