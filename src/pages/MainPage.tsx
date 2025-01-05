import Calendar from "@/components/calendar";
import Modal from "@/designSystem/interactions/Modal";
import ActionButton from "@/designSystem/interactions/ActionButton";
import InputField from "@/designSystem/forms/InputField";
import SelectField from "@/designSystem/forms/SelectField";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    event: string
    priority: string
}

const options = [
    {
        value: "High"
    },
    {
        value: "Low"
    },
    {
        value: "Medium"
    }
]

function MainPage() {
    const methods = useForm<Inputs>()
    const {handleSubmit} = methods
    const onSubmit: SubmitHandler<Inputs> = (values) => {
        console.log(values)
    }
    return (
        <>
            <Calendar/>
            <Modal>
                <FormProvider {...methods} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField label="Event Name:" name="event"/>
                        <SelectField label="Choose priority:" name="priority" options={options} />
                        <ActionButton label="Add event"/>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

export default MainPage
