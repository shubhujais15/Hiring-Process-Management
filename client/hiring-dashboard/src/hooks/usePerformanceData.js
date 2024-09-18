import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplicants } from '../utils/constants'; 

const usePerformanceData = () => {
  const dispatch = useDispatch();
  const { sourceEffectivenessData, timeToHireTrendsData, loading, error } = useSelector(
    (state) => state.performance
  );

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  return { sourceEffectivenessData, timeToHireTrendsData, loading, error };
};

export default usePerformanceData;
