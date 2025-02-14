import Modal from "@/designSystem/interactions/Modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import InputField from "@/designSystem/forms/InputField";
import SelectField from "@/designSystem/forms/SelectField";
import ActionButton from "@/designSystem/interactions/ActionButton";
import {CloseIcon} from "@/designSystem/icons";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import './index.css'
import {useCallback, useEffect} from "react";

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

    const {
        setContextEventModal,
        setUpdateEvent,
        setEvents,
        eventModalContext: {isOpen, payload, id, editEvent, type}
    } = useEventStore()
    const methods = useForm<Inputs>()
    const {handleSubmit, reset, setValue, formState: {isValid}} = methods
    const isCreate = type === "add"

    const initializeForm = useCallback(() => {
        if (editEvent) {
            setValue("event", editEvent.event);
            setValue("priority", editEvent.priority);
        } else {
            reset();
        }
    }, [editEvent, setValue, reset]);

    useEffect(() => {
        if (isOpen) {
            initializeForm();
        }
    }, [isOpen, initializeForm])

    const onSubmit: SubmitHandler<Inputs> = (values) => {
        if (isCreate) {
            setEvents({...values, id: new Date().getTime(), day: payload});
        } else {
            setUpdateEvent({...values, id});
        }
        reset();
        setContextEventModal({isOpen: false});
    };

    const onCloseModal = () => {
        setContextEventModal({isOpen: false})
    }

    const titleModal = isCreate ? "Create event" : "Edit event"

    return (
        <>
            {
                isOpen &&
                <Modal>
                    <div className="header-modal">
                        <h4>
                            {titleModal}
                        </h4>
                        <button
                            className="btn-close"
                            onClick={onCloseModal}
                        >
                            <CloseIcon/>
                        </button>
                    </div>
                    <FormProvider {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputField label="Event Name:" name="event"/>
                            <SelectField label="Choose priority:" name="priority" options={options}/>
                            <ActionButton label={isCreate ? "Add Event" : "Save Changes"} disabled={!isValid}/>
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
