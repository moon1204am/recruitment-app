import { useState, useEffect } from 'react';
/**
 * usePromise takes a promise and handles the results.
 * @param {*} promise The promise to handle
 * @author Jinglan Qin
 * @returns [data, error] Data and/or Error from the promise
 */
 function usePromise(promise) {  

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => { 
        setData(null); 
        setError(null);
        if(promise != null)
            promise.then(dt => setData(dt)).catch(er => setError(er));
        }, [promise]); 

     return [data, error];
}
export default usePromise;
