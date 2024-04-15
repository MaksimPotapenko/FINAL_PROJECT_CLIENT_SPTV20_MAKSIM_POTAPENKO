import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'

const CatalogFilters = () => {
  const isMobile = useMediaQuery(820)

  return <>{isMobile ? <div /> : <CatalogFiltersDesktop />}</>
}

export default CatalogFilters
