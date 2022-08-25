import Chart, { ChartArea } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import React, { useEffect } from 'react';
import Props from './types';

const spanMap = {
  hour: 'minute',
  day: 'hour',
  week: 'day',
};
const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  const width = chartWidth;
  const height = chartHeight;
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, '#306AA7');
  gradient.addColorStop(0.5, '#FEC81A');
  gradient.addColorStop(1, '#E73D1D');

  return gradient;
};

export const ChartView: React.FC<Props> = ({ timeData, span }) => {
  useEffect(() => {
    if (timeData.length === 0) return;

    const conteiner = document.getElementById('chart') as HTMLCanvasElement;
    const ctx = conteiner.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, '#306AA7');
    gradient.addColorStop(0.5, '#FEC81A');
    gradient.addColorStop(0, '#E73D1D');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeData.map((v) => new Date(v.time)),
        datasets: [
          {
            label: timeData[0].field,
            data: timeData.map((v) => v.value),

            borderColor: gradient,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          xAxis: {
            type: 'time',
            time: {
              unit: spanMap[span],
              tooltipFormat: 'yyyy/MM/dd HH:mm:ss',
              displayFormats: {
                minute: 'HH:mm:ss',
                hour: 'HH:mm',
                day: 'M/dd',
              },
            },
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [timeData]);
  return <canvas id="chart"></canvas>;
};
