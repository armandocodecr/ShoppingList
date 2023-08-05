import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";

import { addItemInDB } from "@/app/database/dbItems";

import { useCategory } from "@/app/hooks/useCategory";
import { useItems } from "@/app/hooks";

import { ButtonComponent } from "../UI";
import { MyTextInput } from "./TextInput";

export function FormikAddItemComponent() {

    const { categoryStore, selectCategory, onCloseAddItemMenu, handleSelectChange } = useCategory() 
    const { getAllItems } = useItems()

    return (
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const newItem = await addItemInDB(selectCategory, values.name);
          if (!newItem.ok) {
            toast.error("Ha ocurrido un problema al guardar el item");
            return;
          }
          await getAllItems();
          toast.success("Item guardado correctamente");
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
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="categorys"
                onChange={handleSelectChange}
                value={selectCategory}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option className="text-slate-50" selected>
                  Enter a category
                </option>
                {categoryStore &&
                  categoryStore.map((category) => (
                    <option
                      className="text-slate-50"
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
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
