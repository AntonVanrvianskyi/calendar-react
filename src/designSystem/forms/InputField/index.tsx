import './index.css'
import {useFormContext} from "react-hook-form";


interface InputFieldProps {
    label: string
    placeholder?: string
    name: string
    required?: boolean
}


function InputField({label, name, required = true, placeholder}: InputFieldProps) {
    const {register} = useFormContext()
    return (
        <>
            <label>
                {label}
                <input {...register(name, {required})} name={name} placeholder={placeholder}/>
            </label>
        </>
    )
}

export default InputField;
