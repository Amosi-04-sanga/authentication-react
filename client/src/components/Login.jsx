import React, { useState } from 'react'
import styles from '../styles.module.css'

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const submitHandle = e => {
    e.preventDefault()
    console.log("submited!")
  }

  return (
    <div className={styles.container} >
       <form className={styles.form} onSubmit={submitHandle} >
         
         <div className={styles.row}>
           <label className={styles.formfield} htmlFor="email">Enter email</label>
           <input 
             type="email"
             id='email'
             className={`${styles.formfield} ${styles.input}`}
             name= "email"
             value={data.email}
             onChange={ e => setData( { ...data, email: e.target.value  } ) }
           />
         </div>
         <div className="row">
           <label className={styles.formfield} htmlFor="password">Enter password</label>
           <input 
             type="password"
             id='password'
             className={`${styles.formfield} ${styles.input}`}
             name= "password"
             value={data.password}
             onChange={ e => setData({ ...data, password: e.target.value }) }
           />
         </div>

         <button className={styles.submitBtn} type="submit">login</button>

       </form>
    </div>
  )
}

export default Login