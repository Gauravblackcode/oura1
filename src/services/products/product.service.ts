import { FetchResult } from '@apollo/client';
import {
  Product,
  ProductByIdDocument,
  ProductByIdQuery,
  ProductByIdQueryVariables,
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
} from 'types';
import logger from '@/common/logger';
import { AdvanceApolloContext } from '@/index';
import GRAPHQL_CLIENT from '../network/graphql.service';

const getDefaultProductState = (productId: string) => ({
  data: {
    productById: {
      id: productId,
      name: 'Product Unavailable',
      partNumber: productId,
      advertiserName: '',
    } as Product,
  },
});
export default class ProductService {
  async getProducts(
    variables: ProductsQueryVariables,
    context?: AdvanceApolloContext,
  ): Promise<FetchResult<ProductsQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ProductsDocument,
        variables,
        context,
      });
      return response;
    } catch (err) {
      logger.error('Error while fetching products');
      logger.error(err);
      throw err;
    }
  }

  async getProductsById(
    variables: ProductByIdQueryVariables,
    graceErrorHandling = false,
  ): Promise<FetchResult<ProductByIdQuery>> {
    try {
      const response = await GRAPHQL_CLIENT.query({
        query: ProductByIdDocument,
        variables,
      });
      if (!response.data.productById?.id && graceErrorHandling) {
        return getDefaultProductState(variables.id);
      }
      return response;
    } catch (err) {
      if (graceErrorHandling) {
        return getDefaultProductState(variables.id);
      }
      logger.error('Error while fetching product by ID');
      logger.error(err);
      throw err;
    }
  }

  async getProductsByMultipleId(variables: ProductByIdQueryVariables[]): Promise<FetchResult<ProductByIdQuery>[]> {
    try {
      const apiCalls = variables.map(item => this.getProductsById(item, true));
      return await Promise.all(apiCalls);
    } catch (err) {
      logger.error('Error while fetching products');
      logger.error(err);
      throw err;
    }
  }
}
