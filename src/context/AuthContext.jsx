import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  authenticateCredentials, 
  decryptSessionToken, 
  SESSION_STORAGE_KEY, 
  LOCAL_STORAGE_KEY 
} from '../utils/cryptoAuth';

const AuthContext = createContext(null);

function getInitialSession() {
  if (typeof window === 'undefined') {
    return { user: null, isAuthenticated: false };
  }
  try {
    const sessionToken = sessionStorage.getItem(SESSION_STORAGE_KEY) || 
                         localStorage.getItem(LOCAL_STORAGE_KEY);

    if (sessionToken) {
      const decryptedUser = decryptSessionToken(sessionToken);
      if (decryptedUser) {
        return { user: decryptedUser, isAuthenticated: true };
      }
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Session retrieval error:', err);
  }
  return { user: null, isAuthenticated: false };
}

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(getInitialSession);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Login handler
  const login = async (username, password, rememberMe = false) => {
    if (lockoutRemaining > 0) {
      return {
        success: false,
        error: `Security Lockout active due to multiple failed attempts. Please wait ${lockoutRemaining} seconds.`
      };
    }

    const authResult = await authenticateCredentials(username, password);

    if (authResult.success) {
      setSession({
        user: authResult.user,
        isAuthenticated: true
      });
      setFailedAttempts(0);
      setLockoutRemaining(0);

      // Save encrypted session token
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, authResult.token);
        if (rememberMe) {
          localStorage.setItem(LOCAL_STORAGE_KEY, authResult.token);
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to store session token:', e);
      }

      return { success: true };
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      // Brute-force protection: Lock out for 30s after 5 failed attempts
      if (newAttempts >= 5) {
        setLockoutRemaining(30);
        const timer = setInterval(() => {
          setLockoutRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      return {
        success: false,
        error: authResult.error
      };
    }
  };

  // Logout handler
  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
    setSession({ user: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: session.isAuthenticated,
        currentUser: session.user,
        login,
        logout,
        failedAttempts,
        isLockedOut: lockoutRemaining > 0,
        lockoutSecondsRemaining: lockoutRemaining
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
