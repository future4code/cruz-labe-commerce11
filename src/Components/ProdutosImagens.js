//COMPONENTE COM A ESTRUTURA DO CARD DE PRODUTOS

import React from "react";
import styled from "styled-components";

const ContainerImagem = styled.div`
     display: flex;
    flex-direction: column;
    border: 1px solid black;
    & > button {
        align-self: center;
    }
    align-items: center;
    justify-content: space-evenly;
    background-color: #34495E;
    border: 1px solid black;
    border-radius: 50px 0;
    color:white;
`
const Imagem = styled.img`
margin: 5px;
width: 80%;
border: 2px solid black;
border-radius: 10px;
`

const Nome = styled.h4`
margin: 5px;
`

const Preco = styled.p`
margin: 5px;
`

const Botao = styled.button`
margin-bottom: 5px;
background-color:black;
color:white;
padding: 5px;
border-radius: 10px 0;
cursor: pointer;
`

export default class ProdutosImagens extends React.Component {
  render() {
    return (
      <ContainerImagem>
        <Imagem
          src={this.props.imagem}
          alt={this.props.nome}
        />
        <Nome>{this.props.nome}</Nome>
        <Preco>R$ {this.props.valor},00</Preco>
        <Botao onClick={() => { this.props.onClickBotao(this.props.id, this.props.nome, this.props.valor) }}>{"Adicionar ao carrinho"}</Botao>
      </ContainerImagem>
    );
  }
}