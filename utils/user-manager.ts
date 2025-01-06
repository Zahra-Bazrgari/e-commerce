import { IUser } from '@/types/auth.types';

export function setUserInfo(
  props: IUser
) {
  const userInfo = {
    userId: props._id,
    firstname: props.firstname,
    lastname: props.lastname,
    phoneNumber: props.phoneNumber,
    address: props.address
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getUserInfo() {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    console.log("No user info found.");
    return null;
  }
}

export function deleteUserInfo() {
  localStorage.removeItem("userInfo");
  console.log("User info deleted successfully!");
}
