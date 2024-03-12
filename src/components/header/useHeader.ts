import { getStudents } from '../../app/studentsSlice';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const useHeader = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return {
    state,
    openSidebar,
    setOpenSidebar,
    openAccordion,
    setOpenAccordion,
  };
};
