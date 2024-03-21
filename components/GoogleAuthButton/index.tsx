import React from 'react'
import Image from 'next/image'

const GoogleAuthButton = () => {
    return (
        <button
            className="flex items-center justify-center  custom-slate-border p-2  bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full min-h-16  transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
            <Image src="/images/google-logo-icon.png" width="30" height="30" alt="" />
            <span className="ml-4">Sign in with Google</span>
        </button>
    )
}

export default GoogleAuthButton