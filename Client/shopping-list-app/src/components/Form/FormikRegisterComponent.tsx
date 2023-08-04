'use client'
import { useRouter } from 'next/navigation';
import { Form, Formik } from "formik";

import { ButtonForm, MyTextInput } from "../Form";

import * as Yup from 'yup'
import { toast } from "sonner";
import Cookies from 'js-cookie';

import { Signup } from "@/app/database/dbAuth";
import { ISignUpData } from "@/app/interface/AuthInterfaces";

export function FormikRegisterComponent() {

    const { push } = useRouter()
    
    return(
        <Formik
      
        initialValues={{
            username: '',
            email: '',
            password: '',
        }}
        onSubmit={ async(values: ISignUpData) => {
          const result = await Signup(values)
          
          if( !result.ok ){
            return toast.error('Ocurrió un error al crear la cuenta')
          }
          localStorage.setItem('token', result.data.login.token)
          Cookies.set('token', result.data.login.token)
          toast.success('Cuenta creada con éxito')
          push('/')
        }}
        validationSchema={
            Yup.object({
                username: Yup.string()
                            .min(4, 'Debe tener más de 4 caractéres')
                            .required('Requerido'),
                email: Yup.string()
                            .email('Revise el formato del correo.')
                            .required('Requerido'),
                password: Yup.string()
                            .min(6, 'Debe tener más de 6 caractéres')
                            .required('Requerido'),
            })
        }
        >
        {
            ({ handleReset }) => (
              <Form noValidate className="space-y-4 md:space-y-6">
                <div>
                  <MyTextInput 
                    name='username' 
                    label='Username'
                    placeholder='John Smith.'
                  />
                </div>
                <div>
                  <MyTextInput 
                    name='email' 
                    label='Your email'
                    placeholder='name@company.com'
                  />
                </div>
                <div>
                  <MyTextInput 
                    name='password' 
                    label='Password'
                    placeholder="••••••••"
                  />
                </div>
    
                <ButtonForm
                  typeButton="submit"
                  text="Sign in your account"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  You have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </Form>
            )
        }
    </Formik>
        
    )

}