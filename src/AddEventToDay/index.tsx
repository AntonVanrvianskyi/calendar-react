import Modal from "@/designSystem/interactions/Modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import InputField from "@/designSystem/forms/InputField";
import SelectField from "@/designSystem/forms/SelectField";
import ActionButton from "@/designSystem/interactions/ActionButton";
import CloseIcon from "@/designSystem/icons";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";

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

function AddEventToDay() {

    const {setContextEventModal, setEvents, eventModalContext: {isOpen, payload}} = useEventStore()
    const methods = useForm<Inputs>()
    const {handleSubmit} = methods
    const onSubmit: SubmitHandler<Inputs> = (values) => {
        setEvents({...values, id: payload})
    }

    const onCloseModal = () => {
        setContextEventModal({isOpen: false, payload: ""})
    }

    return (
        <>
            {
                isOpen &&
                <Modal>
                    <button
                        onClick={onCloseModal}
                    >
                        <CloseIcon/>
                    </button>
                    <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputField label="Event Name:" name="event"/>
                            <SelectField label="Choose priority:" name="priority" options={options}/>
                            <ActionButton label="Add event"/>
                        </form>
                    </FormProvider>
                </Modal>
            }
            {
                !isOpen && null
            }
        </>
    )
}

export default AddEventToDay
