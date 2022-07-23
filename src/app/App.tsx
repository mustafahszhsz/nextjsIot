import React, { Suspense, useEffect } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PageLogout } from '@/app/auth-archive/PageLogout';
import { LoginScreen } from '@/app/auth/LoginScreen';
import { Layout, Loader } from '@/app/layout';
import {
  AdminRouteGuard,
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/app/router/guards';
import { Error404, ErrorBoundary } from '@/errors';

import { EditUserProfileScrollMenu } from '../components/scroll-view/EditUserProfileScrollMenu';
import { HomeScreen } from './home/HomeScreen';

const AdminRoutes = React.lazy(() => import('@/app/admin/AdminRoutes'));
const AccountRoutes = React.lazy(() => import('@/app/account/AccountRoutes'));
const DashboardRoutes = React.lazy(
  () => import('@/app/dashboard/DashboardRoutes')
);
let socket;

export const App = () => {
  // useEffect(() => {
  //   // const socketInitializer = async () => {
  //   //   await fetch('/service/api/socket');
  //   //   socket = io();

  //   //   socket.on('connect', () => {
  //   //     console.log('connectedDDDDDDDDD');
  //   //   });
  //   // };
  //   // socketInitializer();
  //   const fetchData = async () => {
  //     await fetch('/api/socket/socket');
  //     await console.log(await fetch('/api/socket/socket'));

  //     socket = io();
  //     socket.on('connect', () => {
  //       console.log('connectedDDDDDDDDD');
  //     });
  //   };

  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, []);
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/homePage" replace />} />

              <Route
                path="homePage"
                element={
                  <PublicOnlyRouteGuard>
                    <HomeScreen />
                  </PublicOnlyRouteGuard>
                }
              />
              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <LoginScreen />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path="logout"
                element={
                  <ErrorBoundary>
                    <PageLogout />
                  </ErrorBoundary>
                }
              />

              <Route
                path="editUserProfile"
                element={
                  <PublicOnlyRouteGuard>
                    <EditUserProfileScrollMenu />
                  </PublicOnlyRouteGuard>
                }
              />
              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="dashboard/*"
                element={
                  <AuthenticatedRouteGuard>
                    <DashboardRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AdminRouteGuard>
                    <AdminRoutes />
                  </AdminRouteGuard>
                }
              />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
