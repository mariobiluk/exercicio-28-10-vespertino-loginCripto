const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value 
    const cnh = document.getElementById('cnh').value 
    const cpf = document.getElementById('cpf').value 
    const telefone = document.getElementById('telefone').value 

    const valores = {
        nome:nome,
        cnh:cnh,
        cpf:cpf,
        telefone:telefone,
    }

    fetch('http://localhost:3000/motorista',{
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
        console.error('Erro no cadastro do motorista',err)
    })
})