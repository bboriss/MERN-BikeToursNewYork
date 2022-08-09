import http from "../http-common";

class ToursDataService {
  getAll(page) {
    return http.get(`tours?page=${page}`);
  }

  getById(id, config) {
    return http.get(`/tours/${id}`, config);
  }

  login(credentials) {
    return http.post(`/users/auth/login`, credentials);
  }

  findByStartLocation(query, page) {
    return http.get(
      `tours/searchByStartLocation?start%20station%20name=${query}&page=${page}`
    );
  }
}

export default new ToursDataService();
