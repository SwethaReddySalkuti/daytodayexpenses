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