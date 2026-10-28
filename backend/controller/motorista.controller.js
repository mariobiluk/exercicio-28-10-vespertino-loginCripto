const Motorista = require('../models/Motorista')
const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cnh || !valores.cpf||!valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'CPF inválido!'})
    }

    try {
        const cnhCripto = CryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = CryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })

        return res.status(201).json({ message: 'Motorista cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar Motorista', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Motorista' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado!'})
        }
        await Motorista.destroy({where:{codMotorista:id}})
        return res.status(200).json({message: 'Motorista deletado com sucesso!'})
    } catch (err) {
        console.error('Erro ao deletar Motorista', err)
        return res.status(500).json({ message: 'Erro ao deletar Motorista' })
    }
}

module.exports = { cadastrar,apagar }