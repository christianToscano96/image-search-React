import React, {Component} from 'react';

class Navegacion extends Component {

    mostrarAnterior = () => {
        const {pagina} = this.props;
        if(pagina === 1) return null;
        return (
            <button onClick={this.props.paginaAnterior} type="button" className="btn btn-info mr-1">&larr; Anterior </button>
        )
    }

    mostrarSigiente = () => {
        const {pagina, totalPaginas} = this.props;
        if(pagina === totalPaginas) return null;
        return (
            <button onClick={this.props.paginaSigiente} type="button" className="btn btn-info mr-1">Siguente &rarr;</button>        )
    }




    render() {
            return ( 
                    <div className=" py-5 ">
                        { this.mostrarAnterior() }
                        { this.mostrarSigiente() }
                    </div>
                );
            }

    }
    
 
export default Navegacion;