import { ErrorMessage, useField } from 'formik'

interface Props {
    label: string,
    name: string,
    type?: 'text' | 'email' | 'password',
    placeholder?: string,
    [x: string]: any, //Este es un comodin que nos permite ingresar cualquier dato adicional
}

export const MyTextInput = ({ label, ...props }: Props) => {

  const [ field ] = useField(props);

  return (
    <>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
          htmlFor={ props.id || props.name }
          >
            { label }
        </label>
        <input 
          autoComplete='off'
          className="bg-gray-50 outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          { ...field } { ...props } 
        />
        <ErrorMessage name={ props.name } component='span' className='text-red-500' />
    </>
  )
}
