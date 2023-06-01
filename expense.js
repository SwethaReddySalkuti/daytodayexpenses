window.addEventListener("DOMContentLoaded", async () => {
    try{
      const token = localStorage.getItem('token');
    const Response = await axios.get('http://localhost:3000/expense/get-expenses',{headers : {"Authorization" : token}})
   
     for(var i = 0; i < Response.data.allExpenses.length; i++){
       showExpenseOnScreen(Response.data.allExpenses[i]);
     }  
    }
    catch(err)
    {
      console.log(err);
    }
  
  })
  
  
  function showExpenseOnScreen(obj){
    const parentElem = document.getElementById('listOfItem');
    const childElem = document.createElement('li');
   
    childElem.textContent = obj.amount + ' - ' + obj.description + ' - ' + obj.category;
    parentElem.appendChild(childElem);
  
    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = 'Delete';
    deleteButton.onclick = async () => 
    {
       console.log(obj.id);
       const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`,  { headers: {"Authorization" : token} })
         if(response){
          window.location.reload();
         }
  
    }
  
    const editButton = document.createElement('input');
    editButton.type = "button";
    editButton.value = 'Edit';
    editButton.onclick = async () => 
    {
      const token = localStorage.getItem('token');
      const Response = await axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`,  { headers: {"Authorization" : token} })
         if(Response)
         {
            parentElem.removeChild(childElem);
         }
  
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.description;
        document.getElementById('category').value = obj.category;
        
    }
  
     childElem.appendChild(deleteButton);
     childElem.appendChild(editButton);
  }
  
  
  async function registerExpense(event){
      
    try
    {
      event.preventDefault();
  
      const amount = event.target.amount.value;
      const description = event.target.description.value;
      const category = event.target.category.value; 
      const obj = {
          amount,
          description,
          category
      }
      console.log(obj);
      const token = localStorage.getItem('token');
      const Response= await axios.post('http://localhost:3000/expense/add-expense',obj, { headers: {"Authorization" : token} })

        
      window.location.reload();
    }
    catch(err)
    {
      document.body.innerHTML = document.body.innerHTML + `<h4>Something Went Wrong</h4>`;
      console.log(err);
    }
      
      
  }
  document.getElementById('rzp-button1').onclick = async function (e)
  {
    const token = localStorage.getItem(token);
    const response = await axios.get('http://localhost:3000/purchase/premiummembership',{ headers: {"Authorization" : token} })
    var options = {
      "key" : response.data.key_id, //key Id generated from dash board
      "order_id" : response.data.order_id,   // for one time payment
      "handler" : async function (response) {   // handles success payment 
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
          order_id : options.order_id,
          payment_id : response.razorpay_payment_id
        },{headers :{"Authorization" : token}})
        alert('You are a Premium User Now')
      }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
      console.log(response);
      alert('Something went wrong')
    })
  }