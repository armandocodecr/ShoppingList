import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";

import { useCategory } from "@/app/hooks/useCategory";

import { ButtonComponent } from "../UI";
import { MyTextInput } from "./TextInput";
import { addCategoryInDB } from "@/app/database/dbCategorys";

export function FormikAddCategoryComponent() {

    const { onCloseAddItemMenu, getAllCategorys } = useCategory() 

    return (
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const newItem = await addCategoryInDB( values.name );
          if (!newItem.ok) {
            toast.error("Ha ocurrido un problema al guardar la categoria");
            return;
          }
          await getAllCategorys();
          toast.success("Categoria guardada correctamente");
          resetForm()
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Debe tener más de 2 caractéres")
            .required("Requerido"),
        })}
      >
        {() => (
          <Form noValidate className="space-y-4 md:space-y-6 self-start">
            <div>
              <MyTextInput name="name" label="Name" placeholder="Enter a name" />
            </div>
                    
            <ButtonComponent
              typeButton="button"
              text="Cancel"
              onClickFunction={onCloseAddItemMenu}
              className="bg-[#0F172A] px-4 py-2 text-slate-50 rounded-lg"
            />
    
            <ButtonComponent
              typeButton="submit"
              text="Save"
              className="bg-[#233661] px-4 py-2 text-slate-50 rounded-lg ml-6"
            />
          </Form>
        )}
      </Formik>
    );
}
