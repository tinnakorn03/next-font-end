 

// const token = localStorage.getItem('userToken');
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJzdHJpbmciLCJpbWciOiJzdHJpbmciLCJsYXN0TmFtZSI6InN0cmluZyIsIm1vYmlsZSI6InN0cmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJFhWVUVxaDdldi45ZU5KaEsvb2YyeXVHYk9oVjB2RXlBV0djYy5kcWxQNkpKaUpNMnp6YUlDIiwidXNlcklkIjoiMjAyMzA4NTg2Mzk2NTMifQ.txxwQfgEi_b8AuUsV7i_NFlfxPKftW3jkLHVd_c5908'
export const useAuthHeader = (): { Authorization: string } | {} => {  
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else { 
    return {};  
  }
} 

