//Open form for quick password recovery
document.querySelector("#recovery").addEventListener("click", () => {
  const email = prompt("Enter your email");
  if (!email) return alert("You did not enter an email");
  forgotPass(email);
});

//Search for account with email
async function forgotPass(email) {
  try {
    const req = await fetch(`https://tarot.cyclic.app/forgot/${email}`);
    const data = await req.json();
    return data.length
      ? alert(`Your password is "${data}"`)
      : alert("Invalid email");
  } catch (error) {
    console.log(error);
  }
}

//Login user
document.querySelector("#signIn").addEventListener("submit", async (e) => {
  e.preventDefault();
  await login();
});

async function login() {
  try {
    const acc = {
      user: `${document.querySelector("#user").value}`.toLowerCase(),
      password: document.querySelector("#password").value,
    };
    //Check if acc exists
    const response = await fetch(`https://tarot.cyclic.app/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const existingUser = await response.json();
    if (existingUser.length === 0)
      return document.querySelector("#invalid").classList.remove("hidden");

    //Login
    const creation = await fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });
    const data = await creation.json();
    //If password is wrong
    if (data === false)
      return document.querySelector("#invalid").classList.remove("hidden");
    document.querySelector("#invalid").classList.add("hidden");
    document.querySelector("#success").classList.remove("hidden");
    //window.location.href = "https://tarot.cyclic.app/";
  } catch (error) {
    console.log(error);
  }
}
