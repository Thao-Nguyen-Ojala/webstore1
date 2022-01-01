import { FILTER_LIST_TYPE } from "../../interfaces";

enum FiltersID {
  FreeShip,
  OnSale,
  PriceRange,
  Category
}

export const getFreeShippingFilter = (): FILTER_LIST_TYPE => {
  return {
    id: FiltersID.FreeShip,
    getLabel: () => 'FreeShip',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  }
}

export const getOnSaleFilter = (): FILTER_LIST_TYPE => {
  return {
      id: FiltersID.OnSale,
      getLabel: () => 'On Sale',
      isActive: () => true,
      isVisible: (filters) => Object.keys(filters).includes('isPromotion'),
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = { ...filters };
        delete newFilters.isPromotion;
        return newFilters;
      },
      onToggle: () => {},
  }
}

export const getPriceRangeFilter = (): FILTER_LIST_TYPE => {
  return {
    id: FiltersID.PriceRange,
    getLabel: () => 'Price range',
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  }
}

export const getCategoryFilter = (): FILTER_LIST_TYPE => {
  return {
    id: FiltersID.Category,
    getLabel: () => 'Category',
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: () => {},
  }
}