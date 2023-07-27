import { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CakeIcon from "@mui/icons-material/Cake";
import { CumpleanosCardColaborador } from "./CumpleanosCardColaborador";

export const VistaHomeColaborador = () => {  
  const Token = localStorage.getItem("token");
  const nombre = localStorage.getItem('name');
  const firstName = nombre.split(" ")[0];
  const [birthday, setBirthday] = useState([])
  


  useEffect(() => {
    obtenerAsistencia();
  }, []);

  const obtenerAsistencia = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/birthday/details`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });
      const data = await response.json();
      if (response.ok) {
        setBirthday(data.users);
      } else {
        console.error('Error al obtener los usuarios:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const cardAsistencia = [
    { title: "Asistencia", item: "20/100" },
    { title: "Tardanzas", item: 2 },
    { title: "Faltas", item: 1 },
  ];

  

  return (
    <>
      <div className="h-screen bg-cv-secondary">
        <section className="w-full bg-cv-secondary space-y-4">
          <div className="text-center my-4">
            <h2 className="text-2xl md:text-5xl text-white font-bold uppercase">
              Mucho Gusto {firstName}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <h3 className="text-xl mr-2">Resumen de Asistencia</h3>
              <DescriptionIcon />
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 place-items-center">
              {cardAsistencia.map((card, index) => (
                <div
                  key={index}
                  className="w-64 bg-cv-primary text-white rounded-md p-5 space-y-2"
                >
                  <div className="w-full text-left">
                    <h3 className="text-lg">{card.title}</h3>
                  </div>
                  <div className="w-full text-center">
                    <h2 className="text-4xl font-bold">{card.item}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <h3 className="text-xl mr-2">Proximos Cumpleaños</h3>
              <CakeIcon />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 place-items-center">
              <CumpleanosCardColaborador data={birthday}/>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
