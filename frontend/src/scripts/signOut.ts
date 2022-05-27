
export default function signOut() {
    window.localStorage.removeItem("token");
    window.location.reload();
}