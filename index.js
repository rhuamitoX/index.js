// npm init
// npm i express
// instalar extensão RapidAPI Client
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

app.post("/clientes", (req,res) => {
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0) {
        res.status(400).json({resposta: "Body não preenchido"})
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf8')
            res.status(201).json({resposta: "Cliente cadastrado com sucesso!"})
        } catch(error) {
            res.status(500).json({resposta: error.message})
        }
    }    
})

app.get("/clientes", (req, res)=>{
    const clientes  = JSON.parse(fs.readFileSync("bd.json" , "utf8"))
    res.status(200).json(clientes)
    
})

app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})