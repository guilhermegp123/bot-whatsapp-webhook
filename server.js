// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Render usa a variável de ambiente PORT

app.use(express.json());

const TOKEN_VERIFICACAO = "quero-criar-meu-bot"; // <-- SUA SENHA SECRETA

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === TOKEN_VERIFICACAO) {
      console.log("✅ WEBHOOK VERIFICADO");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log(JSON.stringify(body, null, 2));

  if (body.object) {
      // Lógica para processar a mensagem vem aqui
      res.sendStatus(200);
  } else {
      res.sendStatus(404);
  }
});

app.get("/", (req, res) => {
    res.send("Webhook do Bot está no ar!");
});


app.listen(port, () => {
  console.log("Seu app está ouvindo na porta " + port);
});
