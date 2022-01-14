import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  // Функция берет id и по нему удаляет ненужного персонажа из store
  // (если запрос на удаление прошел успешно)
  const onDelete = useCallback(
    (id) => {
      // Удаление персонажа по его id
    //   request(`http://localhost:3001/heroes/${id}`, "DELETE")
      request(`http://localhost:3001/heroes/${id}`)
        // .then((data) => console.log(data, "deleted"))
        .then(() => dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
    }, // eslint-disable-next-line
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="hero">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;