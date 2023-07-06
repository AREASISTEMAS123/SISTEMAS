import { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TablaListaColaboradores from "./commons/TablaListaColaboradores";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


export const VistaAdminColaborador = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  //UseState Filtar
  const [filterName, setFilterName] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterDate, setfilterDate] = useState('')


  // Usesate de campos a insertar
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [dni, setDni] = useState('');
  const [department, setDepartment] = useState('');
  const [area, setArea] = useState('');
  const [shift, setShift] = useState('');
  const [birthday, setBirthday] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [responsible, setResponsible] = useState('');
  const [avatar, setAvatar] = useState('');



  const apiURL = "http://127.0.0.1:8000/api";
  const Token = localStorage.getItem("token");

  // Registrar Usuario
  const registrarUsuario = () => {
    if (
      name.trim() === '' ||
      surname.trim() === '' ||
      email.trim() === '' ||
      profile.trim() === '' ||
      dni.trim() === '' ||
      department.trim() === '' ||
      area.trim() === '' ||
      shift.trim() === '' ||
      birthday.trim() === '' ||
      dateStart.trim() === '' ||
      responsible.trim() === ''
    ) {
      setShowModal(true),
        setMensajeError('Rellene todos los campos');
      return;
    }

    const url = apiURL + '/users/register';

    const data = {
      name: name,
      surname: surname,
      email: email,
      profile_name: profile,
      dni: dni,
      department: department,
      area: area,
      shift: shift,
      birthday: birthday,
      date_start: dateStart,
      responsible: responsible,
    };

    const formData = new FormData();
    formData.append('avatar', avatar);

    for (let key in data) {
      formData.append(key, data[key]);
    }

    fetch(url, {
      method: 'POST',

      body: formData,
    })
      .then(response => {
        if (response.ok) {
          setShowAlert(true);
          setMessage('Usuario agregado exitosamente');
          //Limpiar Formulario
          setName('');
          setSurname('');
          setEmail('');
          setProfile('');
          setDni('');
          setDepartment('');
          setArea('');
          setShift('');
          setBirthday('');
          setDateStart('');
          setResponsible('');
          setAvatar('');

          setMensajeError('');
          ListarUsuarios();
        } else {
          throw new Error('Error al guardar los datos');
        }
      })
      .catch(error => {
        setShowAlert(true);
        setMessage(`Error al agregar usuario: ${error}`);
      });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  }


  // Listar Colaboradores
  useEffect(() => {
    ListarUsuarios();
  }, []);
  const ListarUsuarios = async () => {
    try {
      const response = await fetch(apiURL + "/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      setUsers(data.profile);
    } catch (error) {
      console.log("Error al obtener los usuarios:", error);
    }
  };



  //Modificar Colaborador
  const modificarColaborador = (userUpdate) => {
    const url = apiURL + `/users/update/${userUpdate.id}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      },
      body: JSON.stringify(userUpdate),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Datos de usuario modificado exitosamente');
          setShowAlert(true);
          setUsers(prevTasks => {
            return prevTasks.map(user => {
              if (user.id === userUpdate.id) {
                return userUpdate;
              }
              return user;
            });
          });
        } else {
          throw new Error('Error al guardar datos de Usuario');
        }
      })
      .catch(error => {
        setMessage(`Error al modificar usuario: ${error}`);
        setShowAlert(true);
      });
  };

  //Eliminar Usuario
  const eliminarUsuario = (userId) => {
    const url = apiURL + `/users/delete/${userId}`;

    fetch(url, {
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




  //Agregar Colaborador
  const AddUser = () => {
    setShowModal(false),
      setShowAlert(false),
      registrarUsuario()
    console.log(registrarUsuario)
  }

  const handleEditButtonClick = (rowData) => {
    setShowModalUpdate(true);
    setSelectedRowData((rowData));
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
                  onClick={() => setShowModal(true)}
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
                <input
                  type="date"
                  id="filterStartDate"
                  value={filterDate}
                  onChange={(e) => setfilterDate(e.target.value)}
                  className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterDepartment"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Departamento
                </label>
                <input
                  type="text"
                  id="filterDepartment"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  placeholder="Ingresa un departamento"
                  className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterNames"
                  className="block mb-1 font-medium text-cv-cyan"
                >
                  Filtrar por Nombre o Apellido
                </label>
                <input
                  type="text"
                  id="filterNames"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Ingresa un nombre"
                  className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                />
              </div>
            </div>
            <div>
              <TablaListaColaboradores data={users} update={handleEditButtonClick} deleteUser={eliminarUsuario} filterName={filterName} filterDepartment={filterDepartment} filterDate={filterDate} />
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

        {showModal ? (
          <div>
            <div className="fixed top-0 left-0 z-50 w-full h-full p-2 overflow-x-hidden overflow-y-auto">
              <div className="relative w-full h-auto md:w-1/2 my-6 mx-auto border-2 border-white p-1 rounded-lg rotate-[5deg]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rotate-[-5deg] p-2 md:p-0">
                  <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-lg md:text-3xl font-semibold uppercase">
                      Agregar Colaborador
                    </h3>
                  </div>
                  <div className="relative p-2 md:p-6 flex-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="w-full flex flex-col space-y-1">
                        <div className="w-full">
                          <label
                            htmlFor="names"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Nombres
                          </label>
                          <input
                            type="text"
                            id="names"
                            value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresar nombres completos"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="lastname"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Apellidos
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            value={surname} onChange={e => setSurname(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresar ambos apellidos"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="dni"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            DNI
                          </label>
                          <input
                            type="text"
                            id="dni"
                            value={dni} onChange={e => setDni(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresar número de DNI"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="birthday"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            type="date"
                            id="birthday"
                            value={birthday} onChange={e => setBirthday(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="email"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Dirección de correo electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresa el e-mail"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="departament"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Departamento
                          </label>
                          <input
                            type="text"
                            id="departament"
                            value={department} onChange={e => setDepartment(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresa el departamento"
                          />
                        </div>
                      </div>
                      <div className="w-full flex flex-col space-y-1">
                        <div className="w-full">
                          <label
                            htmlFor="area"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Area
                          </label>
                          <input
                            type="text"
                            id="area"
                            value={area} onChange={e => setArea(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresa el area"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="profile"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Perfil
                          </label>
                          <input
                            type="text"
                            id="profile"
                            value={profile} onChange={e => setProfile(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresa el perfil"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="rol"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Turno
                          </label>
                          <select
                            id="rol"
                            value={shift} onChange={e => setShift(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                          >
                            <option>Selecciona</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="responsable"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Responsable
                          </label>
                          <input
                            type="text"
                            id="responsable"
                            value={responsible} onChange={e => setResponsible(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            placeholder="Ingresa el nombre completo"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="startDate"
                            className="block mb-1 font-medium text-gray-900"
                          >
                            Fecha de ingreso
                          </label>
                          <input
                            type="date"
                            id="startDate"
                            value={dateStart} onChange={e => setDateStart(e.target.value)}
                            className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mx-auto w-full">
                      <label
                        htmlFor="fileImage"
                        className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
                      >
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">
                          <CloudUploadIcon
                            className="text-cv-secondary hover:text-cv-primary"
                            sx={{ fontSize: 70 }}
                          />
                          <div className="text-gray-600 text-center md:text-start">
                            <p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
                              {avatar ? avatar.name : "Seleccione un archivo o arrastre y suelte aquí"}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {avatar ? '' : "JPG o PNG, máximo 10MB (800 X 800 px)"}
                            </p>
                          </div>
                          <button>
                            <label
                              htmlFor="fileImage"
                              className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150"
                            >
                              Seleccionar
                            </label>
                          </button>
                        </div>
                        <input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={uploadFile} />
                      </label>
                    </div>
                    <p className='text-red-500 font-semibold'>{mensajeError}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b space-y-2 md:space-x-4 md:space-y-0">
                    <button
                      className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button" onClick={AddUser}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
          </div>
        ) : null}

        {showModalUpdate ? (
          <div>
            <div className="fixed top-0 left-0 z-50 w-full h-full p-2 overflow-x-hidden overflow-y-auto">
              <div className="relative w-full h-auto md:w-1/2 my-6 mx-auto border-2 border-white p-1 rounded-lg rotate-[5deg]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rotate-[-5deg] p-2 md:p-0">
                  <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-lg md:text-3xl font-semibold uppercase">
                      Editar Colaborador
                    </h3>
                  </div>
                  {selectedRowData && users && (
                    <div className="relative p-2 md:p-6 flex-auto space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="w-full flex flex-col space-y-1">
                          <div className="w-full">
                            <label
                              htmlFor="names"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Nombres
                            </label>
                            <input
                              type="text"
                              id="names"
                              value={selectedRowData && selectedRowData.user && selectedRowData.user[0].name}
                              onChange={(event) => {
                                if (selectedRowData && selectedRowData.user) {
                                  setSelectedRowData((prevUsers) => ({
                                    ...prevUsers,
                                    user: [
                                      {
                                        ...prevUsers.user[0],
                                        name: event.target.value,
                                      },
                                      ...prevUsers.user.slice(1),
                                    ],
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresar nombres completos"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="lastname"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Apellidos
                            </label>
                            <input
                              type="text"
                              id="lastname"
                              value={selectedRowData && selectedRowData.user && selectedRowData.user[0].surname}
                              onChange={(event) => {
                                if (selectedRowData && selectedRowData.user) {
                                  setSelectedRowData((prevUsers) => ({
                                    ...prevUsers,
                                    user: [
                                      {
                                        ...prevUsers.user[0],
                                        surname: event.target.value,
                                      },
                                      ...prevUsers.user.slice(1),
                                    ],
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresar ambos apellidos"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="dni"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              DNI
                            </label>
                            <input
                              type="text"
                              id="dni"
                              value={selectedRowData && selectedRowData.dni}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    dni: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresar número de DNI"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="birthday"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Fecha de nacimiento
                            </label>
                            <input
                              type="date"
                              id="birthday"
                              value={selectedRowData && selectedRowData.birthday}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    birthday: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="email"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Dirección de correo electrónico
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={selectedRowData && selectedRowData.user && selectedRowData.user[0].email}
                              onChange={(event) => {
                                if (selectedRowData && selectedRowData.user) {
                                  setSelectedRowData((prevUsers) => ({
                                    ...prevUsers,
                                    user: [
                                      {
                                        ...prevUsers.user[0],
                                        email: event.target.value,
                                      },
                                      ...prevUsers.user.slice(1),
                                    ],
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresa el e-mail"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="departament"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Departamento
                            </label>
                            <input
                              type="text"
                              id="departament"
                              value={selectedRowData && selectedRowData.department}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    department: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresa el departamento"
                            />
                          </div>
                          <div className="w-full">
                            <span
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Estado
                            </span>

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox"
                                value={selectedRowData && selectedRowData.user && selectedRowData.user[0].status}
                                checked={selectedRowData && selectedRowData.user && selectedRowData.user[0].status === 1}
                                onChange={() => {
                                  if (selectedRowData && selectedRowData.user) {
                                    const newStatus = selectedRowData.user[0].status === 1 ? 0 : 1;
                                    const updatedUser = {
                                      ...selectedRowData.user[0],
                                      status: newStatus,
                                    };
                                    setSelectedRowData((prevData) => ({
                                      ...prevData,
                                      user: [updatedUser, ...prevData.user.slice(1)],
                                    }));
                                  }
                                }}
                              className="sr-only peer" />
                              <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cv-cyan"></div>
                              <span className="ml-3 text-sm font-medium">
                                {selectedRowData && selectedRowData.user && selectedRowData.user[0].status === 1 ? 'Activo' : 'Inactivo'}
                              </span>
                            </label>

                          </div>
                        </div>
                        <div className="w-full flex flex-col space-y-1">
                          <div className="w-full">
                            <label
                              htmlFor="area"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Area
                            </label>
                            <input
                              type="text"
                              id="area"
                              value={selectedRowData && selectedRowData.area}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    area: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresa el area"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="profile"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Perfil
                            </label>
                            <input
                              type="text"
                              id="profile"
                              value={selectedRowData && selectedRowData.profile_name}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    profile_name: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresa el perfil"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="shift"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Turno
                            </label>
                            <select
                              id="shift"
                              value={selectedRowData && selectedRowData.shift}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    shift: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            >
                              <option>Selecciona</option>
                              <option value="Mañana">Mañana</option>
                              <option value="Tarde">Tarde</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="rol"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Rol
                            </label>
                            <select
                              id="rol"
                              value={selectedRowData && selectedRowData.role && selectedRowData.role[0].role_id}
                              onChange={(event) => {
                                setSelectedRowData((prevTask) => ({
                                  ...prevTask,
                                  role: [
                                    {
                                      ...prevTask.role[0],
                                      role_id: event.target.value,
                                    },
                                    ...prevTask.role.slice(1),
                                  ],
                                }));
                              }} className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            >
                              <option value="">Selecciona</option>
                              <option value="1">Gerencia</option>
                              <option value="2">Lider Departamento</option>
                              <option value="3">Lider Area</option>
                              <option value="4">Colaborador</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="responsable"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Responsable
                            </label>
                            <input
                              type="text"
                              id="responsable"
                              value={selectedRowData && selectedRowData.responsible}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    responsible: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                              placeholder="Ingresa el nombre completo"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="startDate"
                              className="block mb-1 font-medium text-gray-900"
                            >
                              Fecha de ingreso
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              value={selectedRowData && selectedRowData.date_start}
                              onChange={(event) => {
                                if (selectedRowData) {
                                  setSelectedRowData((prevData) => ({
                                    ...prevData,
                                    date_start: event.target.value,
                                  }));
                                }
                              }}
                              className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto w-full">
                        {/* <label
                          htmlFor="fileImage"
                          className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
                        >
                          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">
                            <CloudUploadIcon
                              className="text-cv-secondary hover:text-cv-primary"
                              sx={{ fontSize: 70 }}
                            />
                            <div className="text-gray-600 text-center md:text-start">
                              <p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
                                {avatar ? avatar.name : "Seleccione un archivo o arrastre y suelte aquí"}
                              </p>
                              <p className="text-xs md:text-sm text-gray-500">
                                {avatar ? '' : "JPG o PNG, máximo 10MB (800 X 800 px)"}
                              </p>
                            </div>
                            <button>
                              <label
                                htmlFor="fileImage"
                                className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150"
                              >
                                Seleccionar
                              </label>
                            </button>
                          </div>
                          <input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={uploadFile} />
                        </label> */}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b space-y-2 md:space-x-4 md:space-y-0">
                    <button
                      className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalUpdate(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button" onClick={() => { setShowModalUpdate(false), modificarColaborador(selectedRowData) }}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
          </div>
        ) : null}

      </div>
    </>
  );
};
