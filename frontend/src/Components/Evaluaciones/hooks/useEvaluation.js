import { useEffect } from "react";
import { useState } from "react";
export const useEvaluation = () => {
    const [semana_one, setSemana_one] = useState();
    const [semana_two, setSemana_two] = useState();
    const [semana_three, setSemana_three] = useState();
    const [semana_four, setSemana_four] = useState();
    const [suma, setSuma] = useState(0);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case "semana_one":
                setSemana_one(value);
                break;
            case "semana_two":
                setSemana_two(value);
                break;
            case "semana_three":
                setSemana_three(value);
                break;
            case "semana_four":
                setSemana_four(value);
                break;
            default:
                break;
        }
    };
    const calcularSuma = () => {
        const num1 = Number(semana_one) || 0;
        const num2 = Number(semana_two) || 0;
        const num3 = Number(semana_three) || 0;
        const num4 = Number(semana_four) || 0;

        const total = (num1 + num2 + num3 + num4) / 4;
        setSuma(total);
    };
    useEffect(() => {
        calcularSuma();
    }, [semana_one, semana_two, semana_three, semana_four]);

    return{
        semana_one, semana_two,semana_three,semana_four,handleChange,calcularSuma,suma
    }
}
