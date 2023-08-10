import { RequestUser } from "../Interface/RequestUser";
import { PostUser } from "../Interface/PostUser";
import { FunctionComponent, createContext, useContext } from "react";
import { UserService } from "../Interface/UserService";
import { showConfirmDialog } from "../../../utils/SweetalertComfirmDialog";

// Create a context for the user service
const UserServiceContext = createContext<UserService>({} as UserService);

interface UserServiceProviderProps {
  children: React.ReactNode;
}

// User Service Provider component
const UserServiceProvider: FunctionComponent<UserServiceProviderProps> = ({
  children,
}: UserServiceProviderProps) => {
  const apiEndpoint = "https://localhost:7086/api/User";

  const getAllUser = async (): Promise<RequestUser[]> => {
    try {
      const res = await fetch(`${apiEndpoint}`);
      const data: RequestUser[] = await res.json();
      return data;
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };

  const getUserById = async (id: string): Promise<RequestUser> => {
    const res = await fetch(`${apiEndpoint}/${id}`);
    const data: RequestUser = await res.json();
    return data;
  };

  const createUser = async (data: PostUser) => {
    try {
      const res = await fetch(`${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error: any) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  const updateUser = async (id: string, data: any) => {
    const res = await fetch(`${apiEndpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return res;
  };

  const deleteUser = async (id: string) => {
    await fetch(`${apiEndpoint}/${id}`, {
      method: "DELETE",
    });
  };

  // Create an object with the user service functions
  const userService = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };

  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
};

// Custom hook to access the user service context
const useUserService = () => useContext(UserServiceContext);

export { useUserService, UserServiceProvider };
