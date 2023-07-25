import "./BubbleChart.scss";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

function BubbleChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    // Dimensions du graphique
    const width = window.innerWidth / 2;
    const height = 300;

    const svg = d3.select(chartRef.current);

    // Utilisation de d3.group() pour regrouper les données par nom
    const groupedData = Array.from(d3.group(data, (d) => d.name)).map(
      ([name, values]) => ({
        name,
        value: d3.sum(values, (d) => d.value),
        radius: d3.sum(values, (d) => d.radius),
      })
    );

    // Création de l'échelle pour la taille des bulles
    const radiusScale = d3
      .scaleLog()
      .domain([1, d3.max(data, (d) => d.value)])
      .range([5, 40]);

    // Création de la simulation de force
    const simulation = d3
  .forceSimulation(groupedData)
  .force("charge", d3.forceManyBody().strength(10))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius((d) => radiusScale(d.value) + 1)) // Ajoutez un petit décalage pour la force de collision
  .force("gravity", d3.forceRadial().radius(width / 4).strength(0.1));

    // Initialiser les positions des cercles
    simulation.on("tick", () => {
      const circles = svg.selectAll("circle").data(groupedData);
      const texts = svg.selectAll("text").data(groupedData);
    
      circles
        .enter()
        .append("circle")
        .attr("r", (d) => radiusScale(d.value))
        .style("fill", (d) => colorScale(d.name))
        .style("stroke", "white")
        .merge(circles)
        .attr("cx", (d) => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
        .attr("cy", (d) => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)))
        .call(
          d3
            .drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
        );
    
      texts
        .enter()
        .append("text")
        .style("fill", "white")
        .attr("text-anchor", "middle")
        .merge(texts)
        .attr("x", (d) => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
        .attr("y", (d) => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)))
        .text((d) => `${d.name}`);
    });

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }


    function dragged(event, d) {
      d.fx = Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), event.x));
      d.fy = Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), event.y));
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    // Sélection de l'élément conteneur

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(data.map((d) => d.color));

  }, [data]);


  return <svg ref={chartRef} width={window.innerWidth / 2} height={300}></svg>;
}

export default BubbleChart;