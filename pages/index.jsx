import React, { useState, useEffect } from 'react';
import { url } from '../env.json'
// import Contacto from '../components/contacto';
// import ShowProyects from '../components/showProyects';
// import RegisterPerson from './registerPerson';
import { Icon, Label, Menu, Tab, Table, Button, Card, Form } from 'semantic-ui-react'
const axios = require('axios');
import Swal from 'sweetalert2'

function HomePage() {

    const [todos, settodos] = useState([]);
    const [mostrarEditar, setmostrarEditar] = useState(false);
    const [user, setuser] = useState({})
    const [habilitarEditar, sethabilitarEditar] = useState(true)
    useEffect(() => {
        traertodos()
    }, []);
    const traertodos = async () => {
        let { api } = url
        await axios.get(api + 'show')
            .then(async res => {
                let { datos } = await res.data
                // console.log(datos)
                settodos(datos)
                setuser({})

            })
            .catch(async err => {

            })
    }
    const editar = async (obj) => {
        setmostrarEditar(true)
        setuser(obj)

    }
    const guardarEditar = async () => {
        let { api } = url
        await axios.post(api + 'editar', user)
            .then(async res => {
                console.log(res.data)
                await Swal.fire({ icon: 'success', text: 'Usuario Editado' })
                setmostrarEditar(false)
                sethabilitarEditar(true)
                await traertodos()
            })
            .catch(async err => {
                console.log(err)
            })
    }
    const handleInput = async ({ name, value }) => {
        setuser({ ...user, [name]: value })
        sethabilitarEditar(false)
    }
    const eliminar = async (id) => {
        let { api } = url;
        await Swal.fire({
            title: 'Quires Eliminar?',
            icon: 'question',
            iconHtml: '?',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',
            showCancelButton: true,
            showCloseButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.get(api + 'eliminar/' + id)
                    .then(async res => {
                        await traertodos()
                        console.log(res.data)
                    })
                    .catch(async err => {
                        console.log(err)
                    })
                await Swal.fire({ icon: 'success', text: 'Usuario Eliminado' })
            } else {

            }
        })
    }
    return (
        <div style={{ width: '1000px', justifyContent: 'center!important' }} className="container mt-2">
            {!mostrarEditar ?
                < Table celled className="mt-5">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing textAlign="center"><Icon name="user" /></Table.HeaderCell>
                            <Table.HeaderCell>Nombres</Table.HeaderCell>
                            <Table.HeaderCell>Apellidos</Table.HeaderCell>
                            <Table.HeaderCell colSpan="2" collapsing>Opciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {todos.map((obj, key) =>
                            <Table.Row key={key}>
                                <Table.Cell collapsing textAlign="center">{key + 1}</Table.Cell>
                                <Table.Cell>{obj.nombres}</Table.Cell>
                                <Table.Cell>{obj.apellidos}</Table.Cell>
                                <Table.Cell collapsing textAlign="center"><Button icon onClick={(e) => { editar(obj) }}><Icon name="edit" color="orange" /></Button></Table.Cell>
                                <Table.Cell collapsing textAlign="center"><Button icon onClick={(e) => { eliminar(obj.id) }}><Icon name="delete" color="red" /></Button></Table.Cell>

                            </Table.Row>
                        )}


                    </Table.Body>


                </Table>
                :
                <Card className="mt-5" fluid>
                    <Card.Content>
                        <Card.Header>Edite el Usuario</Card.Header>
                        <Form>
                            <Form.Field>
                                <label>Nombres</label>
                                <input placeholder='nombres' value={user.nombres || ""} onChange={(e) => handleInput(e.target)} name="nombres" />
                            </Form.Field>
                            <Form.Field>
                                <label>Apellidos</label>
                                <input placeholder='apellidos' value={user.apellidos || ""} onChange={(e) => handleInput(e.target)} name="apellidos" />
                            </Form.Field>
                            <Button onClick={() => { setmostrarEditar(false), sethabilitarEditar(true) }} ><Icon name="arrow left" />Regresar</Button>
                            <Button color='green' disabled={habilitarEditar} onClick={() => guardarEditar()}>Guardar</Button>
                        </Form>
                    </Card.Content>

                </Card>

            }
        </div >)
}

export default HomePage