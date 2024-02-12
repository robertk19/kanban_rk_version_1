const useUsers = () => {
  return useApi("http:/localhost:8080/api/users");
};
export default useUsers;
