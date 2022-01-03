/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import styles from '../../styles/Home.module.css'

export default function Pokemon({ pokemon }) {
  return (
    <>
    <Head>
      <title>{pokemon.name}</title>
      <link rel="icon" href={pokemon.sprites.front_default} />
    </Head>
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <h1 style={{textTransform: 'capitalize'}}>
            {pokemon.name}
          </h1>
          <img src={pokemon.sprites.front_default} alt="Imagem de um pokemon" width={300} height={300} />
      <div className={styles.backButton}>
      <Link href="/" passHref style={{padding: '1rem'}}>
          Voltar ao início
      </Link>
      </div>
    </div>
    </>
  );
}

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
  }).isRequired,
};

export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Deu problema');
    })
    .then((respostaEmObjeto) => respostaEmObjeto);

  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'bulbasaur',
        },
      },
      {
        params: {
          slug: 'charmander',
        },
      },
      {
        params: {
          slug: 'squirtle',
        },
      },
      // {
      //   params: {
      //     slug: 'pikachu',
      //   },
      // },
    ],
    fallback: false,
  };
}