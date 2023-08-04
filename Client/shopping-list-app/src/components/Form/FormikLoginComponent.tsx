'use client'
import { useRouter } from 'next/navigation';
import { Formik, Form } from "formik";

import { toast } from "sonner";
import * as Yup from 'yup'
import Cookies from 'js-cookie';

import { MyTextInput, ButtonForm } from "../Form";

import { Signin } from "@/app/database/dbAuth";
import { ISignInData } from "@/app/interface/AuthInterfaces";

export function FormikLoginComponent() {

    const { push } = useRouter()

    return(
        <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values: ISignInData) => {
                const result = await Signin(values);
      
                if (!result.ok) {
                  return toast.error(result.data);
                }
                localStorage.setItem('token', result.data.login.token)
                Cookies.set('token', result.data.login.token)
                toast.success("Te has logueado correctamente");
                push("/shoppinglist")
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Revise el formato del correo.")
                  .required("Requerido"),
                password: Yup.string()
                  .min(6, "Debe tener más de 6 caractéres")
                  .required("Requerido"),
              })}
            >
              {({ handleReset }) => (
                <Form noValidate className="space-y-4 md:space-y-6">
                  <div>
                    <MyTextInput
                      name="email"
                      label="Your email"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <MyTextInput
                      name="password"
                      label="Password"
                      placeholder="••••••••"
                    />
                  </div>
      
                  <ButtonForm
                    typeButton="submit"
                    text="Sign in your account"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  You don't have an account?{" "}
                    <a
                      href="/register"
                      className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
    )
    
}