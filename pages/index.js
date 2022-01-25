import Link from "next/link";
import Head from 'next/head';
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ data }) {
  // console.log(data);

  const [loggedIn, setloggedIn] = useState(false);
  const login = () => {
    var user = document.getElementById("userName").value;
    var pass = document.getElementById("passWord").value;
    if (user === "heyhive" && pass === "akshay1234") {
      setloggedIn(true);
      console.log("Sucessful logged in!!");
    } else {
      alert("This is wrong username and password try again");
    }
  };

  const logout = () => {
    setloggedIn(false);
    console.log("logged out!!");
  };

  if (!loggedIn)
    return (
      <div className={styles.Container}>
        <Head>
        <title>Next JS Application</title>
        </Head>
        <div className={styles.loginContainer}>
        <h1 className={styles.heading}>Login</h1>
        <input type="text" id="userName" placeholder="Enter username here..." className={styles.inputs} />
        <input type="password" id="passWord" placeholder="Enter password here..." className={styles.inputs} />
        <button onClick={login} className={styles.loginbtn}>
          Login
        </button>
        </div>
      </div>
    );
  else {
    return (
      <div className={styles.dataContainer} >
        <Head>
        <title>Api Data</title>
        </Head>
         <button onClick={logout} className={styles.logoutBtn}>
          <Link href="/">
            <a>Logout</a>
          </Link>
        </button>
        {data.map((i) => (
          <div key={i.id}>
            <h1 className={styles.titleHead}><span className={styles.titleShort}>Title :</span> {i.title}</h1> 
            <p className={styles.bodyPara}> <span className={styles.shortPara}>Content : </span>{i.body}</p>
          </div>
        ))}
       
      </div>
    );
  }
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=15"
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
