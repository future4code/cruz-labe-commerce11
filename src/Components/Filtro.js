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

const ProdutosContainer = styled.div``;
const ProdutosInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  & > * {
    padding: 0;
    margin: 0;
  }
`;
const ProdutosImagens = styled.div`
    display: grid;
    margin: 30px 25px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 370px 370px;
    grid-gap: 20px;
`;

export default class Filtro extends React.Component {

    state = {
        valorMinimo: 0,
        valorMaximo: 100000,
        busca: '',
    }

    componentDidUpdate() {
        console.log(this.state.busca)
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