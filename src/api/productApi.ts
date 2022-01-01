import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_TOTAL, DEFAULT_PAGINATION_lIMIT } from "../constants";
import { PaginationParams, ProductListResponse, SingleProductResponse } from "../interfaces";

import axiosClient from "./axiosClient";

const productApi = {
  async getAll(params: PaginationParams ): Promise<ProductListResponse> {
    //Transform page to _start
    //_start: the product that it starts to count from (ex: _start = 20, it will render from product 21st)
    const newParams = {...params};
    newParams._start = !params._page || params._page <= 1 
      ? 0 
      : (params._page - 1) * (params._limit || 50)

    //Remove un-needed key
    delete newParams._page;

    //Fetch product list + count
    const productList = await axiosClient.get('/products', {params: newParams});
    const count = await axiosClient.get('/products/count', {params: newParams});

    //Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page ? params._page : DEFAULT_PAGINATION_PAGE,
        limit: params._limit ? params._limit : DEFAULT_PAGINATION_lIMIT,
        total: count.data ? count.data : DEFAULT_PAGINATION_TOTAL
      }
    }
  },

  async get(id: string) : Promise<SingleProductResponse> {
    const url = `/products/${id}`;
    return await axiosClient.get(url)
  },
};

export default productApi 