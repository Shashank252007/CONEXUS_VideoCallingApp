import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import HomePage from './pages/HomePage.jsx';
import { Routes , Route , Navigate } from 'react-router';
import AuthPage from './pages/AuthPage.jsx';

export default function App() {
  return (
  <>
    <SignedIn>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Navigate to={"/"} replace />} />
      </Routes>
    </SignedIn>

    <SignedOut>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to={"/auth"} replace />} />
      </Routes>
    </SignedOut>
  </>
);
};
