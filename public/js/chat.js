/* HTML references */

const txtUid = document.querySelector("#txtUid");
const txtMens = document.querySelector("#txtMens");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth"
  : "https://fathomless-sierra-82460.herokuapp.com/api/auth";

let user = null;
let socket = null;

/* validate jwt */
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
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  /* Events */
  socket.on("receive-messages", DrawMessages);
  socket.on("active-users", DrawUsers);

  socket.on("private-message", privateMessage);
};

const DrawUsers = (users) => {
  let usersHtml = "";
  users.forEach(({ nombre, uid }) => {
    usersHtml += `
      <li>
        <p>
          <h5 class="text-success">${nombre}</h5>
          <span class="fs-6 text-muted">${uid}</span> 
        </p>
      </li>
    `;
  });

  ulUsuarios.innerHTML = usersHtml;
};

const DrawMessages = (messages) => {
  let messagesHtml = "";
  messages.forEach(({ message, name }) => {
    messagesHtml += `
      <li>
        <p>
          <span class="text-primary">${name}</span>
          <span>${message}</span> 
        </p>
      </li>
    `;
  });

  ulMensajes.innerHTML = messagesHtml;
};

txtMens.addEventListener("keyup", ({ keyCode }) => {
  const message = txtMens.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }

  if (message.length === 0) {
    return;
  }

  socket.emit("send-message", { message, uid });
  txtMens.value = "";
});

const privateMessage = (pay) => {
  console.log(pay);
};

const main = async () => {
  await validateJWT();
};

main();

/* const socket = io(); */
