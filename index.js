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

      const response = await axios.post("http://localhost:3000/user/add-user", obj)
        if(response.status === 201)
        {
          
            window.location.href = "./login.html" // change the page on successful login
        } 
        else 
        {
            throw new Error('Failed to login')
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
      const obj = {
        email,
        password
      }
     
        const Response = await axios.post("http://localhost:3000/user/get-users",obj);
        alert(Response.data.message);
        localStorage.setItem('token',Response.data.token);
        if(Response)
        {
          document.body.innerHTML = document.body.innerHTML + `<h4>${Response.data.message}</h4>`;
          window.location.href = "./expense.html"
        }
    
    }
    catch(err)
    {
      console.log(err);
    }
  }
  function forgotpassword() {
    window.location.href = "./password.html"
}