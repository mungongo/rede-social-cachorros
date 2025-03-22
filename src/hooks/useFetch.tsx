import { useCallback, useState } from "react";

const useFetch = () => {
    const [data, setData] = useState<null | any>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(async (url: string, options?: RequestInit) => {
        let response: Response | undefined;
        let json: any = null;

        try {
            setError(null);
            setLoading(true);

            response = await fetch(url, options);
            json = await response.json();
            if (!response.ok) throw new Error(json.message || "Erro desconhecido");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro desconhecido");
            }
        } finally {
            setData(json);
            setLoading(false);
            return { response, json };
        }
    }, []);

    return {
        data,
        error,
        loading,
        request,
    };
};

export default useFetch;
