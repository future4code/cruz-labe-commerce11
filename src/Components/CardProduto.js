import React from 'react'
import styled from 'styled-components'
import ProdutosImagens from "./ProdutosImagens";

const ProdutosContainer = styled.div``;
const ProdutosInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  & > * {
    padding: 0;
    margin: 0;
  }
`;
const Imagens = styled.div`
    display: grid;
    margin: 30px 25px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 370px 370px;
    grid-gap: 20px;
`;

export default class CardProduto extends React.Component {
  state = {
    ordenacao: 'crescente',
  }

  //--------------------------------------------funções para adicionar produto ao carrinho-------------------

  onClickProdutoCarrinho = (novoId, novoNome, novoValor) => {
    let produtoEncontrado = false;
    let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho'))
    // Atualização do Produto
    if (!produtoEncontrado) {
      const novoCarrinho = produtosCarrinho.map((produto) => {
        if (produto.id === novoId) {
          let produtoAtualizado;
          produtoAtualizado = {
            ...produto,
            quantidade: produto.quantidade + 1,
          }
          produtoEncontrado = true;
          return produtoAtualizado;
        }
        else {
          return produto;
        }
      })
      if (produtoEncontrado) {
        produtosCarrinho = novoCarrinho
      }
    }
    // Adição de um novo produto
    if (!produtoEncontrado) {
      const novoProduto = {
        id: novoId,
        nome: novoNome,
        valor: novoValor,
        quantidade: 1,
      }
      produtosCarrinho = [...produtosCarrinho, novoProduto]
    }
    localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho))
  }
  diminuirProduto = (id) => {
    let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho'))
    const carrinhoNovo = produtosCarrinho.map((produto) => {
      if (produto.id === id) {
        const novoProduto = {
          ...produto,
          quantidade: produto.quantidade - 1,
        }
        return novoProduto
      } else {
        return produto;
      }
    })
    produtosCarrinho = carrinhoNovo
    localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho))
  }
  removerProduto = (id) => {
    let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho'))
    const carrinhoNovo = produtosCarrinho.filter((produto) => {
      return !(produto.id === id);
    })
    produtosCarrinho = carrinhoNovo
    localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho))
  }
  onClickRemoverProduto = (id) => {
    let produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho'))
    let quantidade;
    produtosCarrinho.forEach((produto) => {
      if (produto.id === id) {
        quantidade = produto.quantidade;
      }
    })
    if (quantidade > 1) {
      this.diminuirProduto(id)
    }
    else {
      this.removerProduto(id)
    }
    localStorage.setItem('produtosCarrinho', JSON.stringify(produtosCarrinho))
  }

  //-------------------------------------------fim das funçõs para adicionar produto ao carrinho------------

  handleChangeSelect = (event) => {
    this.setState({ ordenacao: event.target.value })
  }
  render() {
    // Quantidade de produtos
    let quantidade = 0;
    let listaProdutos;
    // Seleção do tipo de ordenação a fazer na lista de produtos
    switch (this.state.ordenacao) {
      case 'crescente':
        listaProdutos = this.props.listaProdutos.sort((a, b) => a.valor - b.valor)
        break;
      case 'decrescente':
        listaProdutos = this.props.listaProdutos.sort((a, b) => b.valor - a.valor)
        break;
      default:
        listaProdutos = this.props.listaProdutos.sort((a, b) => a.valor - b.valor)
        break;
    }
    // Renderizando cada produto da lista de produtos para o componente 'ProdutoImagem'
    listaProdutos = listaProdutos.map((produto) => {
      quantidade++;
      return (
        <ProdutosImagens key={produto.id}
          id={produto.id}
          imagem={produto.imagem}
          nome={produto.nome}
          valor={produto.valor}
          onClickBotao={this.onClickProdutoCarrinho}
        />)
    })
    return (
      <ProdutosContainer>
        <ProdutosInfo>
          <p>Quantidade de produtos: {quantidade}</p>
          <div>
            <label>{"Ordenação"}</label>
            <select value={this.state.ordenacao} onChange={this.handleChangeSelect}>
              <option value="crescente">{"Crescente"}</option>
              <option value="decrescente">{"Decrescente"}</option>
            </select>
          </div>
        </ProdutosInfo>
        <Imagens>
          {listaProdutos}
        </Imagens>
      </ProdutosContainer>
    );
  }
}
