import Head from "next/head";
import ExternalLayout from "@/layout/ExternalLayout";
import Link from "next/link";
import styles from "@/styles/Form.module.css"
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { LoginFormValues } from "@/types/formValues";
import loginValidate from "@/utils/loginValidate";

const Login = () => {
    const [show, setShow] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: loginValidate,
        onSubmit
    })
    
    async function onSubmit(values: LoginFormValues) {
        signIn('credentials',{
            redirect: true,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
    }
    
    return(
        <>
        <ExternalLayout>
            <Head>
                <title>Login - Tether</title>
                <meta name="description" content="Tether - Social media app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Login - Tether" key="title" />
            </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-10 dark:!text-black">
               <div className="title">
                <h1 className="font-bold py-4 text-4xl">Explore</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid iure corrupti pariatur explicabo inventore error sit quidem, minus dolor ducimus ab fuga distinctio voluptatibus sequi illum nemo illo ipsa alias.</p>
               </div>
               <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <div className={styles.input_group}>
                        <label htmlFor="email" className="sr-only">Enter your email</label>
                        <input 
                            type="email"
                            placeholder="Email"
                            className={styles.input_text}
                            {...formik.getFieldProps("email")}
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
                            type={ show ? "text" : "password" }
                            placeholder="Password"
                            className={styles.input_text}
                            {...formik.getFieldProps("password")}
                        />
                          <span className="flex items-center px-4 cursor-pointer hover:text-indigo-500" onClick={() => setShow(!show)}>
                            <HiFingerPrint 
                                size={25}
                            />
                        </span>
                    </div>
                    {/* form password validation error message */}
                    { formik.errors.password && formik.touched.password && <span className="text-sm text-rose-500">{formik.errors.password}</span>}
                    <div className="input-button">
                        <button type="submit" className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className="input-button">
                        <button type="button" onClick={() => signIn('google',{ callbackUrl: "http://localhost:3000/" })} className={styles.button_custom}>
                            Sign In with Google 
                            <span>
                                <Image 
                                    src="/assets/google.svg"
                                    alt="google icon"
                                    width={20}
                                    height={20}
                                />
                            </span>
                        </button>
                    </div>
                    <div className="input-button"> 
                            <button type="button" onClick={() => signIn('github',{ callbackUrl: "http://localhost:3000/" })} className={styles.button_custom}>
                                Sign In with Github
                                <span>
                                <Image 
                                    src="/assets/github.svg"
                                    alt="github icon"
                                    width={20}
                                    height={20}
                                />
                            </span>
                            </button>
                    </div>
               </form>
               <p className="text-center text-gray-500">
                <span>Don&apos;t have an account yet?</span>  &nbsp;
                <Link className="text-blue-500" href={'/register'}>
                    Sign Up
                </Link>
               </p>
            </section>
        </ExternalLayout>
        </>
    )
}

export default Login;