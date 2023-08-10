import React from "react";
import { ModalProvider } from "../pages/User/Context/ModalService";
import { UserServiceProvider } from "../pages/User/Context/UserService";

function AppProvider(WrappedComponent: React.FC) {
  return function AppProvider(props: any) {
    return (
      <div>
        <ModalProvider>
          <UserServiceProvider>
            <WrappedComponent {...props} />
          </UserServiceProvider>
        </ModalProvider>
      </div>
    );
  };
  //   return ();
}

export default AppProvider;
