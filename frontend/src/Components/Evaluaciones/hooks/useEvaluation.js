import { useState } from "react";
import { useEffect } from "react";

export const useEvaluation = () => {
    const [note1, setNote1] = useState();
    const [note2, setNote2] = useState();
    const [note3, setNote3] = useState();
    const [note4, setNote4] = useState();
    const [suma, setSuma] = useState(0);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case "semana_one":
                setNote1(value);
                break;
            case "semana_two":
                setNote2(value);
                break;
            case "semana_three":
                setNote3(value);
                break;
            case "semana_four":
                setNote4(value);
                break;
            default:
                break;
        }
    };
    // eslint-disable-next-line no-unused-vars
    const calcularSuma = () => {
        const num1 = Number(note1) || 0;
        const num2 = Number(note2) || 0;
        const num3 = Number(note3) || 0;
        const num4 = Number(note4) || 0;

        const total = (num1 + num2 + num3 + num4) / 4;
        setSuma(total);
    };
   
    useEffect(() => {
        calcularSuma();
    }, [note1, note2, note3, note4]);
    return{
        note1, note2,note3,note4,handleChange,suma
    }
}
