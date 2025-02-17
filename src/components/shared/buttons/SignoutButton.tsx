import React from "react";
import {useRouter} from "next/router";
import Button from "@/components/shared/buttons/Button";
import {logout} from "@/redux/slices/auth";
import {MyThunkDispatch} from "@/redux/store";
import {useDispatch} from "react-redux";


function SignoutButton() {
    const router = useRouter();
    const dispatch: MyThunkDispatch = useDispatch();
    const handleGoSignin = async() => {
        try {
            await dispatch(logout())
        } catch(error : any) {
            alert(error);
        }
        router.push("/signin").then(r => {});
    }
    return (
        <div>
            <Button name="loginButton" onClick={handleGoSignin}>
                Signout
            </Button>
        </div>
    )
}

export default SignoutButton