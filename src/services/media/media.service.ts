import logger from '@/common/logger';
import { showLoader, showMessage } from '@/redux/actions';
import { TMediaType } from '@/index';
import { HttpService } from '../network/http.service';

export default class MediaService extends HttpService {
  async uploadMedia(mediaFile: any, fileName?: string): Promise<TMediaType> {
    try {
      const formData = new FormData();
      formData.append('file', mediaFile, fileName);
      const response = await this.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async uploadCohortMedia(mediaFile: any, accountId: string, fileName: string): Promise<TMediaType> {
    try {
      const formData = new FormData();
      formData.append('file', mediaFile, fileName);
      const response = await this.post(`/audience-target/cohorts/upload/${accountId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error: any) {
      showMessage(`unable to upload media file ${error?.errorMessage || error?.message}`);
      throw error;
    }
  }

  async deleteMedia(mediaFileURL: string) {
    try {
      const response = await this.delete(`/media/${mediaFileURL}`);
      return response;
    } catch (error: any) {
      logger.error(error);
      showMessage(`unable to delete media file ${error?.message || error?.errorMessage}`);
      throw error;
    }
  }

  async deleteMediaFileById(fileUrl: string) {
    try {
      const response = await this.delete(`/media?fileUrl=${fileUrl}`);
      return response;
    } catch (error: any) {
      logger.error(error);
      showMessage(`unable to delete media file ${error?.message || error?.errorMessage}`);
      throw error;
    }
  }

  async getMediaMetadata(mediaFileURL: string): Promise<any> {
    try {
      let response = await this.get(`/media/metadata?url=${encodeURIComponent(mediaFileURL)}`);
      if (typeof response === 'string') {
        response = response.slice(1, response.length - 1);
        response = response.split(',');
        response = response.reduce((acc: any, curr: any) => {
          const [key, value] = curr.split('=');
          return {
            ...acc,
            [key.trim()]: value.trim(),
          };
        }, {} as any);
      }
      return response;
    } catch (error: any) {
      showMessage(`Unable to get metadata ${error?.message || error?.errorMessage}`);
      throw error;
    }
  }

  async getImageDimensionFromURL(mediaFileURL: string): Promise<any> {
    try {
      const response = await new Promise(resolve => {
        const img = new Image();
        img.onload = function (this: any) {
          const { naturalWidth: width, naturalHeight: height } = this;
          resolve({ width, height });
        };
        img.src = mediaFileURL;
      });
      return response;
    } catch (error) {
      return undefined;
    }
  }

  async getVideoDurationFromURL(medialFileUrl: string): Promise<any> {
    try {
      showLoader(true);
      const response = await new Promise(resolve => {
        let video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function (this: any) {
          const { duration } = this;
          resolve({ duration: Math.round(duration) });
        };
        video.src = medialFileUrl;
      });
      return response;
    } catch (error) {
      return undefined;
    } finally {
      showLoader(false);
    }
  }
}
