import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    setRefreshToken();
  }, timeLeft);
};

// ----------------------------------------------------------------------

// Xử lý lưu token vào local storage
export const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken && refreshToken) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

// Xử lý refresh token
export const setRefreshToken = async () => {
  const token = sessionStorage.getItem('refreshToken');

  if (token) {
    const response = await axios.post(endpoints.auth.refreshToken, {
      token,
    });
    const { accessToken, refreshToken } = response.data;
    setSession(accessToken, refreshToken);
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
