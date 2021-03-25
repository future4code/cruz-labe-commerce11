//COMPONENTE QUE DEFINE A ESTRUTURA DE CADA PRODUTO NO CARRINHO (QUANTIDADE, NOME...)

import React from "react";
import styled from "styled-components";

const ContainerProduto = styled.div`
    width: 320px;
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    margin: 3px 0;
    & > * {
        margin: 0;
        padding: 0;
    }
`
const Botao = styled.button`
background-color:black;
color:white;
padding: 5px;
border-radius: 10px 0;
cursor: pointer;
width: 100px;
height: 25px;
`

export default class ProdutoCarrinho extends React.Component {
  render() {
    return (
      <ContainerProduto>
        <p>{this.props.quantidade}x</p>
        <p>{this.props.nome}</p>
        <Botao onClick={this.props.remover}>{"Remover"}</Botao>
      </ContainerProduto>
    );
  }
}