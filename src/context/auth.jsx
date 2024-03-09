import { jwtDecode } from 'jwt-decode';
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';

export const AuthContext = createContext();

async function getDecodedToken(token) {
    try {
        return await jwtDecode(token);
    } catch (e) {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    async function updateToken(newToken) {
        localStorage.setItem('jwt', newToken);
        setToken(await getDecodedToken(newToken));
    }

    function removeToken() {
        localStorage.removeItem('jwt');
        setToken(null);
    }

    const refresh = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('something went wrong while refreshing token');
            }
            const jsonResponse = await response.json();
            const newToken = jsonResponse.accessToken;
            console.log('refreshing!');
            updateToken(newToken);
        } catch (e) {
            removeToken();
        }
    }, []);

    useEffect(() => {
        async function handleTokenChange() {
            const initialToken = localStorage.getItem('jwt');
            const decodedToken = await getDecodedToken(initialToken);
            setToken(decodedToken);
        }
        handleTokenChange();
    }, []);

    useEffect(() => {
        async function handleSetTimer() {
            if (!token) return;
            const expirationTime = token.exp * 1000 - Date.now();
            const expirationTimer = setTimeout(async () => {
                await refresh();
            }, expirationTime - 60000); // one minute before it expires
            return expirationTimer;
        }

        const timer = handleSetTimer();
        return () => clearTimeout(timer);
    }, [token, refresh]);

    const contextValue = useMemo(
        () => ({
            token,
            updateToken,
            removeToken
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
