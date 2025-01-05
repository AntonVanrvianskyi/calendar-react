import {CSSProperties, PropsWithChildren} from "react";
import './index.css'

type BackDropProps = PropsWithChildren

function Backdrop({children}: BackDropProps){
    return (
        <div className="modal-backdrop">
            {children}
        </div>
    )
}

interface ModalProps extends  PropsWithChildren{
    onClose?: () => void
    style?: CSSProperties
}

function  Modal({children, style}: ModalProps) {


    return (
        <Backdrop>
            <div style={style} className="modal-dialog">
                {children}
            </div>
        </Backdrop>
    )
}


export default  Modal


