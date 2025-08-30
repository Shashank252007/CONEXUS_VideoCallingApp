import React from 'react';
import { useAuth} from '@clerk/clerk-react';
import HomePage from './pages/HomePage.jsx';
import { Routes , Route , Navigate } from 'react-router';
import AuthPage from './pages/AuthPage.jsx';
import * as Sentry from "@sentry/react";
import CallPage from './pages/CallPage.jsx';
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

export default function App() {

  const {isSignedIn , isLoaded} = useAuth();

  if(!isLoaded) return null;

  return (
  <>
      <SentryRoutes>
        <Route path="/"  element={ isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />
        <Route path="/auth" element={isSignedIn ? <Navigate to={"/"} replace /> : <AuthPage/>} />

        <Route path='/call/:id' element ={isSignedIn ? <CallPage/> : <Navigate to={"/auth"} replace />} />

        <Route path="*" element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />} />
      </SentryRoutes>
  </>
);
};
