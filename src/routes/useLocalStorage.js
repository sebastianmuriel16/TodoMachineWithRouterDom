import React from "react";

const initialState = ({ initialValue }) => ({
  item: initialValue,
  error: false,
  loading: true,
  sincronizeItem: true,
});

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

const reducer = (state, action) => {
  if (action.type === actionTypes.error) {
    return {
      ...state,
      error: true,
    };
  }
  if (action.type === actionTypes.success) {
    return {
      ...state,
      error: false,
      loading: false,
      sincronizedItem: true,
      item: action.payload,
    };
  }
  if (action.type === actionTypes.save) {
    return {
      ...state,
      item: action.payload,
    };
  }
  if (action.type === actionTypes.sincronize) {
    return {
      ...state,
      loading: true,
      sincronizedItem: false,
    };
  }
};

function useLocalStorage(itemName, initialValue) {
  const [{ item, error, loading, sincronizedItem }, dispatch] =
    React.useReducer(reducer, initialState({ initialValue }));

  const onError = (error) => {
    dispatch({
      type: actionTypes.error,
      payload: error,
    });
  };

  const onSucces = (item) => {
    dispatch({
      type: actionTypes.success,
      payload: item,
    });
  };

  const onSave = (item) => {
    dispatch({ type: actionTypes.save, payload: item });
  };
  const onSincronize = () => {
    dispatch({ type: actionTypes.sincronize });
  };

  React.useEffect(() => {
    const timeoutEffect = setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        onSucces(parsedItem);
        // setItem(parsedItem);
        // setLoading(false);
        // setsincronizedItem(true);
      } catch (error) {
        // setError(error);
        onError(error);
      }
    }, 1000);

    return () => clearTimeout(timeoutEffect);
  }, [sincronizedItem]); // el array vacio es para que el useEffect solo se ejecute una unica vez (Nota antes el array estaba vacio )

  const saveItem = (newItem) => {
    try {
      const stringifyedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyedItem);
      // setItem(newItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

export { useLocalStorage };

// const defaultTodos = [
//   {text: 'cortar....', completed: true},
//   {text: 'curso React.js', completed: false},
//   {text: 'jack', completed: false},
//   {text: 'como sea', completed: false},
//   {text: 'JACK', completed: false},
//   {text: 'Coincidencias', completed: false},
//   {text: 'V rising', completed: false},
// ];
