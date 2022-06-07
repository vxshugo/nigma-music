import React from "react";
import "./index.css"


const Modal = ({active, setActive}) => {
    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <h1 className="fontH1">Alert - Site Version</h1>
                <h4 className="font">Beta version 1.0 Nigma Music, Если будут проблемы пишите - vxshugo#5809 ; unkillablez#4507; JolyGolden#5999</h4>

                <br/>
                <h4 className="font">
                    Данная версия предназначена только для компьютеров
                </h4>
            </div>
        </div>
    )
}

export default Modal