// Utility functions to check for dashboard authentication
// The dashboard stores auth_token in a cookie with domain .keverd.com
// This allows us to check if the user has an active dashboard session

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  
  // Try to get cookie from document.cookie
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'auth_token') {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

export function getTenantName(): string | null {
  if (typeof window === "undefined") return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'tenant_name') {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

