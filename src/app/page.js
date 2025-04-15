'use client'
import Image from "next/image";
import styles from "./page.module.css";
import MainPage from './pages/mainpage';

export default function Home() {
  return (
    <div>
      <main >
      <MainPage />
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
