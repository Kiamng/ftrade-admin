import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { Product, ProductList } from '@/types/product';

export const END_POINT = {
  GET_BY_STATUS: '/Product/GetAllProduct?',
  CREATE_PRODUCT: '/Product/CreateProduct',
  GET_PRODUCT: '/Product/GetProductById',
  UPDATE_PRODUCT_STATUS: '/Product/UpdateStatusProduct',
  GET_ALL: '/Product/GetAllProduct'
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

export const getAllProduct = async ({
  token,
  creatorId,
  status,
  pageNumber,
  pageSize,
  isDisplay,
  category,
  genre,
  city,
  sortBy,
  sortAscending
}: {
  token: string;
  creatorId?: string;
  status?: string;
  pageNumber?: number;
  pageSize?: number;
  isDisplay?: string;
  category?: string;
  genre?: string;
  city?: string;
  sortBy?: string;
  sortAscending?: boolean;
}): Promise<ProductList> => {
  const params = new URLSearchParams();
  if (creatorId) params.append('CreatorId', creatorId);
  if (category) params.append('CategoryName', category);
  if (city) params.append('CityName', city);
  if (genre) params.append('GenreName', genre);
  if (status) params.append('Status', status);
  if (isDisplay) params.append('IsDisplay', isDisplay);
  if (pageNumber) params.append('PageNumber', pageNumber.toString());
  if (pageSize) params.append('PageSize', pageSize.toString());
  if (sortBy) params.append('SortBy', sortBy);
  if (sortAscending !== undefined)
    params.append('SortAscending', sortAscending.toString());

  const response = await axiosClient.get(
    `${END_POINT.GET_ALL}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
