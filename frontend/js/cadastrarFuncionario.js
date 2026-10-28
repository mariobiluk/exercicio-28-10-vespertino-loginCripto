const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value 
    const email = document.getElementById('email').value 
    const senha = document.getElementById('senha').value 

    const valores = {
        nome:nome,
        email:email,
        senha:senha
    }

    fetch('http://localhost:3000/funcionario',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
        console.error('Erro no cadastro do funcionario',err)
    })
})