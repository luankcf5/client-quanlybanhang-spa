'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_ACCESS_TOKEN_KEY = 'accessToken';
const STORAGE_REFRESH_TOKEN_KEY = 'refreshToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
      const refreshToken = sessionStorage.getItem(STORAGE_REFRESH_TOKEN_KEY);

      if (accessToken) {
        // if (accessToken && isValidToken(accessToken)) {
        // setSession(accessToken, refreshToken);

        // const res = await axios.get(endpoints.auth.me);

        const res = {
          data: {
            accessToken: '5423432',
            refreshToken: 'gfdgdfg',
            user: {
              username: 'user01',
              profile: {
                name: 'Trần Minh Luân',
              },
            },
          },
        };

        const user = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string) => {
    // const data = {
    //   username,
    //   password,
    // };

    // const res = await axios.post(endpoints.auth.login, data);

    const res = {
      data: {
        accessToken: '5423432',
        refreshToken: 'gfdgdfg',
        user: {
          username: 'user01',
          profile: {
            name: 'Trần Minh Luân',
          },
        },
      },
    };

    const { accessToken, refreshToken, user } = res.data;

    // setSession(accessToken, refreshToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
          role: 'teacher',
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (username: string, password: string, name: string, type: string) => {
      const data = {
        username,
        password,
        name,
      };

      await axios.post(endpoints.auth.register, data);

      // await sessionStorage.setItem(STORAGE_ROLE_KEY, type);

      // const { accessToken, refreshToken, user } = res.data;

      // sessionStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, accessToken);
      // sessionStorage.setItem(STORAGE_REFRESH_TOKEN_KEY, refreshToken);

      // dispatch({
      //   type: Types.REGISTER,
      //   payload: {
      //     user: {
      //       ...user,
      //       accessToken,
      //     },
      //   },
      // });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null, null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
