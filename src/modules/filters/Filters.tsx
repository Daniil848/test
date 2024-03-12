import React from 'react';
import { useFilters } from './useFilters';
import Input from '../../UI/input/Input';
import Select from '../../UI/select/Select';
import styles from './Filters.module.scss';

const Filters = () => {
  const { setName, setGender, setStatus, genders, statuses } = useFilters();

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filtersInput}>
          <Input
            type="text"
            label="Search by name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.filtersSelects}>
          <div className={styles.filtersSelectsItem}>
            <Select
              label="Select gender"
              optionValues={genders}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className={styles.filtersSelectsItem}>
            <Select
              label="Selsect status"
              optionValues={statuses}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
