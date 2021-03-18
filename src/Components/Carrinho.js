import React from "react";
import styled from "styled-components";
import ProdutoCarrinho from './ProdutoCarrinho'

const Carrinho = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px;
`

export default class Carrinho extends React.Component {
  render() {
    return (
      <Carrinho>
        <h3>{"Carrinho"}</h3>
        <ProdutoCarrinho
            quantidade="2"
            nome="Grogu4"
        />
        <ProdutoCarrinho
            quantidade="2"
            nome="Grogu4"
        />

        <p>{"Valor total: R$500,00"}</p>
      </Carrinho>
    );
  }
}
