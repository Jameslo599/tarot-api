//Sign up new user
// async function signUp() {
//   const user = "jameslo599";
//   const password = "runescape";
//   try {
//     const response = await fetch(`https://tarot.cyclic.app/signup/${user}`);
//     const data = await response.json();
//     console.log(data);
//     //if user exists then return, else send req to add user
//     data.length >= 1
//       ? console.log("username is taken")
//       : fetch(`https://tarot.cyclic.app/signup/${user}/${password}`);
//   } catch (error) {
//     console.log(error);
//   }
// }
async function signUp() {
  try {
    const acc = {
      user: "jameslo699",
      password: "runescape",
    };
    //Check if acc already exists
    if (!acc.user || !acc.password) return console.log("input empty");
    const response = await fetch(`http://localhost:8000/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const existingUser = await response.json();
    if (existingUser.length > 0) return console.log("user exists");

    //Create new account
    const creation = await fetch(`http://localhost:8000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const data = await creation.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function login() {
  try {
    const acc = {
      user: "jameslo699",
      password: "runescape",
    };
    //Check if acc exists
    if (!acc.user || !acc.password) return console.log("input empty");
    const response = await fetch(`http://localhost:8000/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const existingUser = await response.json();
    if (existingUser.length === 0) return console.log("user does not exist");

    //Login
    const creation = await fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const data = await creation.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//Get users
async function getUsers() {
  try {
    const response = await fetch(`http://localhost:8000/users`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//Delete user
async function deleteUser() {
  try {
    const response = await fetch(`https://tarot.cyclic.app/delete/jameslo599`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
