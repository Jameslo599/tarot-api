//Sign up new user
document.querySelector("#signUp").addEventListener("submit", async (e) => {
  e.preventDefault();
  await signUp();
});

async function signUp() {
  try {
    const acc = {
      user: `${document.querySelector("#user").value}`.toLowerCase(),
      email: `${document.querySelector("#email").value}`.toLowerCase(),
      password: document.querySelector("#password").value,
    };
    //Check if acc already exists
    const response = await fetch(`https://tarot.cyclic.app/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const existingUser = await response.json();
    if (existingUser.length > 0)
      return document.querySelector("#invalid").classList.remove("hidden");

    //Create new account
    await fetch(`https://tarot.cyclic.app/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    document.querySelector("#invalid").classList.add("hidden");
    document.querySelector("#success").classList.remove("hidden");
    window.location.href = "https://tarot.cyclic.app/login";
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
