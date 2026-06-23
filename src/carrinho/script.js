$(document).ready(function() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    const listElement = $('#lista')
    const totalElement = $("#total")

    function exibirCarrinho(){
        listElement.empty()
        let totalPreco = 0

        if (carrinho.length === 0) {
            listElement.append('<p>Seu carrinho está vazio.</p>')
            totalElement.text('Total: R$ 0,00')
            return
        }

        $.each(carrinho, function(index, item){
            totalPreco += item.preco || 0
            const listItem = $("<div class='cart-item mb-2'>")
            listItem.append($(`<strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2).replace('.', ',')}`))

            const removeButton = $("<button class='btn btn-sm btn-danger ms-2'>❌</button>")
                .click(function(){
                    removerItem(index)
                })

            listItem.append(removeButton)
            listElement.append(listItem)
        })

        totalElement.text(`Total: R$ ${totalPreco.toFixed(2).replace('.', ',')}`)
    }

    function removerItem(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
})