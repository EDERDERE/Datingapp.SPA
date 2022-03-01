import React, { Fragment, useState, useEffect } from "react";

import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
//import Layout from './hoc/Layout';

function Productos() {
  const baseURL = "https://localhost:44302/api/Producto";
  const [data, setData] = useState([]);
  const [modaleditar, setmodaleditar] = useState(false);
  const [modalinsertar, setmodalinsertar] = useState(false);
  const [modaleliminar, setmodaleliminar] = useState(false);

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    productId: "",
    productName: "",
    categorieId:"",
    categorieName: "",
    productAccion:"",
    productPrice: "",
  });

  const URLbase = "https://localhost:44302/api/Categoria";
  const [dataCategoria, setDataCategoria] = useState([]);
  // const [modaleditar, setmodaleditar] = useState(false);
  // const [modalinsertar, setmodalinsertar] = useState(false);
  // const [modaleliminar, setmodaleliminar] = useState(false);

  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState({
    categorieId: "",
    categorieName: "",
    categorieDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado({
      ...productoSeleccionado,
      [name]: value,
    });

    setCategoriaSeleccionado({
      ...categoriaSeleccionado,
      [name]: value,
    });

    console.log(productoSeleccionado,'categoria',categoriaSeleccionado);
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

  const peticionGetCategoria = async () => {
    await axios
      .get(URLbase)
      .then((response) => {
        setDataCategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    delete productoSeleccionado.productId;
    productoSeleccionado.productPrice = parseFloat(
      productoSeleccionado.productPrice
    );

    productoSeleccionado.categorieId = parseFloat(
      productoSeleccionado.categorieId
    );

    productoSeleccionado.productAccion = 1;

    console.log(productoSeleccionado,'cat',categoriaSeleccionado,categoriaSeleccionado.categorieId)
    //productoSeleccionado.categorieId = categoriaSeleccionado.categorieId;

    await axios
      .post(baseURL, productoSeleccionado)
      .then((response) => {
        console.log('response', Array.from( response.data))
         //response.data = Object.fromEntries( response.data)

       // setData(response.data);
        // setDataCategoria(response.data);
        peticionGet();
        abrirCerarrModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    productoSeleccionado.productPrice = parseFloat(
      productoSeleccionado.productPrice
    );
    await axios
      .put(baseURL + "/" + productoSeleccionado.productId, productoSeleccionado)
      .then((response) => {
        var respuesta = response.data;
        console.log("xx", respuesta);
        // var dataAuxiliar = data;
        // dataAuxiliar.map((producto) => {
        //   if (producto.productId === productoSeleccionado.productId) {
        //     producto.productName = respuesta.productName;
        //     producto.productPrice = respuesta.productPrice;
        //   }
        // });
        peticionGet();
        abrirCerarrModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseURL + "/" + productoSeleccionado.productId)
      .then((response) => {
        setData(
          data.filter((producto) => producto.productId !== response.data)
        );
        abrirCerarrModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarProductos = (productos, caso) => {
    setProductoSeleccionado(productos);
    setCategoriaSeleccionado(productos.categorieId,productos.categorieName);
    caso === "Editar" ? abrirCerarrModalEditar() : abrirCerarrModalEliminar();
  };

  useEffect(() => {
    peticionGet();
    peticionGetCategoria();
  }, []);

  return (
    <Fragment>
      <div className="App">

          <h1>Lista de Productos</h1>
        <br></br>
        <button
          onClick={() => abrirCerarrModalInsertar()}
          className="btn btn-primary"
        >
          Insertar Productos
        </button>
        <table className="table table-bordered">
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
            {data.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.categorieName}</td>
                <td>{item.productPrice}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => seleccionarProductos(item, "Editar")}
                  >
                    Editar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarProductos(item, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalinsertar}>
          <ModalHeader>Insertar</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="">productName</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="productName"
                onChange={handleChange}
              />
              <label htmlFor="">categorieName</label>
              <br />
              <select
                className="form-control"
                data-val="true"
                name="categorieId"
                defaultValue={
                  categoriaSeleccionado &&  categoriaSeleccionado.categorieId
                }
                required
                onChange={handleChange}
              >
                <option value="">-- Seleccione Categoria --</option>
                {dataCategoria.map((categoria) => (
                  <option
                    key={categoria.categorieId}
                    value={categoria.categorieId}
                  >
                    {categoria.categorieName}
                  </option>
                ))}
              </select>
              <label htmlFor="">productPrice</label>
              <br />
              <input
                type="number"
                className="form-control"
                name="productPrice"
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
              <label htmlFor="">productId</label>
              <br />
              <input
                type="text"
                className="form-control"
                readOnly
                name="productId"
                value={productoSeleccionado && productoSeleccionado.productId}
              />
              <label htmlFor="">productName</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="productName"
                onChange={handleChange}
                value={productoSeleccionado && productoSeleccionado.productName}
              />
              <label htmlFor="">categorieName</label>
              <br />       
              <select
                className="form-control"
                data-val="true"
                name="categorieName"
                defaultValue={
                  productoSeleccionado && productoSeleccionado.categorieName
                }
                required
                onChange={handleChange}
              >
                <option value="">-- Seleccione Categoria --</option>
                {dataCategoria.map((categoria) => (
                  <option
                    key={categoria.categorieId}
                    value={categoria.categorieName}
                  >
                    {categoria.categorieName}
                  </option>
                ))}
              </select>
              <label htmlFor="">productPrice</label>
              <br />
              <input
                type="number"
                className="form-control"
                name="productPrice"
                onChange={handleChange}
                value={
                  productoSeleccionado && productoSeleccionado.productPrice
                }
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
            ¿Estas seguro que deseas eliminar este producto{" "}
            {productoSeleccionado && productoSeleccionado.categorieName}?
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

export default Productos;
