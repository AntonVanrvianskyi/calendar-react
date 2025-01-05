
import './index.css'

interface Props {
    label: string;
    onClick: () => void;
    type?: "submit" | "reset" | "button";
}


function SecondaryButton({label, type = "submit", onClick}: Props) {

    return (
        <button
            className="btn-secondary"
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )

}


export default SecondaryButton;
