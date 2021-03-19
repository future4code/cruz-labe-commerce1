import React from 'react';
import './App.css';
import Carrinho from "./components/Carrinho"
import styled from 'styled-components';

const BotaoMostrarCarrinho = styled.button`
  background-color: transparent;
  position: absolute;
  bottom:0;
  right:0;
  border: none;
`

const IconeCarrinho = styled.img`
  margin: auto;
  align-self: center;
  width: 100px;
  object-fit: none;
`

class App extends React.Component {

  state = {
    lista: [{ id: 1, name: "Foguete da Missão Apollo 11", value: 10000, imageUrl: "https://picsum.photos/200/200" },
    { id: 2, name: "Viagem a Marte", value: 100000, imageUrl: "https://picsum.photos/200/200?a=1" },
    { id: 3, name: "Anéis de Saturno", value: 200000, imageUrl: "https://picsum.photos/200/200?a=2" },
    { id: 4, name: "Viagem a Júpiter", value: 300000, imageUrl: "https://picsum.photos/200/200?a=3" }],
    inputMinimo: '',
    inputMaximo: '',
    inputNome: '',
    ordem: 'Crescente',
    carrinho: [],
    carrinhoMostrar: false,
    valorMinInput: 0,
    valorMaxInput: Infinity,
    valorBuscaInput: "",
  }

  valorMinimo = event => {
    this.setState({inputMinimo: event.target.value})
  }

  valorMaximo = event => {
    this.setState({inputMaximo: event.target.value})
  }

  procurarNome = event => {
    this.setState({inputNome: event.target.value})
  }

  novaOrdem = event => {
    this.setState({ordem: event.target.value})
  }

  excluirItem = (item) => {
  const listaProdutos = this.state.carrinho.filter((p) => {
    return p.id !== item.id;
  });
  this.setState({ carrinho: listaProdutos });
};

aoClicarNoCarrinho = () => {
  this.setState({ carrinhoMostrar: !this.state.carrinhoMostrar });
};

selecionarProduto = (productId) => {
  let novoCarrinho = [...this.state.carrinho]
  const existeProduto = this.state.produtos.find((p) => {
    if (productId === p.productId) {
      return true
    }
    return false
  })
  const existeProdutoNoCarrinho = novoCarrinho.find((item) => {
    if (productId === item.productId) {
      return true
    }
    return false
  })
  if (existeProdutoNoCarrinho === undefined) {
    const novoProduto = {
      ...existeProduto,
      quantidade: 1,
      subTotal: existeProduto.preco,
    }
    novoCarrinho = [novoProduto, ...novoCarrinho];
  } else {
    novoCarrinho = novoCarrinho.map((item) => {
      if (productId === item.productId) {
        return {
          ...item,
          quantidade: item.quantidade + 1,
          subTotal: item.preco + item.subTotal,
        }
      } else {
        return item
      }
    });
  }
  this.setState({ carrinho: novoCarrinho })
}

totalCarrinho = () => {
  let total = 0
  this.state.carrinho.map((item) => {
    total += item.subTotal
  })
  return total
}
  
  render() {

    const listaFiltrada = this.state.lista.filter((item) => {
      if (this.state.inputMinimo !== '' && item.value < this.state.inputMinimo) {
        return false
      }

      if (this.state.inputMaximo !== '' && item.value > this.state.inputMaximo) {
        return false
      }
      if (this.state.inputValor !== '' && !item.name.toLowerCase().includes(this.state.inputNome.toLowerCase())) {
        return false
      }

      return true
    })

    listaFiltrada.sort(function(a, b) {return a.value - b.value})

    if (this.state.ordem === "Decrescente") {
      listaFiltrada.reverse()
    }

    return (
      <div className="App">
        <section className="filtro">
          <input type="number" placeholder="Valor Mínimo" onChange={this.valorMinimo}/><br/><br/>
          <input type="number" placeholder="Valor Máximo" onChange={this.valorMaximo}/><br/><br/>
          <input type="texto" placeholder="Procurar por Nome" onChange={this.procurarNome}/><br/><br/>
          <select onChange={this.novaOrdem}>
            <option>Crescente</option>
            <option>Decrescente</option>
          </select>
        </section>
        <section className="cards">
          {listaFiltrada.map((viagem) => {
            return <div className="card">
              <img src={viagem.imageUrl} alt="Imagem do Destino" />
              <p><b>Destino:</b> {viagem.name}</p>
              <p> <b>Valor:</b> {viagem.value}</p>
              <button id={viagem.id} onClick={this.selecionarProduto}>Adicionar Carrinho</button>
              </div>
          })}
        </section>

        {this.state.carrinhoMostrar && (
          <Carrinho
            produtos={this.state.produtos}
            carrinho={this.state.carrinho}
            excluirItem={this.excluirItem}
            exibirCarrinho={this.exibirCarrinho}
            totalCarrinho={this.totalCarrinho}
          />)
        }

        <BotaoMostrarCarrinho onClick={() => this.setState({ carrinhoMostrar: !this.state.carrinhoMostrar })}>
          <IconeCarrinho src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png" />
        </BotaoMostrarCarrinho>
      </div>
    );
  }
}

export default App;