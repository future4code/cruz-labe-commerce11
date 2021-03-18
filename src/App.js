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

& > div {
    border: 1px solid gray;
  }

`;

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

/*const FiltroContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    align-items: flex-start;
    & > input {
        margin-bottom: 10px;
    }
` */

state = {
  listaDeProdutos: [
    {
      linkimagem: 'https://static3.tcdn.com.br/img/img_prod/460977/camiseta_bohimian_sith_lords_star_wars_64063_1_20201211183644.jpg',
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
    
  valorMinimo: 0,
  valorMaximo: 1000,
  nomeProduto: "",
  produtosCarrinho: [],
  };

/*****A PARTIR DAQUI COLOQUEI ABAIXO UMA OPÇÃO QUE PENSEI CASO HAJA ALTERAÇÃO DO APP*/

export default class CardProduto extends React.Component{


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

    /*render() {
    let listaFiltrada = this.state.produtos.filter((produtos) => {
      if(produtos.valor >= this.state.valorMinimo && produtos.valor <= this.state.valorMaximo) {
        if(produtos.nome.includes(this.state.nomeProduto)) {
          return true;
        }
      }
    })*/

    return <MainContainer>
      <Filtro
        funcaoDeBusca={this.buscar}
        buscar = () => {
          let fraseBuscada = JSON.parse(localStorage.getItem('fraseBuscada'))
          let valorMinimo = JSON.parse(localStorage.getItem('valorMinimo'))
          let valorMaximo = JSON.parse(localStorage.getItem('valorMaximo'))
          // console.log(fraseBuscada)
          // console.log('min:', valorMinimo)
          // console.log('max:', valorMaximo)
          let arrayIntermediaria = [...this.state.listaDeProdutos]
          let novaLista = arrayIntermediaria.filter((produto) => {
            if (valorMinimo === '' || valorMaximo === '') {
              return produto.nomeProduto.includes(fraseBuscada)
            } else {
              return produto.nomeProduto.includes(fraseBuscada) && produto.valor >= valorMinimo && produto.valor <= valorMaximo
            }
          })
          this.setState({ listaDeBusca: novaLista })
        }
      />
      <ContainerDeProdutos>{produtos}</ContainerDeProdutos>
      <Carrinho></Carrinho>
    </MainContainer>
  }
}

export default App;








/*onChangeProduto = (event) => {
    this.setState({ nomeProduto: event.target.value });
  };

  onChangeValorMinimo = (event) => {
    this.setState({ valorMinimo: event.target.value });
  };

  onChangeValorMaximo = (event) => {
    this.setState({ valorMaximo: event.target.value });
  };

  onClickProdutoCarrinho = (novoId, novoNome, novoValor) => {
    let encontrado = false;

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
      if(produtos.valor >= this.state.valorMinimo && produtos.valor <= this.state.valorMaximo) {
        if(produtos.nome.includes(this.state.nomeProduto)) {
          return true;
        }
      }
      return false
    })

    return (
      <div className="App">
        <Container>
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
          <Produtos 
            listaProdutos={listaFiltrada}
            onClickBotao={this.onClickProdutoCarrinho} 
          />

          <Carrinho 
            produtosCarrinho={this.state.produtosCarrinho}
            remover={this.onClickRemoverProduto}
          />

        </Container>
      </div>
    );
  }
}
*/