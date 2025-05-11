import axiosConfig from '@/config/axiosConfig'
import { API_VERSION } from '@/constant'
import type { Community, Response, Topic } from '@/types'

/**
 * Get list topic
 * @returns {Promise<Topic[]>}
 */
export const getListTopicAPI = (): Promise<Response<Topic[]>> => {
  return axiosConfig.get(`${API_VERSION.V1}/subnoddit-service/topics`)
}

/**
 * Add new community with data (title, description, ...)
 * @param {FormData} formData
 * @returns {Promise<Community>}
 */
export const addNewCommunityAPI = (formData: FormData): Promise<Community> => {
  return axiosConfig.post(
    `${API_VERSION.V1}/subnoddit-service/communities/create`,
    formData
  )
}
