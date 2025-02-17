import React from "react";
import SubmitButton from "@/components/shared/buttons/SubmitButton";

interface Props {
    children?: JSX.Element|JSX.Element[]|string;
    onSubmit : () => void
    onRedirect : () => void
    onClick : () => void
    topText : string
    redirectText : string
    buttonText : string
    buttonName : string
}

function FormWithLabel({children, onSubmit, onRedirect, onClick, topText, redirectText, buttonText, buttonName} : Props) {
    return (
        <form onSubmit={onSubmit}>
            <p>{topText}</p>
            {children}
            <SubmitButton name={buttonName} onClick={onClick}>{buttonText}</SubmitButton>
            <div onClick={onRedirect}>
                {redirectText}
            </div>
        </form>
    )
}

export default FormWithLabel




