import React from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
width: 210px;
border: 1px solid black;
display: flex;
flex-direction: column;
align-items: center;
/* height: 300px; */
border-radius: 10px;
`

const Imagem = styled.img`
width: 200px;
margin-top: 5px;
`
const Produto = styled.h4`
margin: 5px;
`

const Valor = styled.p`
margin: 5px;
`
const Botao = styled.button`
margin-bottom: 5px;
`

export default class CardProduto extends React.Component{


    render(){
        
        return <MainContainer>
            <Imagem src={this.props.linkImagem} alt={this.props.nomeProduto} />
            <Produto>{this.props.nomeProduto}</Produto>
            <Valor>R$ {this.props.valor}</Valor>
            <Botao onClick={this.props.adicionarAoCarrinho}>Adicionar ao carrinho</Botao>
        </MainContainer>
    }
}