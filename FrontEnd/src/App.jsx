import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import HomePage from './pages/HomePage.jsx';
import { Routes , Route , Navigate } from 'react-router';
import AuthPage from './pages/AuthPage.jsx';
import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

export default function App() {
  return (
  <>
    <SignedIn>
      <SentryRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Navigate to={"/"} replace />} />
      </SentryRoutes>
    </SignedIn>

    <SignedOut>
       <SentryRoutes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to={"/auth"} replace />} />
      </SentryRoutes>
    </SignedOut>
  </>
);
};
