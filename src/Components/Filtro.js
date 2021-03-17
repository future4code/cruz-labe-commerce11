import React from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
align-items: center;
width: 15%;
height: 300px;
border: 1px black solid;
`

const CamposDeFiltro = styled.div`
margin: 10px;
`

export default class Filtro extends React.Component {
    
    state = {
        valorMinimo: 0,
        valorMaximo: 100000,
        busca: '',
    }

    componentDidUpdate(){
        localStorage.setItem('fraseBuscada', JSON.stringify(this.state.busca))
        localStorage.setItem('valorMinimo', JSON.stringify(this.state.valorMinimo))
        localStorage.setItem('valorMaximo', JSON.stringify(this.state.valorMaximo))
    }

    onChangeValorMinimo = (event) => {
        this.setState({ valorMinimo: event.target.value })
    }

    onChangeValorMaximo = (event) => {
        this.setState({ valorMaximo: event.target.value })
    }

    onChangeBusca = (event) => {
        this.setState({ busca: event.target.value })
        // this.props.funcaoDeBusca
    }

    render() {


        return <MainContainer>
            <h3>Filtro</h3>
            <CamposDeFiltro>
                <label for="valor-minimo">Valor mínimo:</label>
                <input id="valor-minimo" type="number" value={this.state.valorMinimo} onKeyDown={this.props.buscar} onChange={this.onChangeValorMinimo} />
            </CamposDeFiltro>

            <CamposDeFiltro>
                <label for="valor-maximo">Valor máximo:</label>
                <input id="valor-maximo" type="number" value={this.state.valorMaximo} onKeyDown={this.props.buscar} onChange={this.onChangeValorMaximo} />
            </CamposDeFiltro>
            <CamposDeFiltro>
                <label for="busca">Busca:</label>
                <input id="busca" type="text" value={this.state.busca} onKeyDown={this.props.buscar} onChange={this.onChangeBusca} />
            </CamposDeFiltro>
        </MainContainer>

    }
}