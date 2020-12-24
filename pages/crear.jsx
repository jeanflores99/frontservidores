import React, { useState, useEffect } from 'react';

const axios = require('axios');
import { Form, Card, Button, Icon } from 'semantic-ui-react';
import { url } from '../env.json';
import Show from '../components/show'
import Swal from 'sweetalert2'



const crear = () => {
    const [datos, setdatos] = useState({
        nombres: '', apellidos: ''
    })
    const [habilitar, sethabilitar] = useState(true)
    useEffect(() => {
        comprobarlenght()
    }, [datos]);
    const handleInput = ({ name, value }) => {
        setdatos({ ...datos, [name]: value })
        comprobarlenght()
    }
    const registrar = async () => {
        let { api } = url

        await axios.post(api + 'create', datos)
            .then(async res => {
                let { success } = res.data
                if (!success) throw new Error()
                await Swal.fire({ icon: 'success', text: 'Persona agregada' })
                setdatos({ nombres: '', apellidos: '' })
                sethabilitar(true)
            })
            .catch(async err => {
                await Swal.fire({ icon: 'error', text: 'Error al agregar' })


            })


    }
    const comprobarlenght = async () => {
        if (datos.nombres.length > 3 && datos.apellidos.length > 3) {
            sethabilitar(false)
        } else {
            sethabilitar(true)
        }
    }

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-12 mb-5 mt-4">
                    <Card fluid>
                        <Card.Header>
                            <div className="card-body">
                                <h3>Registro de Persona</h3>
                            </div>

                        </Card.Header>
                        <Card.Content>
                            <Form>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <Form.Field >
                                            <label>Ingrese su Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={datos.nombres || ""}
                                                name="nombres"
                                                onChange={(e) => handleInput(e.target)}
                                                placeholder='Nombre Completo'
                                            />
                                            {/* <Show condicion={errors && errors.field == "first_name"}>
                                                    <label style={{ color: "#c91d12" }}>{errors && errors.message}</label>
                                                </Show> */}

                                        </Form.Field>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <Form.Field>
                                            <label>Ingrese sus Apellido Completos</label>
                                            <input
                                                type="text"
                                                value={datos.apellidos || ""}
                                                onChange={(e) => handleInput(e.target)}
                                                name="apellidos"
                                                placeholder='Apellido Completo'
                                            />
                                            {/* <Show condicion={errors && errors.field == "last_name"}>
                                                    <label style={{ color: "#c91d12" }}>{errors && errors.message}</label>
                                                </Show> */}
                                        </Form.Field>
                                    </div>

                                </div>
                                <Button color="facebook"
                                    disabled={habilitar}
                                    onClick={() => { registrar() }}
                                >
                                    <i className="fas fa-arrow-right"></i> Registrar
                                </Button>
                            </Form>
                        </Card.Content>

                    </Card>
                </div>
            </div>
        </div>


    );
}

export default crear;
