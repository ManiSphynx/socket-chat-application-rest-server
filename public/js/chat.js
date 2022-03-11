const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth"
  : "https://fathomless-sierra-82460.herokuapp.com/api/auth";

/* validate jwt */
let user = null;
let socket = null;

const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location.href = "index.html";
    throw new Error("Invalid token");
  }

  const response = await fetch(url, {
    headers: { "x-token": token },
  });

  const { user: userDB } = await response.json();

  localStorage.setItem("token", userDB.token);
  user = userDB;
  document.title = userDB.usuario.nombre;

  connectSocket();
};

const connectSocket = () => {
  const socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });
};

const main = async () => {
  await validateJWT();
};

main();

/* const socket = io(); */
