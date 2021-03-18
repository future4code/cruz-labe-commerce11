import React from 'react';
import styled from 'styled-components'
import CardProduto from './Components/CardProduto';
import Carrinho from './Components/Carrinho'
import Filtro from './Components/Filtro'

const MainContainer = styled.div`
display: flex;
justify-content: space-evenly;
/* align-items: center; */
`

const ContainerDeProdutos = styled.div`
display: grid;
grid-template-columns: repeat(3,1fr);
grid-template-rows: repeat(2,1fr);
width: 700px;
justify-items: center;
row-gap: 10px;
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


class App extends React.Component {

  state = {
    listaDeProdutos: [
      {
        linkImagem: 'https://static3.tcdn.com.br/img/img_prod/460977/camiseta_bohimian_sith_lords_star_wars_64063_1_20201211183644.jpg',
        nomeProduto: 'Camiseta do Star Wars',
        valor: 50
      },
      {
        linkImagem: 'https://canary.contestimg.wish.com/api/webimage/5edb6e4dd9dee31a0c6f4e1e-large.jpg?cache_buster=d6ecad41853212a5e36af1856309fbc6',
        nomeProduto: 'Mochila da NASA',
        valor: 40
      },
      {
        linkImagem: 'https://http2.mlstatic.com/D_NQ_NP_792648-MLB29046396712_122018-O.webp',
        nomeProduto: 'Réplica da Discovery',
        valor: 200
      },
      {
        linkImagem: 'https://http2.mlstatic.com/D_NQ_NP_623527-MLB44997277405_022021-O.webp',
        nomeProduto: 'Funko do Darth Vader',
        valor: 150
      },
      {
        linkImagem: 'https://http2.mlstatic.com/D_NQ_NP_843607-MLB44078933314_112020-O.jpg',
        nomeProduto: 'Luminária do Grogu',
        valor: 250
      },
      {
        linkImagem: 'https://cf.shopee.com.br/file/4694ebece76a4382b46a3bb50d7f8164',
        nomeProduto: 'Caneca do R2D2',
        valor: 75
      }
    ],
    listaDeBusca: [],
    quantidade: 0,
  }

  componentDidMount() {
    if (this.state.listaDeBusca !== this.state.listaDeProdutos) {
      this.setState({ listaDeBusca: this.state.listaDeProdutos })
    }
  }

  adicionarAoCarrinho = () => {
    console.log('deu certo')
  }

  buscar = () => {
    let fraseBuscada = JSON.parse(localStorage.getItem('fraseBuscada'))
    let valorMinimo = JSON.parse(localStorage.getItem('valorMinimo'))
    let valorMaximo = JSON.parse(localStorage.getItem('valorMaximo'))
    // console.log(fraseBuscada)
    // console.log('min:', valorMinimo)
    // console.log('max:', valorMaximo)
    let arrayIntermediaria = [...this.state.listaDeProdutos]
    let novaLista = arrayIntermediaria.filter((produto) => {
      return produto.nomeProduto.includes(fraseBuscada) && produto.valor >= valorMinimo && produto.valor <= valorMaximo
    })
    this.setState({ listaDeBusca: novaLista })
  }

  render() {
    let produtos = this.state.listaDeBusca.map((produto) => {
      return <CardProduto
        linkImagem={produto.linkImagem}
        nomeProduto={produto.nomeProduto}
        valor={produto.valor}
        adicionarAoCarrinho={this.adicionarAoCarrinho}
      />
    }
    )

    return <MainContainer>
      <Filtro
        funcaoDeBusca={this.buscar}
        buscar={this.buscar}
      />
      <ContainerDeProdutos>{produtos}</ContainerDeProdutos>
      <Carrinho />
      {/* <ProdutosContainer>
                <ProdutosInfo>
                    <p>{`Quantidade de produtos: ${this.state.quantidade}`}</p>
                    <div>
                        <label>{"Ordenação"}</label>
                        <select>
                            <option>{"Crescente"}</option>
                            <option>{"Decrescente"}</option>
                        </select>
                    </div>
                </ProdutosInfo>
                <ProdutosImagens>
                    {this.state.listaDeProdutos}
                </ProdutosImagens>
            </ProdutosContainer> */}
    </MainContainer>
  }
}

export default App;
