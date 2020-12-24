import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import NavBar from '../components/navbar';
import Show from '../components/show';
import 'semantic-ui-css/semantic.min.css'


export default class MyApp extends App {

    static getInitialProps = async ({ Component, ctx }) => {
        let pageProps = {};
        if (await Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
        let { query, pathname } = ctx;
        return { pageProps, query, pathname }
    }

    render() {

        let { Component, pageProps, is_render } = this.props;

        return (
            <Fragment>

                <Head>
                    <meta charset="utf-8" />
                    <title>Proyecto Servidores</title>
                    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                    <meta content="" name="keywords" />
                    <meta content="" name="description" />


                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet" />
                    <link rel="stylesheet" href="/fontawesome/css/all.min.css" media="all" />

                    <link href="/css/bootstrap.css" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href="/css/app.css" />
                    <script src="js/main.js"></script>
                </Head>

                {/* <Navbar transparent={pathname == '/'} /> */}
                <Show condicion={is_render}>

                    <NavBar />
                    <Component {...pageProps} />

                </Show>



            </Fragment>
        )
    }

}