import { useSelector } from "react-redux";

export const useCustomHookUser = () => {


    const usersList = useSelector((state) => state.userSlice.userSlice);


    const transformIdToName = (userId) => {
        const user = usersList.find((user) => user.id == userId);
        return user?.name;
    };

    return transformIdToName;
};