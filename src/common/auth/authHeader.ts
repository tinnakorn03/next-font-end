 

export const useAuthHeader = (token: string | null): { Authorization: string } | {} => {  
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else { 
    return {};  
  }
} 

