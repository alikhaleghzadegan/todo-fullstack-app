
import * as React from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
    const [user, setUser] = useLocalStorage("user", null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}