import React, { Component } from 'react';
import Buscador from './Componentes/Buscador';
import Resultado from './Componentes/Resultado';
import './App.css';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando : false,
    totalPaginas: '' 
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=11324877-9bf2fb9deb0cb35bcf907a3fd&q=${termino}&per_page=20&page=${pagina}`;
    
    console.log(url);

    await fetch(url)
    .then(respuesta => {
      this.setState({
        cargando : true
      });
        return respuesta.json()
    } )
    .then(resultado => {
      const totalPaginacion =  Math.ceil(resultado.totalHits / 20)
      
      setTimeout(() => {
          this.setState({
            imagenes: resultado.hits,
            cargando : false,
            totalPaginas : totalPaginacion

          })
        }, 1000); 
      })
  }


  datosBusqueda= (termino) => {
   //agregamos al state
   this.setState({
    termino: termino,
    pagina : 1
   }, () => {
     this.consultarAPI();
     
   })
  }

  //metodos para paginas
  paginaAnterior = () => {
    //leemos el state
    let pagina = this.state.pagina;
    //si la pagina es menor no avana hacia atras
    if(pagina === 1) return null;
    //restar a la pagianactual
    pagina -= 1;
    //agregar al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    })
    
  }
  paginaSigiente = () => {
    //leemos el state y evitamos que al llegar al fnal desaparzca el siguiente
    let {pagina} = this.state;
    const {totalPaginas} = this.state;

    if(pagina === totalPaginas) return null;
    //suma a la pagianactual
    pagina++;
    //agregar al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    })
    
  }

  //scroll
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }


  render() {

    //metodo para animacion cargando
    const cargando = this.state.cargando;
    let resultado;

    if(cargando) {
      resultado = <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                  </div>
    } else {
      resultado = <Resultado
                      imagenes={this.state.imagenes}
                      paginaAnterior={this.paginaAnterior}
                      paginaSigiente={this.paginaSigiente}
                      pagina={this.state.pagina}
                      totalPaginas={this.state.totalPaginas}
                    />
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          {resultado}
        </div>
       
      </div>
    );
  }
}

export default App;
