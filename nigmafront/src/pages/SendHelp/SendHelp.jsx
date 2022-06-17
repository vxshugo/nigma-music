import React from "react";
import {useTranslation} from "react-i18next";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

const SendHelp = () => {
    const {t} = useTranslation()

    return(
        <div style={{display: 'flex',flexDirection: "column",justifyContent: 'center', alignItems: "center", fontSize: 28,}}>
            <h1>{t("mainApp.help.text")}</h1>
            <h3>vxshugo@gmail.com</h3>
            <Link to="/">
                <Button
                    label="BACK NIGMA"
                    style={{ color: "#fff", width: "18rem", fontSize: "1.4rem" }}
                />
            </Link>
        </div>
    )
}

export default SendHelp
