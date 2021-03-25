//PÁGINA PRINCIPAL

import React from 'react'
import styled from 'styled-components'
import CardProduto from "./Components/CardProduto";
import Carrinho from "./Components/Carrinho";
import ProdutoCarrinho from './Components/ProdutoCarrinho'
import nebulosa from './imagens-e-videos/nebulosa.jpg'

const MainContainer = styled.div`
  background-image: url(${nebulosa});
  display: flex;
  flex-direction:column;
  padding: 20px;
`;

const Conteudo = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 10px;  
`

const Header = styled.header`
text-align: center;
height: 100px;
width:100%;
font-family:'Engravers MT';
color:white;
font-size:20px;
`

const FiltroContainer = styled.div`
    width:250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #34495E;
    border: 1px solid black;
    border-radius: 50px 0;
    color:white;
    padding-left: 10px;
    align-items: flex-start;
    & > input {
        margin-bottom: 10px;
    }
`

const CampoDeFiltro = styled.input`
background-color: black;
color:white;
border-radius: 10px 0;
align-self: center;
`

const DescricaoFiltro = styled.label`

`

export default class App extends React.Component {
  state = {
    produtos: [
      {
        id: 1,
        nome: "Camiseta Sith",
        valor: 50.0,
        imagem: 'https://static3.tcdn.com.br/img/img_prod/460977/camiseta_bohimian_sith_lords_star_wars_64063_1_20201211183644.jpg',
      },
      {
        id: 2,
        nome: "Mochila da NASA",
        valor: 40.0,
        imagem: 'https://canary.contestimg.wish.com/api/webimage/5edb6e4dd9dee31a0c6f4e1e-large.jpg?cache_buster=d6ecad41853212a5e36af1856309fbc6'
      },
      {
        id: 3,
        nome: "Réplica da Discovery",
        valor: 200.0,
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_792648-MLB29046396712_122018-O.webp',
      },
      {
        id: 4,
        nome: "Funko do Darth Vader",
        valor: 250.0,
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_623527-MLB44997277405_022021-O.webp',
      },
      {
        id: 5,
        nome: "Luminária do Grogu",
        valor: 250.0,
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_843607-MLB44078933314_112020-O.jpg',
      },
      {
        id: 6,
        nome: "Caneca do R2D2",
        valor: 75.0,
        imagem: 'https://cf.shopee.com.br/file/4694ebece76a4382b46a3bb50d7f8164',
      },
    ],
    valorMinimo: '',
    valorMaximo: '',
    nomeProduto: "",
    produtosCarrinho: [],
  }

  //DESAFIO 1: as duas funções de ciclos de vida a seguir foram adicionadas para persistir os itens adicionados ao carrinho mesmo após a atualização da página:
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('carrinhoSalvo'))) {
      this.setState({ produtosCarrinho: JSON.parse(localStorage.getItem('carrinhoSalvo')) })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('carrinhoSalvo', JSON.stringify(this.state.produtosCarrinho))
  }

  //As três funções a seguir fora adicionadas devido ao input controlado:
  onChangeProduto = (event) => {
    this.setState({ nomeProduto: event.target.value });
  };
  onChangeValorMinimo = (event) => {
    this.setState({ valorMinimo: event.target.value });
  };
  onChangeValorMaximo = (event) => {
    this.setState({ valorMaximo: event.target.value });
  };

  //Função para adicionar um novo produto ao carrinho:
  onClickProdutoCarrinho = (novoId, novoNome, novoValor) => {
    let produtoEncontrado = false;
    // Atualização do Produto
    if (!produtoEncontrado) {
      const novoCarrinho = this.state.produtosCarrinho.map((produto) => {
        if (produto.id === novoId) {
          let produtoAtualizado;
          produtoAtualizado = {
            ...produto,
            quantidade: produto.quantidade + 1,
          }
          produtoEncontrado = true;
          return produtoAtualizado;
        }
        else {
          return produto;
        }
      })
      if (produtoEncontrado) {
        this.setState({ produtosCarrinho: novoCarrinho })
      }
    }
    // Adição de um novo produto
    if (!produtoEncontrado) {
      const novoProduto = {
        id: novoId,
        nome: novoNome,
        valor: novoValor,
        quantidade: 1,
      }
      this.setState({ produtosCarrinho: [...this.state.produtosCarrinho, novoProduto] })
    }
  }

  //Função para remover um itens do carrinho, um de cada vez:
  removerProduto = (produto) => {
    if (produto.quantidade > 1) {
      const carrinhoNovo = [...this.state.produtosCarrinho]
      carrinhoNovo.forEach((item) => {
        if (item.nome === produto.nome) {
          produto.quantidade -= 1
        }
      })
      this.setState({ produtosCarrinho: carrinhoNovo });
    } else {
      const carrinhoNovo = this.state.produtosCarrinho.filter((item) => {
        return !(item.nome === produto.nome);
      })
      this.setState({ produtosCarrinho: carrinhoNovo });
    }
  }

  //Função para limpar todos os itens do carrinho:
  limparCarrinho = () => {
    let novoCarrinho = [...this.state.produtosCarrinho]
    novoCarrinho = []
    this.setState({ produtosCarrinho: novoCarrinho })
  }

  //---------------------------------------------INÍCIO DA RENDERIZAÇÃO----------------------------------

  render() {
    // Filtro dos valores minimo, máximo e do nome
    let listaFiltrada = this.state.produtos.filter((produtos) => {
      if (this.state.valorMinimo === '' || this.state.valorMaximo === '') {
        if (produtos.nome.includes(this.state.nomeProduto)) {
          return true;
        } else { return false }
      } else {
        if (produtos.valor >= this.state.valorMinimo && produtos.valor <= this.state.valorMaximo) {
          if (produtos.nome.includes(this.state.nomeProduto)) {
            return true;
          }
        }
        return false
      }
    })
    let valorTotal = 0;

    //A variável a seguir definirá a lista de produtos que será exibida no carrinho:
    let listaDeProdutosNoCarrinho = this.state.produtosCarrinho.map((produto) => {
      valorTotal += (produto.quantidade * produto.valor);
      return (
        <ProdutoCarrinho
          id={produto.id}
          quantidade={produto.quantidade}
          nome={produto.nome}
          remover={() => this.removerProduto(produto)}
        />
      )
    })

    //-------------------------------------------INÍCIO DO JSX----------------------------------------

    return (
      <div className="App">
        <MainContainer>
          <Header>
            <h1>Labecommerce Space</h1>
          </Header>
          <Conteudo>
            <FiltroContainer>
              <h3>{"Filtros"}</h3>
              <label>{"Valor minimo:"}</label>
              <CampoDeFiltro
                type="number"
                value={this.state.valorMinimo}
                onChange={this.onChangeValorMinimo}
              />
              <label>{"Valor maximo:"}</label>
              <CampoDeFiltro
                type="number"
                value={this.state.valorMaximo}
                onChange={this.onChangeValorMaximo}
              />
              <label>{"Busca por nome:"}</label>
              <CampoDeFiltro
                type="text"
                value={this.state.nomeProduto}
                onChange={this.onChangeProduto}
              />
            </FiltroContainer>
            <CardProduto
              listaProdutos={listaFiltrada}
              onClickBotao={this.onClickProdutoCarrinho}
            />
            <Carrinho
              produtosCarrinho={listaDeProdutosNoCarrinho}
              valorTotal={valorTotal}
              remover={this.onClickRemoverProduto}
              limparCarrinho={this.limparCarrinho}
            />
          </Conteudo>
        </MainContainer>
      </div>
    );
  }
}