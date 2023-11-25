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
  } catch (error) {
    console.log(error);
  }
}
