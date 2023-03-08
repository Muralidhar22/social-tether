import Head from "next/head";
import ExternalLayout from "@/layout/ExternalLayout";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { RegisterFormValues } from "@/types/formValues";
import registerValidate from "@/utils/registerValidate";

const Register = () => {
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: ""
        },
        validate: registerValidate,
        onSubmit
    })
    
    async function onSubmit (values: RegisterFormValues) {
        console.log(values)
    }
    
    return(
        <>
        <ExternalLayout>
            <Head>
                <title>Register - Tether</title>
                <meta name="description" content="Tether - Social media app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Register - Tether" key="title" />
            </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
               <div className="title">
                <h1 className="font-bold py-4 text-4xl">Register</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid iure corrupti pariatur explicabo inventore error sit quidem, minus dolor ducimus ab fuga distinctio voluptatibus sequi illum nemo illo ipsa alias.</p>
               </div>
               <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <div className={styles.input_group}>
                        <label htmlFor="username" className="sr-only">Enter your username</label>
                        <input 
                            type="username" 
                            {...formik.getFieldProps("username")}
                            placeholder="Username"
                            className={styles.input_text}
                        />
                        <span className="flex items-center px-4">
                            <HiOutlineUser 
                                size={25}
                            />
                        </span>
                    </div>
                                        {/* form username validation error message */}
                                        { (formik.errors.username && formik.touched.username) && <span className="text-sm text-rose-500">{formik.errors.username}</span>}                   
                    <div className={styles.input_group}>
                        <label htmlFor="email" className="sr-only">Enter your email</label>
                        <input 
                            type="email" 
                            {...formik.getFieldProps("email")}
                            placeholder="Email"
                            className={styles.input_text}
                        />
                        <span className="flex items-center px-4">
                            <HiAtSymbol 
                                size={25}
                            />
                        </span>
                    </div>
                                        {/* form email validation error message */}
                                        { (formik.errors.email && formik.touched.email) && <span className="text-sm text-rose-500">{formik.errors.email}</span>}
                    <div className={styles.input_group}>
                        <label htmlFor="password" className="sr-only">Enter your password</label>
                        <input 
                            type={show.password ? "text" : "password"}
                            id="password"
                            {...formik.getFieldProps("password")}
                            placeholder="Password"
                            className={styles.input_text}
                        />
                          <span className="flex items-center px-4 cursor-pointer hover:text-indigo-500" onClick={() => setShow({...show, password: !show.password
                        })}>
                            <HiFingerPrint 
                                size={25}
                            />
                        </span>
                    </div>
                     {/* form password validation error message */}
                     { formik.errors.password && formik.touched.password && <span className="text-sm text-rose-500">{formik.errors.password}</span>}
                    <div className={styles.input_group}>
                        <label htmlFor="cPassword" className="sr-only">Enter your confirm password</label>
                        <input 
                            type={show.confirmPassword ? "text" : "password"}
                            {...formik.getFieldProps("cpassword")}
                            id="cPassword"
                            placeholder="Confirm password"
                            className={styles.input_text}
                        />
                          <span className="flex items-center px-4 cursor-pointer hover:text-indigo-500" onClick={() => setShow({...show, confirmPassword: !show.confirmPassword
                        })}>
                            <HiFingerPrint 
                                size={25}
                            />
                        </span>
                    </div>
                     {/* form confirm password validation error message */}
                     { formik.errors.cpassword && formik.touched.cpassword && <span className="text-sm text-rose-500">{formik.errors.cpassword}</span>}
                    <div className="input-button">
                        <button type="submit" className={styles.button}>
                            Sign Up
                        </button>
                    </div>
               </form>
               <p className="text-center text-gray-500">
                Have an account?&nbsp;
                <Link className="text-blue-500" href={'/login'}>
                    Log In
                </Link>
               </p>
            </section>
        </ExternalLayout>
        </>
    )
}

export default Register;