import React from 'react';
import './Imagen.css';

const Imagen = (props) => {

     const {largeImageURL,likes,  tags, views } = props.imagen;

     return (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
               <div className="card">
                    <img src={largeImageURL} alt={tags} className="card-img-top" />
                    <div className="card-body">
                         <p className="card-text">{likes} <span> Me gusta</span> </p>
                         <p className="card-text">{views} <span>Vistas</span></p>

                         <a href={largeImageURL} target="_blank" rel='noreferrer noopener' className="btn btn-primary btn-block">Ver Imagen</a>
                    </div>
               </div>
          </div>
     )
}

export default Imagen;
