'use client'
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";

import { toast } from "sonner";
import * as Yup from "yup"
import Cookies from "js-cookie";

import { MyTextInput, ButtonForm } from "../Form";

import { Signin } from "@/app/database/dbAuth";
import { ISignInData } from "@/app/interface/AuthInterfaces";
import { useList, useUI } from "@/app/hooks";

export function FormikLoginComponent() {

    const { push } = useRouter()
    const { updateHistoryMenuState } = useUI()
    const { updateState } = useList()

    const restartStates = () => {
      localStorage.removeItem('currentUIMenu')
      localStorage.removeItem('currentList')
      updateHistoryMenuState(false)
      updateState([])
    }

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
                restartStates()
                Cookies.set("token", result.data.login.token)
                toast.success("You are logged in correctly");
                push("/shoppinglist")
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Check the format of the mail.")
                  .required("Required"),
                password: Yup.string()
                  .min(6, "Must have more than 6 characters")
                  .required("Required"),
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
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="••••••••"
                    />
                  </div>
      
                  <ButtonForm
                    typeButton="submit"
                    text="Sign in your account"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  You don&apos;t have an account?{" "}
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