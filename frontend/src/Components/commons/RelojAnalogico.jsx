import React, { useRef } from 'react';
import Sketch from 'react-p5';

export const RelojAnalogico = () => {
    const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(300, 300).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);

    let html = `
      <circle 
        cx="150" 
        cy="150" 
        r="5" 
        stroke="transparent" 
        fill="black" 
      />
    `;

    for (let i = 0; i < 60; i++) {
      html += `
        <circle 
          cx="${(120 * p5.cos(2 * p5.PI * i / 60)) + 150}" 
          cy="${(120 * p5.sin(2 * p5.PI * i / 60)) + 150}" 
          r="${i % 15 === 0 ? 4 : i % 5 === 0 ? 2 : 1}" 
          stroke="transparent" 
          fill="black" 
          stroke-width="1"
        />
      `;
    }
    p5.select("#puntos").html(html);
  };

  const draw = (p5) => {
    const hora = p5.hour() % 12;
    const minuto = p5.minute();
    const segundo = p5.second();

    p5.select("#texto-hora-digital").html(
      `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`
    );

    p5.select("#horas").style("transform", `rotate(${(360 * hora) / 12}deg)`);
    p5.select("#minutos").style("transform", `rotate(${(360 * minuto) / 60}deg)`);
    p5.select("#segundos").style("transform", `rotate(${(360 * segundo) / 60}deg)`);
  };

  return (
    <div ref={canvasRef}>
      {/* CSS (estilos) */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          #contenedor-reloj,
          #fondo,
          #hora-digital {
            width: 300px;
            height: 300px;
          }

          #fondo {
            background: linear-gradient(white, lightgray);
            border-radius: 50%;
            border: 15px solid black;
            filter: drop-shadow(0 10px 2px rgba(0, 0, 0, 0.5));
          }

          #contenedor-reloj,
          #manecillas {
            position: relative;
          }

          #fondo,
          #horas,
          #minutos,
          #segundos,
          #hora-digital,
          #puntos {
            position: absolute;
          }

          #hora-digital {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 150px;
            font-size: 130%;
            opacity: 0.5;
          }

          #manecillas {
            filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5));
          }
        `}
      </style>

      {/* HTML (Estructura) */}
      <div id="contenedor-reloj">
        <div id="fondo"></div>
        <div id="hora-digital">
          <span id="texto-hora-digital">00:00:00</span>
        </div>
        <div id="manecillas">
          <svg id="puntos" width="300" height="300"></svg>
          <div id="horas">
            <svg width="300" height="300">
              <line
                x1="150"
                y1="50"
                x2="150"
                y2="150"
                stroke="black"
                stroke-width="6"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div id="minutos">
            <svg width="300" height="300">
              <line
                x1="150"
                y1="30"
                x2="150"
                y2="150"
                stroke="black"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div id="segundos">
            <svg width="300" height="300">
              <line
                x1="150"
                y1="30"
                x2="150"
                y2="150"
                stroke="red"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <Sketch setup={setup} draw={draw} />
    </div>
  );
};