import { useState } from "react";

const types: Record<string, { regex: RegExp; message: string }> = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Preencha com um Email Válido",
    },
    numero: {
        regex: /^\d+(\.\d+)?$/,
        message: "Utilize apenas números",
    },
};

const useForm = (type?: string | false) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);

    function validacao(value: string): boolean {
        if (type === false) return true;
        if (!value.trim()) {
            setError("Preencha um valor");
            return false;
        }
        if (type && types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        }
        setError(undefined);
        return true;
    }

    function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        if (error) validacao(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        error,
        onChange,
        validacao: () => validacao(value),
        onBlur: () => validacao(value),
    };
};

export default useForm;
