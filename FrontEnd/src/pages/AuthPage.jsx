import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


export default function AuthPage() {
  return (
    <>
        This is the AuthPage
      <SignInButton mode='modal'/>
      {
        console.log("Auth page is working")
      }
    </>
  )
}


