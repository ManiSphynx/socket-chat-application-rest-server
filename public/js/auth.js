const form = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth"
  : "https://fathomless-sierra-82460.herokuapp.com/api/auth";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};

  /* Reading each of the fields of the form */
  for (const element of form.elements) {
    if (element.name.length > 0) {
      formData[element.name] = element.value;
    }
  }

  fetch(`${url}/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.log(msg);
      }
      localStorage.setItem("token", token);
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };

  fetch(`${url}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
    })
    .catch(console.warn);
}

const boton = document.getElementById("google-signout");
boton.onclick = () => {
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
