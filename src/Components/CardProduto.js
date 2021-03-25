//COMPONENTE PAI DOS CARDS DE PRODUTOS

import React from 'react'
import styled from 'styled-components'
import ProdutosImagens from "./ProdutosImagens";

const ProdutosContainer = styled.div`
    color:white;
    padding: 10px;
`;

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

const LabelOrdenacao = styled.label`
margin: 5px;
`

const Ordenacao = styled.select`
background-color:black;
color:white;
padding: 5px;
border-radius: 10px 0;
`

export default class CardProduto extends React.Component {
  state = {
    ordenacao: 'crescente',
  }

  //Função para ordenar os produtos exibidos em ordem crescente ou decrescente de preço:
  handleChangeSelect = (event) => {
    this.setState({ ordenacao: event.target.value })
  }

  //---------------------------------------------INÍCIO DA RENDERIZAÇÃO----------------------------------

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
          onClickBotao={this.props.onClickBotao}
        />)
    })

    //-------------------------------------------INÍCIO DO JSX----------------------------------------

    return (
      <ProdutosContainer>
        <ProdutosInfo>
          <p>Quantidade de produtos: {quantidade}</p>
          <div>
            <LabelOrdenacao>Ordem de preços:</LabelOrdenacao>
            <Ordenacao value={this.state.ordenacao} onChange={this.handleChangeSelect}>
              <option value="crescente">{"Crescente"}</option>
              <option value="decrescente">{"Decrescente"}</option>
            </Ordenacao>
          </div>
        </ProdutosInfo>
        <Imagens>
          {listaProdutos}
        </Imagens>
      </ProdutosContainer>
    );
  }
}
