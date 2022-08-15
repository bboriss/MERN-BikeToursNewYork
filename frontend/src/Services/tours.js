import http from "../http-common";

class ToursDataService {
  getAll(page) {
    return http.get(`tours?page=${page}`);
  }

  getById(id, config) {
    return http.get(`/tours/${id}`, config);
  }

  register(credentials) {
    return http.post(`/users/auth/register`, credentials);
  }

  login(credentials) {
    return http.post(`/users/auth/login`, credentials);
  }

  logout() {
    return http.post(`/users/auth/logout`);
  }

  searchByStartLocation(query, page) {
    return http.get(
      `tours/searchByStartLocation?start%20station%20name=${query}&page=${page}`
    );
  }

  sortByDuration(page, parameter) {
    if (parameter === "shorter") {
      const sign = "+";
      return http.get(`tours/sortByDuration?sort=${sign}&page=${page}`);
    }
    if (parameter === "longer") {
      const sign = "-";
      return http.get(`tours/sortByDuration?sort=${sign}&page=${page}`);
    }
  }
}

export default new ToursDataService();
