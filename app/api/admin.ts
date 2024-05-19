import { ICreateFx } from '@/types/admin'
import { createEffect } from 'effector'
import { toast } from 'react-toastify'
import api from '../axiosClient'

export const createFx = createEffect(
  async ({
    url,
    theme,
    price,
    name,
    description,
    images,
    in_stock,
  }: ICreateFx) => {
    try {
      const { data } = await api.post(url, {
        theme,
        price,
        name,
        description,
        images,
        in_stock,
      })

      if (data.warningMessage) {
        toast.warning(data.warningMessage)
        return null
      }

      toast.success('Success!')

      return data
    } catch (error) {
      console.error('Error in createFx:', error)
      toast.error('An error occurred while creating.')
      throw error
    }
  }
)

export const deleteFx = createEffect(async (id: string) => {
  try {
    const { data } = await api.delete(`/lego-sets/delete/${id}`)
    toast.success('Lego set deleted successfully!')
    return data
  } catch (error) {
    console.error('Error in deleteFx:', error)
    toast.error('An error occurred while deleting Lego set.')
    throw error
  }
})
