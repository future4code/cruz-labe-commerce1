import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    lista: [{ id: 1, name: "Foguete da Missão Apollo 11", value: 10000, imageUrl: "https://picsum.photos/200/200" },
    { id: 2, name: "Viagem a Marte", value: 100000, imageUrl: "https://picsum.photos/200/200?a=1" },
    { id: 3, name: "Anéis de Saturno", value: 200000, imageUrl: "https://picsum.photos/200/200?a=2" },
    { id: 4, name: "Viagem a Júpiter", value: 300000, imageUrl: "https://picsum.photos/200/200?a=3" },
    ]
  }

  adicionarCarrinho = (event)=> { 
    //event.target.id <<< Id do item clicado para / use para adicionar ao carrinho
    console.log(event.target.id)
  }
  
  render() {

    return (
      <div className="App">
        {this.state.lista.map((viagem) => {
          return <div className="card">
            <img src={viagem.imageUrl} alt="Imagem do Destino" />
            <p><b>Destino:</b> {viagem.name}</p>
            <p> <b>Valor:</b> {viagem.value}</p>
            <button id={viagem.id} onClick={this.adicionarCarrinho}>Adicionar Carrinho</button>
            </div>
        })}
      </div>
    );
  }
}

export default App;