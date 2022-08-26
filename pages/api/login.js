export default function handler(req, res) {
  let users = []
  console.log(req.body)
  if (req.body.userName && req.body.pass) {
    users.push({
      userName: req.body.userName,
      pass: req.body.pass,
    })
    // window.localStorage.setItem("users", JSON.stringify(users))
     
  } else {
    res.status(400).send("Missing username or password")
  }
  res.status(200).send(users)
}
//
 

