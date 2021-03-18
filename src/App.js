import React from 'react'
import styled from 'styled-components'
import CardProduto from "./Components/CardProduto";
import Carrinho from "./Components/Carrinho";
const MainContainer = styled.div`
  height: 480px;
  //background: #fff;
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 10px;
  & > div {
    border: 1px solid black;
  }
`;
const FiltroContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    align-items: flex-start;
    & > input {
        margin-bottom: 10px;
    }
`
export default class App extends React.Component {
  state = {
      produtos: [
      {
          id: 1,
          nome: "Camiseta1",
          valor: 50.0,
          imagem: 'https://static3.tcdn.com.br/img/img_prod/460977/camiseta_bohimian_sith_lords_star_wars_64063_1_20201211183644.jpg',
      },
      {
          id: 2,
          nome: "Mochila2",
          valor: 40.0,
          imagem: 'https://canary.contestimg.wish.com/api/webimage/5edb6e4dd9dee31a0c6f4e1e-large.jpg?cache_buster=d6ecad41853212a5e36af1856309fbc6'
      },
      {
          id: 3,
          nome: "Discovery3",
          valor: 200.0,
          imagem: 'https://http2.mlstatic.com/D_NQ_NP_792648-MLB29046396712_122018-O.webp',
      },
      {
          id: 4,
          nome: "Funko4",
          valor: 250.0,
          imagem: 'https://http2.mlstatic.com/D_NQ_NP_623527-MLB44997277405_022021-O.webp',
      },
      {
          id: 5,
          nome: "Grogu5",
          valor: 250.0,
          imagem: 'https://http2.mlstatic.com/D_NQ_NP_843607-MLB44078933314_112020-O.jpg',
      },
      {
           id: 6,
          nome: "Caneca6",
          valor: 75.0,
          imagem: 'https://cf.shopee.com.br/file/4694ebece76a4382b46a3bb50d7f8164',
          },
],
    valorMinimo: 0,
    valorMaximo: 100000,
    nomeProduto: "",
    produtosCarrinho: [],
}
  onChangeProduto = (event) => {
    this.setState({ nomeProduto: event.target.value });
  };
  onChangeValorMinimo = (event) => {
    this.setState({ valorMinimo: event.target.value });
  };
  onChangeValorMaximo = (event) => {
    this.setState({ valorMaximo: event.target.value });
  };
  onClickProdutoCarrinho = (novoId, novoNome, novoValor) => {
    let produtoEncontrado = false;
    // Atualização do Produto
    if(!produtoEncontrado) {
      const novoCarrinho = this.state.produtosCarrinho.map((produto) => {
        if(produto.id === novoId) {
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
      if(produtoEncontrado) {
        this.setState({produtosCarrinho: novoCarrinho})
      }
    }
    // Adição de um novo produto
    if(!produtoEncontrado) {
      const novoProduto = {
        id: novoId,
        nome: novoNome,
        valor: novoValor,
        quantidade: 1,
      }
      this.setState({produtosCarrinho: [...this.state.produtosCarrinho, novoProduto]})
    }
  }
  diminuirProduto = (id) => {
    const carrinhoNovo = this.state.produtosCarrinho.map((produto) => {
      if(produto.id === id) {
        const novoProduto = {
          ...produto,
          quantidade: produto.quantidade - 1,
        }
        return novoProduto
      } else {
        return produto;
      }
    })
    this.setState({produtosCarrinho: carrinhoNovo})
  }
  removerProduto = (id) => {
    const carrinhoNovo = this.state.produtosCarrinho.filter((produto) => {
      return !(produto.id === id);
    })  
    this.setState({produtosCarrinho: carrinhoNovo});
  }
  onClickRemoverProduto = (id) => {
    let quantidade;
    this.state.produtosCarrinho.forEach((produto) => {
      if(produto.id === id) {
        quantidade = produto.quantidade;
      }
    })
    if(quantidade > 1) {
      this.diminuirProduto(id)
    }
    else {
      this.removerProduto(id)
    }
  }
  render() {
    // Filtro dos valores minimo, máximo e do nome
    let listaFiltrada = this.state.produtos.filter((produtos) => {
      if(this.state.valorMinimo==='' || this.state.valorMaximo===''){
        if(produtos.nome.includes(this.state.nomeProduto)) {
          return true;
        } else {return false}
      } else{
        if(produtos.valor >= this.state.valorMinimo && produtos.valor <= this.state.valorMaximo) {
          if(produtos.nome.includes(this.state.nomeProduto)) {
            return true;
          }
        }
        return false
      }
    })
    return (
      <div className="App">
        <MainContainer>
          <FiltroContainer>
            <h3>{"Filtros"}</h3>
            <label>{"Valor minimo:"}</label>
            <input
              type="number"
              value={this.state.valorMinimo}
              onChange={this.onChangeValorMinimo}
            />
            <label>{"Valor maximo:"}</label>
            <input
              type="number"
              value={this.state.valorMaximo}
              onChange={this.onChangeValorMaximo}
            />
            <label>{"Busca por nome:"}</label>
            <input
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
            produtosCarrinho={this.state.produtosCarrinho}
            remover={this.onClickRemoverProduto}
          />
          {console.log(this.state.produtosCarrinho)}
          {localStorage.setItem('produtosCarrinho', JSON.stringify(this.state.produtosCarrinho))}
        </MainContainer>
      </div>
    );
  }
}