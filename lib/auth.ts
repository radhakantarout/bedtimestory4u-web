export function saveSession(session: any) {
  const idToken = session.getIdToken().getJwtToken();
  const refreshToken = session.getRefreshToken().getToken();

  localStorage.setItem("idToken", idToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("idToken")
    : null;
}

export function logout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
}