import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth)

export function login(role) {
    if (role) {
        return {
            login: user.login,
            parol: user.parol,
            access_token: user.name,
            role: user.role,
            location: user.location,
        };   
    }
    else {
        throw Error('user not found');
    }
}