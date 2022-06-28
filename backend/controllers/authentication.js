const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
//the guide says to use jwt, instead use json-web-token :npm install json-web-token
const jwt = require("json-web-token");

const { User } = db;

router.post("/", async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email },
  });
  //did not get 404 but got message with incorrect credentials
  if (
    !user ||
    !(await bcrypt.compare(req.body.password, user.passwordDigest))
  ) {
    res.status(404).json({
      message: `Could not find a user with the provided username and password`,
    });
  } else {
    //this is keeping me signed in
    const result = await jwt.encode(process.env.JWT_SECRET, {
      id: user.userId,
    });
    //this is where you have acces to logged in user
    res.json({ user: user, token: result.value });
  }
});

  
router.get('/profile', async (req, res) => {
  res.json(req.currentUser)
})


// //here is where that fetch request is responding in Curretuser.js
// router.get("/profile", async (req, res) => {
//   try {
//     // Split the authorization header into [ "Bearer", "TOKEN" ]:
//     // extract the JWT from the request headers and decode it to get the ID of the logged-in user
//     const [authenticationMethod, token] = req.headers.authorization.split(" ");

//     // Only handle "Bearer" authorization for now
//     //  (we could add other authorization strategies later):
//     if (authenticationMethod == "Bearer") {
//       // Decode the JWT
//       const result = await jwt.decode(process.env.JWT_SECRET, token);

//       // Get the logged in user's id from the payload
//       const { id } = result.value;

//       // Find the user object using their id:
//       let user = await User.findOne({
//         where: {
//           userId: id,
//         },
//       });
//       res.json(user);
//     }
//   } catch {
//     res.json(null);
//   }
// });

module.exports = router;
