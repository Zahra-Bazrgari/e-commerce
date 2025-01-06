import { urls } from '@/utils/urls';
import { generateAxiosInstance } from './axiosInstance';
import { setUserInfo } from '@/utils/user-manager';


const updateUser = async (userId: string, updatedData: { phoneNumber: string; address: string }) => {
  try {
    const client = generateAxiosInstance();
    const response = await client.patch(`${urls.users}/${userId}`, updatedData);
    
    if (response.data.status === "success") {
      console.log("User updated successfully:", response.data.data.user);
      setUserInfo(response.data.data.user)
      return response.data.data.user;
    } else {
      console.log("Failed to update user:", response.data);
      throw new Error("Failed to update user.");
    }
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
};

export default updateUser;
