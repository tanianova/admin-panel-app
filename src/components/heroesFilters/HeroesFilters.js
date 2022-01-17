import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import classNames from "classnames";
import { fetchFilters, activeFilterChanged, selectAll } from "./filtersSlice";
import store from "../../store";

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const filters = selectAll(store.getState());
  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }
    return arr.map(({ name, label, className }) => {
      // Используем библиотеку classnames и формируем классы динамически
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          id={name}
          onClick={() => dispatch(activeFilterChanged(name))}
          className={btnClass}
        >
          {label}
        </button>
      );
    });
  };
  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
