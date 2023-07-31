import  { useState, useEffect } from "react";
import { DynamicSelect } from "./commons";
import { Button } from "@mui/material";
import DocuPDF from "./commons/DocuPDF";
import { PDFViewer } from "@react-pdf/renderer";

export const VistaReportes = () => {
  const departamento = ["Estrategico", "Operaciones", "Recurso Humanos"];
  const area = ["Sistemas", "Diseño Grafico", "Otra opcion"];
  const turno = ["Mañana", "Tarde"];
  const faltas = ["falta1", "falta2"];

  const [poema, setPoema] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [verWeb, setVerWeb] = useState(false);
  const [verPDF, setVerPDF] = useState(false);

  useEffect(() => {
    fetchPoema();
  }, []);

  function fetchPoema() {
    fetch("https://poetrydb.org/random/1")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const poem = data[0];
          setPoema({
            title: poem.title,
            poet: poem.author,
            content: poem.lines.join(" "),
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching poem:", error);
      });
  }

  return (
    <>
      <div className="h-screen">
        <h2 className="text-2xl md:text-5xl text-white font-bold uppercase mx-auto">
          Reportes
        </h2>
        <div className="flex space-x-4 mt-5">
          <div>
            <div className="text-center">Inicio</div>
            <DynamicSelect options={departamento} title={"12-05-21"} />
          </div>
          <div>
            <div className="text-center">Fin</div>
            <DynamicSelect options={area} title={"12-06-21"} />
          </div>
        </div>
        <div className="flex space-x-4 mt-5 mx-auto">
          <DynamicSelect options={departamento} title={"Departamento"} />
          <DynamicSelect options={area} title={"Area"} />
          <DynamicSelect options={turno} title={"Turno"} />
          <DynamicSelect options={faltas} title={"Faltas"} />
        </div>
        <Button
          variant="dark"
          onClick={() => {
            setVerPDF(!verPDF);
            setVerWeb(false);
          }}
        >
          {verPDF ? "Ocultar PDF" : "Ver PDF"}
        </Button>

        <div>
          {poema ? (
            <>
              {verPDF ? (
                <PDFViewer style={{ width: "100%", height: "90vh" }}>
                  <DocuPDF poema={poema} />
                </PDFViewer>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
