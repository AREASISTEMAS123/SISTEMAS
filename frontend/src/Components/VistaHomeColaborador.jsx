import { useState } from "react"
import { CumpleanosCardColaborador } from "./CumpleanosCardColaborador"

export const VistaHomeColaborador = () => {
	const [cardCounter, setCardCounter] = useState(3)
	//const incrementCounter = () => {
	//	setCardCounter(cardCounter + 1);
	//};

	const renderCards = () => {
		const cards = [];

		for (let i = 0; i < cardCounter; i++) {
			cards.push(<CumpleanosCardColaborador key={i} />);
		}

		return cards;
	};

	return (
		<>
			<section className="w-full bg-cv-secondary">
				<div className="text-center my-4">
					<h2 className="text-2xl md:text-5xl text-white font-bold uppercase">Bienvenida Karla</h2>
				</div>
				<div className="my-4">
					<h3 className="text-white text-xl">Proximos Cumpleaños</h3>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 place-items-center">
					{renderCards()}
				</div>
			</section>
		</>
	)
}
