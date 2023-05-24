window.addEventListener("DOMContentLoaded", async () => {
    try{
    const Response = await axios.get("http://localhost:3000/expense/get-expenses")
   
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
        const response = await axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`);
         if(response){
            parentElem.removeChild(childElem);
         }
  
    }
  
    const editButton = document.createElement('input');
    editButton.type = "button";
    editButton.value = 'Edit';
    editButton.onclick = async () => 
    {
       
       const Response = await axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`)
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
      const Response= await axios.post("http://localhost:3000/expense/add-expense", obj)
        
      window.location.reload();
    }
    catch(err)
    {
      document.body.innerHTML = document.body.innerHTML + `<h4>Something Went Wrong</h4>`;
      console.log(err);
    }
      
      
  }