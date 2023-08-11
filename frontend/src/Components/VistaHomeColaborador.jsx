import { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CakeIcon from "@mui/icons-material/Cake";
import { CumpleanosCardColaborador } from "./CumpleanosCardColaborador";

export const VistaHomeColaborador = () => {  
  const Token = localStorage.getItem("token");
  const userId = localStorage.getItem("iduser");
  const [birthday, setBirthday] = useState([])
  const [userData, setUserData] = useState([]);
  


  useEffect(() => {
    obtenerDataUser();
    obtenerCumpleaños();
  }, []);

  //Obtener datos de Usuario
  const obtenerDataUser = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.error('Error al obtener los usuarios:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Obtener Nombre
  let name = '';
  let surname = '';
  if (userData.usuario && Array.isArray(userData.usuario) && userData.usuario.length > 0) {
    name = userData.usuario[0].user[0].name;
  }
  if (userData.usuario && Array.isArray(userData.usuario) && userData.usuario.length > 0) {
    surname = userData.usuario[0].user[0].surname;
  }



  //Obtener Cumpleaños
  const obtenerCumpleaños = async () => {
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
    { title: "Asistencia", item: userData.Asistencia },
    { title: "Tardanzas", item: userData.Tardanzas },
    { title: "Faltas", item: userData.Faltas },
    { title: "Justificaciones", item: userData.Justificaciones },
  ];

  

  return (
    <>
      <div className="h-full bg-cv-secondary">
        <section className="w-full bg-cv-secondary space-y-4">
          <div className="text-center my-4">
            <h2 className="text-xl md:text-3xl text-white font-bold uppercase">
              Mucho Gusto {`${name.split(" ")[0]} ${surname.split(" ")[0]}`}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <h3 className="text-xl mr-2">Resumen de Asistencia</h3>
              <DescriptionIcon />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 place-items-center">
              {cardAsistencia.map((card, index) => (
                <div
                  key={index}
                  className="w-full md:max-w-xs bg-cv-primary text-white rounded-md p-5 space-y-2"
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
              <h3 className="text-xl mr-2">Próximos Cumpleaños</h3>
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
