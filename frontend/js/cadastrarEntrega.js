const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    const cidadeDestino = document.getElementById('cidadeDestino').value 
    const statusAtual = document.getElementById('statusAtual').value 
    const dataHora = document.getElementById('dataHora').value 
    const idCarga = document.getElementById('idCarga').value 

    const valores = {
        cidadeDestino:cidadeDestino,
        statusAtual:statusAtual,
        dataHora:dataHora,
        idCarga:idCarga,
    }

    fetch('http://localhost:3000/entrega',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        resposta.innerHTML=''
        resposta.innerHTML+=`Erro de comunicação com o servidor`
        console.error('Erro no cadastro da entrega',err)
    })
})