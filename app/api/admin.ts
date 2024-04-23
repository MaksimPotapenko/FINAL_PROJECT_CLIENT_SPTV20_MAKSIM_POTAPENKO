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
    const { data } = await api.post(url, {
      url,
      theme,
      price,
      name,
      description,
      images,
      in_stock,
    })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('success!')

    return data
  }
)
