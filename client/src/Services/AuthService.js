const AuthService = {
    login: (user) => {
        return fetch("/auth/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 401 && res.satus !== 400)
                return res.json().then((data) => data);
            else
                return {
                    isAuthenticated: false,
                    user: { uid: "", firstName: "", email: "" },
                };
        });
    },
    register: (user) => {
        return fetch("/auth/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data);
    },
    logout: () => {
        return fetch("auth/logout")
            .then((res) => res.json())
            .then((data) => data);
    },
    isAuthenticated: () => {
        return fetch("/auth/authenticated").then((res) => {
            if (res.status !== 401 && res.status !== 400) {
                return res.json().then((data) => data);
            } else {
                return {
                    isAuthenticated: false,
                    user: { uid: "", firstName: "", email: "" },
                };
            }
        });
    },
};
export default AuthService;
