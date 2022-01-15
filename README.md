### Hero admin panel 

##### админ-панель с использованием библиотеки React и менеджером состояний Redux

Реализация:
* Работа с локальным сервером (файл json)
* store, actions, reducer
* удаление персонажей из store и базы данных (в данном случае локальный json-файл)
* добавление персонажей в store и базу данных
* фильтрация и отображение отфильтрованных персонажей
* combineReducers, createSelector(для оптимизации рендера одинаковых компонентов)
* store enhancers(для расширения любой части store), middleware(для расширения dispatch)
* redux thunk (позволяет в качестве действий отправлять не объекты,а функции)
* Redux Toolkit: configureStore, createAction,createReducer, createSlice, createAsyncThunk,createEntityAdapter
