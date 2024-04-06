import { useEffect } from "react";
import { useStore } from "react-redux";



export const useResetForm = (reset) => {

    const store = useStore();

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;
    
        // eslint-disable-next-line no-unused-vars
        const unSubscribe = store.subscribe(() => {
          let prevWasLogout = currentWasLogout;
          currentWasLogout = store.getState().app.wasLogout;
    
          if (currentWasLogout !== prevWasLogout) {
            reset();
          }
        });
      }, [reset, store]);
    
}

export default useResetForm
