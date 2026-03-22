import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import AdminCreateBill from "./pages/AdminCreateBill";
import Rooms from "./pages/admin/Rooms";
import CreateRoom from "./pages/admin/CreateRoom";
import AssignRoom from "./pages/admin/AssignRoom";

import AvailableRooms from "./pages/resident/AvailableRooms";
import MyRoom from "./pages/resident/MyRoom";

import CreateResident from "./pages/admin/CreateResident";
import Residents from "./pages/admin/Residents";
import EditResident from "./pages/admin/EditResident";

import CreateMaintenance from "./pages/resident/CreateMaintenance";
import MyMaintenance from "./pages/resident/MyMaintenance";
import AdminMaintenance from "./pages/admin/AdminMaintenance";

import MyBills from "./pages/resident/MyBills";
import Bills from "./pages/admin/Bills";
import Payments from "./pages/admin/Payments";
import RevenueReport from "./pages/admin/RevenueReport";

import CreateStaff from "./pages/admin/CreateStaff";
import CreateUsers from "./pages/admin/CreateUsers";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <BrowserRouter>
        <Layout>
          <Routes>

            {/*  PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* DASHBOARD MAIN */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin/create-bill"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <AdminCreateBill />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Rooms />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms/create"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <CreateRoom />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms/assign"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <AssignRoom />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Residents />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents/create"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <CreateResident />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents/edit/:id"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <EditResident />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/maintenance"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <AdminMaintenance />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/bills"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Bills />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/payments"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Payments />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/revenue"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <RevenueReport />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/create-staff"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <CreateStaff />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/create-user"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <CreateUsers />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* 🔵 RESIDENT ROUTES */}
            <Route
              path="/resident/rooms"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <AvailableRooms />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/my-room"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <MyRoom />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/maintenance/create"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <CreateMaintenance />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/maintenance"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <MyMaintenance />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/bills"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <MyBills />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;