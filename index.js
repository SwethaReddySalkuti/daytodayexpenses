window.addEventListener("DOMContentLoaded", () => {
 
  
  })
  
  
  
  
  
  async function registerUser(event){
      try
      {
      event.preventDefault();
  
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      
      const obj = {
          name,
          email,
          password
      }
      console.log(obj);
      const Response = await axios.post("http://localhost:3000/user/add-user", obj)
        if(Response)
        {
          console.log(Response);
        }
      }
        catch(err)
        {
          document.body.innerHTML = document.body.innerHTML + `<h4>Something Went Wrong</h4>`;
          console.log(err);
        }
      
      
  }

  async function checkUser(event)
  {
    try
    {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
     
        const Response = await axios.get("http://localhost:3000/user/get-users")
       
         for(var i = 0; i < Response.data.allUsers.length; i++){
           if(Response.data.allUsers[i].email === email && Response.data.allUsers[i].password === password)
           {
            console.log("Login Success Full");
           }
           else
           {
            console.log("Not Success Full");
           }
         }  
    
    }
    catch(err)
    {
      console.log(err);
    }
  }