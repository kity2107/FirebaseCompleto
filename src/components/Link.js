import React, { useEffect, useState } from "react";
import LinkForm from "../components/LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Link = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async linkObject => {
    try {
      if (currentId === "") {
        //console.log(linkObject);
        await db.collection("links").doc().set(linkObject);
        //console.log("se subieron los datos a firebase");
        toast("se subieron los datos a firebase", {
          type: "success",
          autoClose: 1000,
        });
      } else {
        await db.colections("links").doc(currentId).update(linkObject);
        toast("actualizado ok!", { type: "info", autoClose: 1000 });
        setCurrentId(""); //asi el id queda en blanco y no cambia nuevamente el form
      }
    } catch (err) {
      console.error(err);
    }
  };

  //con esta funcion queda a la escucha 'querysnapshot' de los cambios q suceden y los devuelve
  const getLink = async () => {
    db.collection("links").onSnapshot(querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        //console.log(doc.data());
        // console.log(doc.id); //me muestra el id por consola
        docs.push({ ...doc.data(), id: doc.id }); //ordeno cada objeto con su id correspondiente
      });
      setLinks(docs);
      //console.log(docs);
    });
  };

  useEffect(() => {
    getLink();
  }, []);

  //eliminar un link
  const onDeleteLink = async id => {
    if (window.confirm("Realmente desea eliminar el enlace?")) {
      //console.log(id);
      await db.collection("links").doc(id).delete();
      //console.log("tarea eliminada");
      toast("tarea eliminada", { type: "error", autoClose: 2000 });
    }
  };

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map(link => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>

                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Ir al sitio web
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Link;
