//Open form for quick password recovery
document.querySelector("#recovery").addEventListener("click", () => {
  const email = prompt("Enter your email");
  if (!email) alert("You did not enter an email");
  forgotPass(email);
});

//Search for account with email
async function forgotPass(email) {
  const acc = {
    email: email,
  };
  try {
    const req = await fetch(`https://tarot.cyclic.app/forgot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
    });

    const data = await req.json();
  } catch (error) {
    console.log(error);
  }
}
