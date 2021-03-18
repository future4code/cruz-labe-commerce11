import React from "react";
import styled from "styled-components";

const ImagemContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid bluebird;
    & > button {
        align-self: center;
    }
`


export default class ProdutosImagens extends React.Component {
  render() {
    return (
      <ImagemContainer>
        <img 
            src={this.props.imagem}
        />
        <p>{this.props.nome}</p>
        <p>{this.props.valor}</p>
        <button>{"Adicionar ao carrinho"}</button>
      </ImagemContainer>
    );
  }
}