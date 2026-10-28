const { Funcionario, Motorista, Carga, Entrega } = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('sincronizando tabelas')
    } catch (err) {
        console.error('erro ao sincronizar tabelas', err)
    } finally {
        conn.close()
        console.log('tabelas sincronizadas. fechando conexão com o BD!')
    }
}

syncDataBase()