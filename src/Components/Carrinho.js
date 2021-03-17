import React from 'react'
import styled from 'styled-components'

export default class Carrinho extends React.Component{

    state = {
        produtos: ['produto 1', 'produto 2'],
    }

    render(){
        const produtosNoCarrinho = this.state.produtos.map((produto)=>{
            return <p>produto</p>
        })
        return <div>
            <h3>Carrinho</h3>
            <div>{produtosNoCarrinho}</div>
        </div>
    }
}