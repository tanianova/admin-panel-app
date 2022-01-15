import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// import { heroCreated } from "../../actions";
import { heroCreated } from "../heroesList/heroesSlice";
import { useSelector } from "react-redux";


const HeroesAddForm = () => {
  //состояние для контроля формы
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { filters, filtersLoadingStatus } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    //создаем нового героя
    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    // // отправляем героя на сервер
    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
    // request("http://localhost:3001/heroes")
      //  .then(res=>console.log(res,'отправка успешна'))
      .then(dispatch(heroCreated(newHero)))
      .catch((err) => console.log(err));

    //очищаем форму после отправки
    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
  };

  const renderFilter = (filters, status) => {
    if (status === "loading") {
      return <option>Загрузка элементов</option>;
    } else if (status === "error") {
      return <option>Ошибка загрузки</option>;
    }
    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === "all") return;
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          
          <option>Я владею элементом...</option>
          {renderFilter(filters,filtersLoadingStatus)}
          {/* <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option> */}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
