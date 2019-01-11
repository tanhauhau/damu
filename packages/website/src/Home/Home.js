import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.scss';

export default function Home() {
  return (
    <div className={styles.App}>
      <div>
        <h1 className={styles.title}>Damu</h1>
        <h2 className={styles.subtitle}>A React Compiler</h2>
        <Link to="/repl">
          <button className={styles.button}>REPL</button>
        </Link>
      </div>
    </div>
  );
}
