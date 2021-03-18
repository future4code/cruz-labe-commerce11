import React from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
align-items: center;
width: 15%;
height: 500px;
border: 1px black solid;
`

export default class Carrinho extends React.Component{

    
    render(){
        
        return <MainContainer>
            <h3>Carrinho</h3>
        </MainContainer>
    }
}