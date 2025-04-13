import { getCookie } from 'cookies-next';

import { AudienceType, Segment, SegmentBase } from '@/models';
import { showLoader } from '@/redux/actions';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants';
import logger from '@/common/logger';

import axios from '../network/data-weaver-http-service';

export const getSegments = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
  sort: string = '',
  status: string = '',
  type: string = '',
  userId: string = '',
  accountId: string = '',
): Promise<{ data: Segment[]; count: number } | unknown> => {
  try {
    showLoader(true);
    const params: any = {
      page,
      page_size: pageSize,
      search_param: search,
      sort_param: sort,
      account_id: accountId,
      user_id: userId,
    };
    if (status) {
      params.is_active = status;
    }

    if (type) {
      params.type = type;
    }
    if (accountId && userId) {
      const res = await axios.get('/segments', {
        params: params,
      });
      return {
        data: res.data.detail.data.map((segment: any) => {
          const segmentData: Segment = {
            advertisersList: segment.advertiser_list,
            createdAt: new Date(segment.created_at),
            createdBy: null,
            description: segment.description,
            executionStatus: segment.execution_status,
            id: segment._id,
            isActive: segment.is_active,
            isOpenToAll: segment.is_open_to_all,
            name: segment.segment_name,
            type: segment.type || null,
            lastSync: segment.last_sync ? new Date(segment.last_sync) : null,
            lastSuccessfulSync: segment.last_successful_sync ? new Date(segment.last_successful_sync) : null,
            updateAt: segment.updated_at ? new Date(segment.updated_at) : null,
            updateBy: segment.updated_by || null,
          };
          return segmentData;
        }),
        count: res.data.detail.count,
      };
    } else {
      return {
        data: [],
        count: 0,
      };
    }
  } catch (err) {
    logger.error(err, 'Error while getting segments.');
    return err;
  } finally {
    showLoader(false);
  }
};

export const getSegmentNames = async (search: string = ''): Promise<SegmentBase | any> => {
  try {
    const res = await axios.get('/segments/names', {
      params: {
        search_param: search,
      },
    });

    const segmentNames: SegmentBase[] = res.data?.detail.map((segmentData: any) => ({
      name: segmentData.segment_name,
      id: segmentData._id,
      type: segmentData.type,
    }));

    return segmentNames;
  } catch (err) {
    logger.error(err, 'Error while getting segment names.');
    return err;
  }
};

export const createSegment = async (
  type: string,
  segmentName: string,
  desc: string = '',
  isOpenToAll: boolean,
  advertiserList: Array<string>,
  accountId: string | undefined,
  userId: string | undefined,
  data: any,
  schedule: any,
) => {
  try {
    const apiData: any = {
      segment_name: segmentName,
      user_id: userId,
      account_id: accountId,
      is_open_to_all: isOpenToAll,
      description: desc,
      advertiser_list: advertiserList.map((adv: any) => adv.value),
      type,
    };
    if (type !== AudienceType.CSV) {
      apiData.schedule = schedule;
    }
    if (type === AudienceType.COMBINATION) {
      apiData.segment1 = data.segment1;
      apiData.operation = data.operation;
      apiData.segment2 = data.segment2;
    }
    if (type === AudienceType.DYNAMIC) {
      apiData.reactflow_json = JSON.stringify(data.reactflowJson);
    }
    if (type === AudienceType.CSV) {
      apiData.uploaded_file_url = data.fileUrl;
      const token = getCookie(ACCESS_TOKEN_COOKIE);
      apiData.access_token = token;
    }
    const res = await axios.post('/segments/create', apiData);
    return res;
  } catch (err: any) {
    logger.error(err, 'Error while creating segment.');
    return err.response;
  }
};

export const editSegment = async (
  type: string,
  segmentName: string,
  desc: string = '',
  isOpenToAll: boolean,
  advertiserList: Array<string>,
  accountId: string,
  userId: string,
  data: any,
  schedule: any,
  id: string = '',
) => {
  try {
    const apiData: any = {
      segment_name: segmentName,
      user_id: userId,
      account_id: accountId,
      is_open_to_all: isOpenToAll,
      description: desc,
      advertiser_list: advertiserList.map((adv: any) => adv.value),
      type,
    };
    if (type !== AudienceType.CSV) {
      apiData.schedule = schedule;
    }
    if (type === AudienceType.COMBINATION) {
      apiData.segment1 = data.segment1;
      apiData.operation = data.operation;
      apiData.segment2 = data.segment2;
    }
    if (type === AudienceType.DYNAMIC) {
      apiData.reactflow_json = JSON.stringify(data.reactflowJson);
    }
    if (type === AudienceType.CSV) {
      apiData.uploaded_file_url = data.fileUrl;
      const token = getCookie(ACCESS_TOKEN_COOKIE);
      apiData.access_token = token;
    }
    const res = await axios.post(`/segments/update/${id}`, apiData);
    return res;
  } catch (err: any) {
    logger.error(err, 'Error while updating segment.');
    return err.response;
  }
};

export const getSegmentDetailsById = async (segmentId: string, userId: string = ''): Promise<any> => {
  try {
    showLoader(true);
    const res = await axios.get(`/segments/${segmentId}`, {
      params: {
        access_token: getCookie(ACCESS_TOKEN_COOKIE),
        user_id: userId,
      },
    });

    return res;
  } catch (err) {
    logger.error(err, 'Error while getting segment details.');
    return err;
  } finally {
    showLoader(false);
  }
};

export const getConnectionNames = async (connectionType: string) => {
  try {
    showLoader(true);
    const response = await axios.get(`/segments/${connectionType}/get-connection-names`);

    return response.data;
  } catch (error) {
    console.error('Error fetching Names List:', error);
    throw new Error('Failed to fetch name List');
  } finally {
    showLoader(false);
  }
};

export const getTableNames = async (connectionId: string) => {
  try {
    showLoader(true);
    const response = await axios.get(`/segments/get-table-names/${connectionId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching Names List:', error);
    throw new Error('Failed to fetch name List');
  } finally {
    showLoader(false);
  }
};

export const getTableSchema = async (table_id: string) => {
  try {
    showLoader(true);
    const res = await axios.get(`/segments/${table_id}/get-schema`);

    return res.data;
  } catch (error) {
    console.error('Error fetching source schema table columns:', error);
    throw new Error('Failed to fetch source schema table columns');
  } finally {
    showLoader(false);
  }
};

export const syncSourceData = async (tableId: string) => {
  try {
    showLoader(true);
    return await axios.get(`/segments/${tableId}/sync-data-count`);
  } catch (error) {
    console.error('Error fetching source node data count', error);
    throw new Error('Failed to fetch source node data count');
  } finally {
    showLoader(false);
  }
};

export const getSampleData = async (linkedTableId: string) => {
  try {
    showLoader(true);
    const response = await axios.get(`/segments/${linkedTableId}/get-source-sample-data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sample data:', error);
    throw new Error('Error fetching source sample');
  } finally {
    showLoader(false);
  }
};

export const syncSegmentFilterData = async (reactFlowJson: string, sourceTableId: string, nodeId: string) => {
  try {
    showLoader(true);
    return await axios.post(`/segments/${sourceTableId}/sync-filter-data`, {
      reactflow_json: reactFlowJson,
      filter_id: nodeId,
    });
  } catch (error) {
    console.error('Error fetching filter node data count', error);
    throw new Error('Failed to fetch filter node data count');
  } finally {
    showLoader(false);
  }
};

export const syncSegmentSampleData = async (segmentId: string, reactFlowJson: string, nodeId: string) => {
  try {
    showLoader(true);
    const res = await axios.post(`/segments/${segmentId}/get-sample-data`, {
      reactflow_json: reactFlowJson,
      filter_id: nodeId,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching filter node data', error);
    throw new Error('Failed to fetch filter node data');
  } finally {
    showLoader(false);
  }
};

export const setSegmentStatus = async (segmentIds: string[], status: boolean, userId: string): Promise<any> => {
  try {
    showLoader(true);
    const res = await axios.put(`/segments/edit-status`, {
      segment_ids: segmentIds,
      is_active: status,
      user_id: userId,
    });

    return res;
  } catch (err) {
    logger.error(err, 'Error while updating segment status.');
    return err;
  } finally {
    showLoader(false);
  }
};
