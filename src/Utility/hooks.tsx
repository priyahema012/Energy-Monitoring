import { useSelector } from "react-redux";
import { Failure, storeDataProps } from "../Types/reducer";
export const useToken = () => {
    return useSelector((state : storeDataProps) => state.auth.token)
}