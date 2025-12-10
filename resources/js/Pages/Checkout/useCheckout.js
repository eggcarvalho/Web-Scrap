import { useState, useEffect, useRef } from "react";

export default function useCheckout() {
    const [time, setTime] = useState(10 * 60); // 10 minutos em segundos
    const intervalRef = useRef(null);

    useEffect(() => {
        // inicia o timer quando o hook monta
        intervalRef.current = setInterval(() => {
            setTime((old) => {
                if (old <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return old - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current); // cleanup
    }, []);

    // formata para MM:SS
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    return {
        time: `${minutes}:${seconds}`,
    };
}
