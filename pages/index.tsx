import Head from 'next/head';
import React, { useEffect} from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';
import { BundleDataProvider } from '../context/BundleDataProvider';
import styles from '../styles/Home.module.css';
import Home from './Home';
require('dotenv').config()

export default function App() {
  useEffect(ga.pageview);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return (
   <BundleDataProvider>
      <article className='App flex flex-col'>
        <a className="github-fork-ribbon" href="https://github.com/martriay/flashbots-explorer" data-ribbon="Contribute in GitHub" title="Contribute in GitHub">Contribute in GitHub</a>
        <h3 className={styles.header}>
          <span className={styles.emoji}> ⚡ </span>
          <span className={styles.gradient}>Flashbots Bundle Explorer </span>
          <span className={styles.emoji}>🤖</span>
        </h3>
        <Head>
        <title> 🤖 Flashbots Bundle Explorer ⚡ </title>
        <meta name="description" content="Explore Flashbots bundles" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />
      </Head>
      {/*   */}
      <Home />
      <footer className={styles.footer}>
        <span>brewed with ⚡  by <a href="https://marto.lol" target="_blank" rel="noopener noreferrer">marto.lol</a></span>
        <span className={styles.tipjar}>❤️ tip jar: <span className={styles['tipjar-address']}>0x87122a7385fd61720d72290a6f2ed25b7eca7af7</span> 💸</span>
      </footer>
    </article>
   </BundleDataProvider>
  )
}