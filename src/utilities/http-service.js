// import axios from "axios";

// const query = (data) => {
//   return axios.post(`http://localhost:3000/graphql`, data);
// };

// export default { query: query };

export const GRAPHQL_API = `http://localhost:3000/graphql`;

export const GET_USERS_QUERY = `
query{
    userdemo{
      userName,email,gender
    }
  }
`;
