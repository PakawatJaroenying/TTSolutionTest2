import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import User from "./pages/User/User";
import { UserServiceProvider } from "./pages/User/Context/UserService";
import { ModalProvider } from "./pages/User/Context/ModalService";
import AppProvider from "./HOC/AppProvider";

function App() {
  return (
    <div className="App">
      <Navbar />
      <User />
    </div>
  );
}

export default AppProvider(App);
