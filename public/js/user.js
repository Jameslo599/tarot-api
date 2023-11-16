//Sign up new user
async function signUp() {
  const user = "jameslo599";
  const password = "runescape";
  try {
    const response = await fetch(`https://tarot.cyclic.app/signup/${user}`);
    const data = await response.json();
    console.log(data);
    //if user exists then return, else send req to add user
    data.length >= 1
      ? console.log("username is taken")
      : fetch(`https://tarot.cyclic.app/signup/${user}/${password}`);
  } catch (error) {
    console.log(error);
  }
}

//Delete user
async function deleteUser() {
  try {
    const response = await fetch(`http://localhost:8000/delete/jameslo599`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
