let produtos

window.onload = function (){
    var storedUser = localStorage.getItem("usuario")
    var user = JSON.parse(storedUser)
    var dataEntrada = new Date(user.dataEntrada)

    var dataFormaatda = dataEntrada.toLocaleString("pt-BR",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour:"numeric",
        minute:"numeric"
    })

    document.getElementById('user').textContent = user.name
    document.getElementById('perfil').textContent = dataFormaatda
    document.getElementById('idPerfil').textContent = user.id
}

document.addEventListener("DOMContentLoaded", function(){
    fetch("../dados/data.json")
    .then((response) => response.json())
    .then((data) => {
        produtos = data

        const produtosContainer = document.getElementById("produtos-coteiner")

        produtos.forEach((produto, index) => {
            const card = document.createElement("div");
            card.innerHTML = `<div class="card" style="width: 18rem; margin-bottom: 1rem;">
                                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                                    <div class="card-body">
                                        <h5 class="card-title">${produto.nome}</h5>
                                        <p class="card-text">Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                                        <button type="button" class="btn btn-primary adicionar" data-indice="${index}">Adicionar ao carrinho</button>
                                    </div>
                                </div>`
            produtosContainer.appendChild(card)
        })
    }).catch((error)=> console.log("Erro ao carregar dados", error)) 

    document.getElementById("produtos-coteiner").addEventListener("click", function(event){
        const btn = event.target.closest(".adicionar")
        if(!btn) return

        const indexDoProduto = btn.dataset.indice
        const produtoSelecionado = produtos[indexDoProduto]
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
        carrinho.push(produtoSelecionado)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        alert("Produto adicionado com sucesso!!!")
    })
})

   