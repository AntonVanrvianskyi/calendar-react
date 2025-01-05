
import './index.css'

interface Props {
    label: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
}


function ActionButton({label, type = "submit", onClick}: Props) {

    return (
        <button
            className="btn-action"
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )

}


export default ActionButton;
