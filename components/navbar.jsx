import React, { Component } from 'react';
import { Form, Card, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
class navBar extends Component {
    state = {}
    render() {
        return (
            <nav className={`navbar navbar-expand-md navbar-dark fixed-top`} style={{ background: '#738c8c' }}>
                <a className="navbar-brand" href="#">

                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">


                    </ul>
                    <div className="form-inline mt-2 mt-md-0">

                        <Link href="/crear">
                            <a className="btn mr-2">
                                <Icon name="add" />
                                Crear
                            </a>

                        </Link>
                        <Link href="/">
                            <a className="btn mr-2">
                                <Icon name="user" />
                                Ver Todos
                            </a>

                        </Link>



                    </div>
                </div>
            </nav >
        );
    }
}

export default navBar;