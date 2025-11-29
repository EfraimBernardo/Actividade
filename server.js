const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const PORT = 10000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para enviar email
app.post("/enviar", async (req, res) => {
const { Nome, Idade, Email, Telefone, Pretende, Instituicao, Saber, Comentarios } = req.body;

// login Gmail usando APP PASSWORD
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "domingossapanda@gmail.com",
        pass: process.env.EMAIL_PASS // Use App Password
    }
});

let mailOptions = {
    from: `"Formulário" <domingossapanda@gmail.com>`,
    to: "domingossapanda@gmail.com",
    replyTo: Email,
    subject: "Nova mensagem do formulário",
    text: `Nome: ${Nome}\nIdade: ${Idade}\nEmail: ${Email}\nTelefone: ${Telefone}\nVisão: ${Pretende}\nResultados que quer obter: ${Instituicao}\nComo soube da actividade?: ${Saber}\nComentário: ${Comentarios}`
};

try {
    await transporter.sendMail(mailOptions);
    res.send("Mensagem enviada com sucesso!");
    console.log("Sucesso");
} catch (error) {
    console.log(error);
    res.send("Erro ao enviar a mensagem.");
}

});

// iniciar o servidor
app.listen(PORT, () => {
console.log(`Rodando em http://localhost:${PORT}`);
});
