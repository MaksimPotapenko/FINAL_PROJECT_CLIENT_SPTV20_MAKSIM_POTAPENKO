/* eslint-disable indent */
import {
  $legoSets,
  setLegoSetsByPopularity,
  setLegoSetsCheapFirst,
  setLegoSetsExpensiveFirst,
} from '@/context/legoSets'
import { $mode } from '@/context/mode'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const legoSets = useStore($legoSets)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (legoSets.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Cheap first')
          setLegoSetsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Expensive first')
          setLegoSetsExpensiveFirst()
          break
        case 'popular':
          updateCategoryOption('Popular first')
          setLegoSetsByPopularity()
          break
        default:
          updateCategoryOption('Cheap first')
          setLegoSetsCheapFirst()
          break
      }
    }
  }, [legoSets.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Cheap first':
        setLegoSetsCheapFirst()
        updateRoteParam('cheap')
        break
      case 'Expensive first':
        setLegoSetsExpensiveFirst()
        updateRoteParam('expensive')
        break
      case 'Popular first':
        setLegoSetsByPopularity()
        updateRoteParam('popular')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="I am searching for..."
      value={categoryOption || createSelectOption('Cheap first')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
