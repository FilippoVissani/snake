import Head from 'next/head';
import Board from '../components/Board';
import React from "react";

const Home: React.FC = () => {
  return (
      <div>
        <Head>
          <title>Snake Game</title>
          <meta name="description" content="Snake Game with React, Next.js, TypeScript, and Tailwind CSS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Snake Game</h1>
          <Board />
        </main>

        <footer>
          <p>Powered by Next.js</p>
        </footer>
      </div>
  );
};

export default Home;