import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = '/categories';
    return axiosClient.get(url)
  },
  get(id: string) {
    const url = `/categories/${id}`;
    return axiosClient.get(url)
  },
  add(data: {}) {
    const url = `/categories`;
    return axiosClient.get(url, data)
  },
  update(data: {id: string}) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data)
  },
  remove(id: {}) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url)
  }
}

export default categoryApi