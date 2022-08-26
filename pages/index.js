
const handelsubmit = (e) => {

  e.preventDefault()
  const userName = e.target.username.value
  const pass = e.target.password.value
  let user = {
    userName,
    pass,
  }
  // console.log(user)
  
  fetch('api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data) {
        window.localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "/game"
      } else {
        alert("wrong username or password")
      }
    }
    )


  


}

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form   onSubmit={(e) => handelsubmit(e)}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;