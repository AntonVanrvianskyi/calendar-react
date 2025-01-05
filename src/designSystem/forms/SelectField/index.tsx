import './index.css'
import {useFormContext} from "react-hook-form";

interface SelectFieldProps {
    options: { value: string }[];
    label: string
    name: string
    defaultValue?: string
}

function SelectField({label, defaultValue, options, name}: SelectFieldProps) {
    const {register} = useFormContext()
    return (
        <>
            <label>
                {label}
                <select defaultValue={defaultValue || options[0].value} {...register(name)}>
                    {
                        options.map(option => (
                            <option key={option.value} value={option.value}>{option.value}</option>
                        ))
                    }
                </select>
            </label>
        </>
    )
}

export default SelectField;
