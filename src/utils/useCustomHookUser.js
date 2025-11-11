import { useSelector } from "react-redux";

export const useCustomHookUser = () => {
    // el slice de usuarios guarda { list, loading, error }
    const usersList = useSelector((state) => state.userSlice.list || []);

    const transformIdToName = (userId) => {
        if (!usersList || usersList.length === 0) return null;
        // soportar tanto _id como id y comparar como strings
        const user = usersList.find((u) => String(u._id) === String(userId) || String(u.id) === String(userId));
        // devolver campos alternativos si name no existe
        return user?.name || user?.username || (user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : null);
    };

    return transformIdToName;
};