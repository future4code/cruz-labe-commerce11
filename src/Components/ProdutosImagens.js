import React from "react";
import styled from "styled-components";

const ContainerImagem = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    & > button {
        align-self: center;
    }
`

export default class ProdutosImagens extends React.Component {
  render() {
    return (
      <ContainerImagem>
        <img
            src={this.props.imagem}
            alt={this.props.nome}
        />
        <p>{this.props.nome}</p>
        <p>{this.props.valor}</p>
        <button onClick={() => {this.props.onClickBotao(this.props.id, this.props.nome, this.props.valor)}}>{"Adicionar ao carrinho"}</button>
      </ContainerImagem>
    );
  }
}