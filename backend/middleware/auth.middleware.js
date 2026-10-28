const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(400).json({message: 'Erro! Token não informado!'})
    }

    try{
        const bytes = CryptoJs.AES.decrypt(token,CHAVE_SECRETA).toString()
        const dadosDescriptografados = JSON.stringify(bytes,CHAVE_SECRETA)

        if(!dadosDescriptografados){
            return res.status(400).json({message: 'Token inválido, faça login novamente!'})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now()>payload.expiraEm){
            return res.status(400).json({message: 'Sessão expirada. Faça login novamente!'})
        }

        req.funcionario = payload
        next()
    }catch(err){
        return res.status(400).json({message: 'Falha na autenticação do token!'})
    }
}

module.exports = authMiddleware