import React from "react";
import {useRouter} from "next/router";


function LoginButton() {
    const router = useRouter();
    const handleGoHome = () => {
        router.push("/help/about").then(r => {});
    }
    return (
        <div>
            <button className="loginButton" onClick={handleGoHome}>
                About
            </button>
        </div>
    )
}

export default LoginButton