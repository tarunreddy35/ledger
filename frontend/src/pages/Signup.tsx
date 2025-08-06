import { SignUp } from '@clerk/clerk-react';

export default function Signup() {
    return (
        <div className="flex h-screen items-center justify-center">
            <SignUp redirectUrl="/home" signInUrl='/' />
        </div>
    );
}
