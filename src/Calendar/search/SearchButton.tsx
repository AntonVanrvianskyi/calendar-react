import './index.css'
import {SearchIcon} from "@/designSystem/icons";

interface ButtonProps {
    onClick: () => void;
}


function SearchButton({ onClick }: ButtonProps) {


    return (
        <button onClick={onClick} className="btn-search">
            <SearchIcon/>
            Search
        </button>
    )
}


export default SearchButton;
