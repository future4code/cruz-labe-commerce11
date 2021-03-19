//COMPONENTE COM A ESTRUTURA DO CARRINHO

import React from "react";
import styled from "styled-components";

const ContainerCarrinho = styled.div`
  width: 320px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px;
    background-color: #34495E;
    border: 1px solid black;
    border-radius: 50px 0;
    color:white;
    padding-left: 10px;
    align-items: flex-start;
    & > input {
        margin-bottom: 10px;
    }
`

const Valor = styled.h4`
margin:5px;
`

const Frete = styled.p`
margin: 5px;
`

const Botao = styled.button`
background-color:black;
color:white;
/* padding: 10px; */
border-radius: 10px 0;
cursor: pointer;
width: 50%;
height: 30px;
align-self: center;
margin: 10px;
`
//-------------------------------------------INÍCIO DA RENDERIZAÇÃO----------------------------------------

export default class Carrinho extends React.Component {
  render() {
    let frete = 0.05

    return (
      <ContainerCarrinho>
        <h3>{"Carrinho"}</h3>
        {this.props.produtosCarrinho}
        <Valor>{`Valor total: R$${this.props.valorTotal}`}</Valor>
        <Frete>Frete: {frete * 100}%</Frete>
        <Valor>{`Valor total com frete: R$${(1 + frete) * this.props.valorTotal}`}</Valor>
        <Botao onClick={this.props.limparCarrinho}>Limpar carrinho</Botao>
      </ContainerCarrinho>
    );
  }
}
