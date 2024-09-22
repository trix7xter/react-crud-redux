import './Filter.css';
import {
  setTitleFilter,
  selectTitleFilter,
  setOnlyFavoriteFilter,
  resetFilters,
  setAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector((state) => state.filter.author);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters);
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title"
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author"
            onChange={handleAuthorChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteChange}
            />
            Only favorite
          </label>
        </div>
      </div>
      <button type="button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
