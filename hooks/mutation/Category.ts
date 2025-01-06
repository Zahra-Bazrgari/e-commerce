import { fetchSubcategory } from '@/apis/sub-categories.service';
import { useQuery } from 'react-query';

export const useFetchSubcategory = (subcategoryId: string) => {
  return useQuery({
    queryKey: ["subcategory", subcategoryId],
    queryFn: () => fetchSubcategory(subcategoryId),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};