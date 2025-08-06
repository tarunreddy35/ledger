import { SignIn } from '@clerk/clerk-react'

export default function Login() {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <SignIn redirectUrl="/home" signUpUrl='/signup' />
            </div>
        </>
    )
}
