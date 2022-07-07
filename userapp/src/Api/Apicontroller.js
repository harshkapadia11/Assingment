import { api } from "./BaseURL";

export const getUsers = async () => {
  let userList;
  const res = await api.get("/");
  userList = res.data;
  return userList;
};

export const deleteUser = async (id) => {
  const del = await api.delete(`/${id}`);
  return del;
};

export const Retrievesingleuser = async (id) => {
  let user;
  const result = await api.get(`/${id}`);
  user = result.data;
  return user;
};
export const Updateuser = async (id, data) => {
  let final = JSON.stringify(data);
  const result = await api.put(`/${id}`, final);
  return result;
};

// export const getPost = async id => {
//   let postList;
//   const res = await api.get(`/users/${id}/posts`);
//   postList = res.data.data;
//   return postList;
// };

// export const getComment = async id => {
//   let coList;
//   const res = await api.get(`/posts/${id}/comments`);
//   coList = res.data.data;
//   return coList;
// };

export const adduser = async (data) => {
  const final = JSON.stringify(data);
  const res = await api.post(`/`, final);
  console.log(res);
  return res;
};
