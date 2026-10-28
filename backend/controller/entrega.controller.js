const Entrega = require('../models/Entrega')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.cidadeDestino || !valores.statusAtual || !valores.dataHora||!valores.idCarga) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {

        await Entrega.create(valores)

        return res.status(201).json({ message: 'Entrega cadastrada com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar Entrega', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Entrega' })
    }
}

module.exports = { cadastrar }