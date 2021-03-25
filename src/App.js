import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    lista: [{ id: 1, name: "Foguete da Missão Apollo 11", value: 10000, imageUrl: "https://picsum.photos/200/200" },
    { id: 2, name: "Viagem a Marte", value: 100000, imageUrl: "https://picsum.photos/200/200?a=1" },
    { id: 3, name: "Anéis de Saturno", value: 200000, imageUrl: "https://picsum.photos/200/200?a=2" },
    { id: 4, name: "Viagem a Júpiter", value: 300000, imageUrl: "https://picsum.photos/200/200?a=3" }],
    inputMinimo: '',
    inputMaximo: '',
    inputNome: '',
    ordem: 'Crescente'
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
  
  adicionarCarrinho = (event)=> { 
    //event.target.id <<< Id do item clicado para / use para adicionar ao carrinho
    console.log(event.target.id)
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
              <button id={viagem.id} onClick={this.adicionarCarrinho}>Adicionar Carrinho</button>
              </div>
          })}
        </section>
      </div>
    );
  }
}

export default App;