import React, { Component, Fragment } from 'react';
import productoService from '../services/productoService';

import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';


class Productos extends Component {
  state = {
    values: []
  };



  //On Load
  async componentDidMount() {
    const { data: values } = await productoService.getProductos();
    this.setState({ values });
    console.log(values)
    // this.setState({ values: data });
  }

  render() {
    const { values } = this.state;
    return (
      <Fragment>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {values.map(item => (
          <tr key={item.productId}>
            <td>{item.productId}</td>
            <td>{item.productName}</td>          
            <td>{item.categorieName}</td>  
            <td>{item.productPrice}</td>   
            <td>
              <button className='btn btn-success'>Editar</button> {" "}
              <button className='btn btn-danger'>Eliminar</button>
            </td>
          </tr>
        ))}
          </tbody>

        </table>


<Modal>
  <ModalHeader>Insertar</ModalHeader>
  <ModalBody>
    <div className='form-group'>
      <label htmlFor="">producto</label>
      <br />
      <input type="text"  className='form-control'/>
      <label htmlFor=""></label>
      <br />
      <input type="text"  className='form-control'/>
      <label htmlFor=""></label>
      <br />
      <input type="text"  className='form-control'/>
    </div>
      
  </ModalBody>
  <ModalFooter>
    <button className='btn btn-primary'>Insertar</button>
    <button className='btn btn-danger'>cancelar</button>
  </ModalFooter>
</Modal>

       
      </Fragment>
    );
  }
}

export default Productos;
