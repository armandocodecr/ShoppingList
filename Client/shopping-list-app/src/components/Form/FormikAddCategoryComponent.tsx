import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";

import { useCategory } from "@/app/hooks/useCategory";

import { ButtonComponent } from "../UI";
import { MyTextInput } from "./TextInput";
import { addCategoryInDB } from "@/app/database/dbCategorys";
import { useUI } from "@/app/hooks";

export function FormikAddCategoryComponent() {

    const { getAllCategorys } = useCategory()
    const { updateCategoryUIState } = useUI()

    return (
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const newItem = await addCategoryInDB( values.name );
          if (!newItem.ok) {
            toast.error("A problem occurred while saving the category");
            return;
          }
          await getAllCategorys();
          toast.success("Category saved correct");
          resetForm()
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must have more than 2 characters")
            .required("Required"),
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
              onClickFunction={() => updateCategoryUIState(false)}
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
