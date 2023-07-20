import { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TablaListaColaboradores from "./commons/TablaListaColaboradores";
import { ModalAddUser, ModalUpdateUser } from "./commons";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


export const VistaAdminColaborador = () => {
  const [users, setUsers] = useState([]);
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  //UseState Filtar
  const [filterName, setFilterName] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterDate, setFilterDate] = useState('')
  const [filterShift, setFilterShift] = useState('')

  const Token = localStorage.getItem("token");


  //Listar Usuarios
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.profile);
      } else {
        console.error('Error al obtener los usuarios:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  //Agregar Usuario
  const agregarUsuario = async (nuevoUsuario) => {

    const formData = new FormData();
    formData.append('name', nuevoUsuario.name);
    formData.append('surname', nuevoUsuario.surname);
    formData.append('email', nuevoUsuario.email);
    formData.append('profile_name', nuevoUsuario.profile);
    formData.append('dni', nuevoUsuario.dni);
    formData.append('department', nuevoUsuario.departament);
    formData.append('area', nuevoUsuario.area);
    formData.append('shift', nuevoUsuario.shift);
    formData.append('birthday', nuevoUsuario.birthday);
    formData.append('date_start', nuevoUsuario.dateStart);
    formData.append('date_end', nuevoUsuario.dateEnd)
    formData.append('responsible', nuevoUsuario.responsible);
    formData.append('avatar', nuevoUsuario.avatar);

    fetch(import.meta.env.VITE_API_URL + '/users/register', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          setShowAlert(true);
          setMostrarAgregarModal(false);
          setMessage('Usuario agregado exitosamente');
          obtenerUsuarios();
        } else {
          throw new Error('Error al guardar los datos');
        }
      })
      .catch(error => {
        setShowAlert(true);
        setMessage(`Error al agregar usuario: ${error}`);
      });
  };


  const editarUsuario = async (usuarioEditado) => {

    const formData = new FormData();
    formData.append('name', usuarioEditado.Name);
    formData.append('surname', usuarioEditado.Surname);
    formData.append('email', usuarioEditado.Email);
    formData.append('status', usuarioEditado.Status);
    formData.append('profile_name', usuarioEditado.Profile);
    formData.append('dni', usuarioEditado.Dni);
    formData.append('department', usuarioEditado.Departament);
    formData.append('area', usuarioEditado.Area);
    formData.append('shift', usuarioEditado.Shift);
    formData.append('birthday', usuarioEditado.Birthday);
    formData.append('date_start', usuarioEditado.DateStart);
    formData.append('date_end', usuarioEditado.DateEnd);
    formData.append('responsible', usuarioEditado.Responsible);
    formData.append('role_id', usuarioEditado.Role);
    formData.append('avatar', usuarioEditado.Avatar);
    formData.append('_method', 'PUT');

    try {
      const response = await fetch(import.meta.env.VITE_API_URL +  `/users/update/${usuarioEditado.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Token}`
        },
        //body: JSON.stringify(usuarioEditado),
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const usuariosActualizados = users.map((usuario) => {
          if (usuario.id === usuarioEditado.id) {
            //return data;
            return {
              ...usuario,
              ...usuarioEditado,
            };
          }
          return usuario;
        });
        setUsers(usuariosActualizados);
        setMessage('Datos de usuario modificado exitosamente');
        setShowAlert(true);
        cerrarEditarModal();
        obtenerUsuarios();
      } else {
        setMessage(`Error al modificar usuario: ${data.error}`);
        setShowAlert(true);
        cerrarEditarModal();
      }
    } catch (error) {
      setMessage(`Error al modificar usuario: ${error}`);
      setShowAlert(true);
      cerrarEditarModal();
    }
  };


  //Eliminar Usuario
  const eliminarUsuario = (userId) => {

    fetch(import.meta.env.VITE_API_URL + `/users/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      },
    })
      .then(response => {
        if (response.ok) {
          setMessage('Usuario eliminado exitosamente');
          setShowAlert(true);
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
          throw new Error('Error al eliminar usuario');
        }
      })
      .catch(error => {
        setMessage(`Error al eliminar usuario: ${error}`);
        setShowAlert(true);
      });
  };



  const abrirAgregarModal = () => {
    setMostrarAgregarModal(true);
  };

  const cerrarAgregarModal = () => {
    setMostrarAgregarModal(false);
  };

  const abrirEditarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditarModal(true);
  };

  const cerrarEditarModal = () => {
    setMostrarEditarModal(false);
    setUsuarioSeleccionado(null);
  };

  const clearFilterDate = () => {
    setFilterDate("");
  };
  const clearFilterShift  = () => {
    setFilterShift("");
  };
  const clearFilterDepartment  = () => {
    setFilterDepartment("");
  };
  const clearFilterName = () => {
    setFilterName("");
  };

  return (
    <>
      <div className="h-screen">
        <section className="w-full">
          <div className="text-center my-4">
            <h2 className="text-2xl md:text-5xl text-white font-bold uppercase">
              Colaboradores
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col items-end space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full">
                <button
                  onClick={abrirAgregarModal}
                  className="p-2 rounded-md text-cv-primary bg-cv-cyan font-semibold flex items-center justify-center text-lg uppercase"
                >
                  <PersonAddIcon />
                  <p className="ml-2 whitespace-nowrap">Agregar Colaborador</p>
                </button>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterStartDate"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Fecha de Ingreso
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                  <input
                    type="date"
                    id="filterStartDate"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  />
                  <button onClick={clearFilterDate} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterDepartment"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Departamento
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                  <input
                    type="text"
                    id="filterDepartment"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    placeholder="Ingresa un departamento"
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  />
                  <button onClick={clearFilterDepartment} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterDepartment"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Turno
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                  <select
                    id="rol"
                    value={filterShift} onChange={(e) => setFilterShift(e.target.value)}
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  >
                    <option>Selecciona</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                  </select>
                  <button onClick={clearFilterShift} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterNames"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Nombre o Apellido
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                <input
                  type="text"
                  id="filterNames"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Ingresa un nombre"
                  className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                />
                  <button onClick={clearFilterName} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                  <CloseIcon />
                </button>
              </div>
              </div>
            </div>
            <div>
              <TablaListaColaboradores data={users} abrirEditarModal={abrirEditarModal}
                eliminarUsuario={eliminarUsuario} deleteUser={eliminarUsuario} filterName={filterName} filterDepartment={filterDepartment} filterDate={filterDate} filterShift={filterShift} />
            </div>
          </div>
        </section>

        {showAlert ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                  <div className="relative p-6 flex-auto">
                    <div className='space-y-2 flex flex-col items-center'>
                      <div className='w-full flex items-center justify-center text-green-500 text-x'>
                        {message === 'Usuario agregado exitosamente' || message === 'Datos de usuario modificado exitosamente' || message === 'Usuario eliminado exitosamente' ? (
                          <CheckCircleIcon className="text-green-500" sx={{ fontSize: 96 }} />
                        ) : (
                          <ErrorIcon className="text-red-500" sx={{ fontSize: 96 }} />
                        )}
                      </div>
                      <div className='w-full flex items-center justify-center text-gray-950'>
                        {message && <h3 className="text-3xl font-bold text-center">{message}</h3>}
                      </div>
                    </div>

                  </div>
                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">

                    <button
                      className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowAlert(false)}
                    >
                      Cerrar
                    </button>

                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}

        {mostrarAgregarModal && (
          <ModalAddUser
            agregarUsuario={agregarUsuario}
            cerrarAgregarModal={cerrarAgregarModal}
          />
        )}

        {mostrarEditarModal && usuarioSeleccionado && (
          <ModalUpdateUser
            usuario={usuarioSeleccionado}
            editarUsuario={editarUsuario}
            cerrarEditarModal={cerrarEditarModal}
          />
        )}


      </div>
    </>
  );
};
