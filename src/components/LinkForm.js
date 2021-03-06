import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinksForm = props => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //el validURL recibe un string y lo valida
  const validURL = str => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //console.log(values);
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
    if (!validURL(values.url)) {
      return toast("invalid url", { type: "warning", autoClose: 1000 });
    }

    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  //se hace la peticion a firebase para tener un enlace por id
  const getLinkById = async id => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  //aca consulto si hay alguna tarea seleccionada para editar
  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues }); //establece los valores en vacio
    } else {
      getLinkById(props.currentId); //si hay un id seleccionado, cada vez q cambie el id
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]); //se va a ejecutar cuando le pasamos el props.currentId

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.xyz"
          value={values.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="Website Name"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a Description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        {/* pregunta si no hay seleccionado un id muestra save... */}
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinksForm;
