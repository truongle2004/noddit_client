import axiosConfig from '@/config/axiosConfig'
import { API_VERSION } from '@/constant'
import type { Community, Response, Topic } from '@/types'

/**
 * Get list topic
 * @returns {Promise<Topic[]>}
 */
export const getListTopicAPI = async (): Promise<Response<Topic[]>> =>
  await axiosConfig.get(`${API_VERSION.V1}/subnoddit-service/topics`)

/**
 * Add new community with data (title, description, ...)
 * @param {FormData} formData
 * @returns {Promise<Community>}
 */
export const addNewCommunityAPI = async (
  formData: FormData
): Promise<Community> =>
  await axiosConfig.post(
    `${API_VERSION.V1}/subnoddit-service/communities/create`,
    formData
  )

/**
 * Get community by id
 * @param {string} id
 * @returns {Promise<Response<Community>>}
 */
export const getCommunityByTopicIdAPI = async (
  id: string
): Promise<Response<Community[]>> =>
  await axiosConfig.get(
    `${API_VERSION.V1}/subnoddit-service/communities/${id}/topics`
  )
