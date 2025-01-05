import './index.css'
import {useFormContext} from "react-hook-form";


interface InputFieldProps {
    label: string
    placeholder?: string
    // register: UseFormRegister<Record<string, string>>
    name: string
}


function InputField({label, name, placeholder}: InputFieldProps) {
    const {register} = useFormContext()
    return (
        <>
            <label>
                {label}
                <input {...register(name)} name={name} placeholder={placeholder}/>
            </label>
        </>
    )
}

export default InputField;
