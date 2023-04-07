function useVModel(computed, props, propName, emit) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(obj, name, val) {
          console.log({
            ...obj,
            [name]: val,
          });
          emit(`update:${propName}`, {
            ...obj,
            [name]: val,
          });
          console.log("通知父组件值改变了");
          return true;
        },
      });
    },
    set(val) {
      emit(`update:${propName}`, val);
    },
  });
}
