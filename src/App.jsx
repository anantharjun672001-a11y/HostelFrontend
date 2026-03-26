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
import RoleRoute from "./components/RoleRoute";

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
import RoomEdit from "./pages/admin/RoomEdit";
import RoomDetails from "./pages/resident/RoomDetails";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <BrowserRouter>
        <Layout>
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>

            {/* DASHBOARD */}
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

            {/*  ADMIN ONLY  */}

            <Route
              path="/admin/create-bill"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin"]}>
                    <DashboardLayout>
                      <AdminCreateBill />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/revenue"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin"]}>
                    <DashboardLayout>
                      <RevenueReport />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/create-staff"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin"]}>
                    <DashboardLayout>
                      <CreateStaff />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/create-user"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin"]}>
                    <DashboardLayout>
                      <CreateUsers />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            {/*  ADMIN + STAFF  */}

            <Route
              path="/admin/rooms"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <Rooms />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms/create"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <CreateRoom />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms/assign"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <AssignRoom />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/rooms/edit/:id"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin","staff"]}>
                    <DashboardLayout>
                      <RoomEdit/>
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <Residents />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents/create"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <CreateResident />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/residents/edit/:id"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <EditResident />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/maintenance"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <AdminMaintenance />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/bills"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <Bills />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/payments"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["admin", "staff"]}>
                    <DashboardLayout>
                      <Payments />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            {/* RESIDENT  */}

            <Route
              path="/resident/rooms"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <AvailableRooms />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/room/:id"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <RoomDetails/>
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/my-room"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <MyRoom />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/maintenance/create"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <CreateMaintenance />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/maintenance"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <MyMaintenance />
                    </DashboardLayout>
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/resident/bills"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={["resident"]}>
                    <DashboardLayout>
                      <MyBills />
                    </DashboardLayout>
                  </RoleRoute>
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