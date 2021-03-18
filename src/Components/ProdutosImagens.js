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
    /* height: 200px; */
`
const Imagem = styled.img`
margin: 5px;
width: 80%;
/* height: 200px; */
`

const Nome = styled.h4`
margin: 5px;
`

const Preco = styled.p`
margin: 5px;
`

const Botao = styled.button`
margin-bottom: 5px;
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
        <Preco>{this.props.valor}</Preco>
        <Botao onClick={() => {this.props.onClickBotao(this.props.id, this.props.nome, this.props.valor)}}>{"Adicionar ao carrinho"}</Botao>
      </ContainerImagem>
    );
  }
}