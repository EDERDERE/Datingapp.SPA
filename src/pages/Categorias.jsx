import React, { Fragment, useState, useEffect } from "react";

import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
//import Layout from './hoc/Layout';

function Categorias() {
  const baseURL = "https://localhost:44302/api/categoria";
  const [data, setData] = useState([]);
  const [modaleditar, setmodaleditar] = useState(false);
  const [modalinsertar, setmodalinsertar] = useState(false);
  const [modaleliminar, setmodaleliminar] = useState(false);

  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState({
    categorieId: "",
    categorieName: "",
    categorieDescription:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaSeleccionado({
      ...categoriaSeleccionado,
      [name]: value,
    }); 
  };

  const abrirCerarrModalInsertar = () => {
    setmodalinsertar(!modalinsertar);
  };

  const abrirCerarrModalEditar = () => {
    setmodaleditar(!modaleditar);
  };

  const abrirCerarrModalEliminar = () => {
    setmodaleliminar(!modaleliminar);
  };

  const peticionGet = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        console.log('get',response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    delete categoriaSeleccionado.categorieId;
    await axios
      .post(baseURL, categoriaSeleccionado)
      .then((response) => {        
        peticionGet();
        abrirCerarrModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(baseURL + "/" + categoriaSeleccionado.categorieId, categoriaSeleccionado)
      .then((response) => {     
        peticionGet();
        abrirCerarrModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseURL + "/" + categoriaSeleccionado.categorieId)
      .then((response) => {
        setData(
          data.filter((categoria) => categoria.categorieId !== response.data)
        );
        abrirCerarrModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarCategorias = (categorias, caso) => {
    setCategoriaSeleccionado(categorias);
    caso === "Editar" ? abrirCerarrModalEditar() : abrirCerarrModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <Fragment>
      <div className="App">

          <h1>Lista de Categorias</h1>
        <br></br>
        <button
          onClick={() => abrirCerarrModalInsertar()}
          className="btn btn-primary"
        >
          Insertar Categorias
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>             
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.categorieId}>
                <td>{item.categorieId}</td>
                <td>{item.categorieName}</td>
                <td>{item.categorieDescription}</td>            
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => seleccionarCategorias(item, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  {/* <button            
                    className="btn btn-danger"
                    onClick={() => seleccionarCategorias(item, "Eliminar")}
                  >
                    Eliminar
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalinsertar}>
          <ModalHeader>Insertar</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="">categorieName</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="categorieName"
                onChange={handleChange}
              />
              <label htmlFor="">categorieDescription</label>
              <br />      
              <input
                type="text"
                className="form-control"
                name="categorieDescription"
                onChange={handleChange}
              />          
  
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPost()}>
              Insertar
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => abrirCerarrModalInsertar()}
            >
              cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modaleditar}>
          <ModalHeader>Editar</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="">categorieId</label>
              <br />
              <input
                type="text"
                className="form-control"
                readOnly
                name="categorieId"
                value={categoriaSeleccionado && categoriaSeleccionado.categorieId}
              />
              <label htmlFor="">productName</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="categorieName"
                onChange={handleChange}
                value={categoriaSeleccionado && categoriaSeleccionado.categorieName}
              />            
                          <label htmlFor="">productName</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="categorieDescription"
                onChange={handleChange}
                value={categoriaSeleccionado && categoriaSeleccionado.categorieDescription}
              />  
        
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPut()}>
              Editar
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => abrirCerarrModalEditar()}
            >
              cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modaleliminar}>
          <ModalBody>
            ¿Estas seguro que deseas eliminar esta categoria {" "}
            {categoriaSeleccionado && categoriaSeleccionado.categorieName}?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => peticionDelete()}
            >
              Sí
            </button>{" "}
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerarrModalEliminar()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
}

export default Categorias;
