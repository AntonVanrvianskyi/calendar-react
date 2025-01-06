
import './index.css'

interface Props {
    label: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
}


function ActionButton({label, disabled, type = "submit", onClick}: Props) {

    return (
        <button
            disabled={disabled}
            className="btn-action"
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )

}


export default ActionButton;
