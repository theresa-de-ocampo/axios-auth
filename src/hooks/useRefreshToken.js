import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    async function refresh() {
        const response = await axios.get("/auth/refresh", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${auth.jwt}`
            }
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.jwt);
            return { ...prev, jwt: response.data.jwt }
        });
        
        return response.data.accessToken;
    }

    return refresh;
}
