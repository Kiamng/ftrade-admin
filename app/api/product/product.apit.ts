import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { Product, ProductList } from '@/types/product';

export const END_POINT = {
  GET_BY_STATUS: '/Product/GetAllProduct?',
  CREATE_PRODUCT: '/Product/CreateProduct',
  GET_PRODUCT: '/Product/GetProductById',
  UPDATE_PRODUCT_STATUS: '/Product/UpdateStatusProduct'
};

export const getProductByStatus = async (
  status: string,
  pageNumber: number,
  pageSize: number,
  token: string
): Promise<ProductList> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_BY_STATUS}Status=${status}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
export const getProductById = async (
  id: string,
  token: string
): Promise<Product> => {
  const response = await axiosClient.get(`${END_POINT.GET_PRODUCT}?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateProductStatus = async (
  productId: string,
  status: string,
  denyReason: string,
  isDisplay: string,
  token: string
) => {
  const response = await axiosClient.put(
    `${END_POINT.UPDATE_PRODUCT_STATUS}/id?id=${productId}`,
    {
      denyRes: denyReason,
      status: status,
      isDisplay: isDisplay
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.status;
};
