import { useCallback, useState, useRef, useEffect } from 'react'
import Chart from 'chart.js'
import isEqual from 'react-fast-compare'

import { numeric } from 'shared/util'

interface Props {
  labels?: (number | string)[]
  chartData?: (number | string)[]
  configs?: object
  type?: string
  backgroundColor?: string
  disableAxe?: boolean
  chartHeight?: string
  chartId?: string
}

const SenChart = ({
  chartData = [],
  labels = [],
  type = 'line',
  configs,
  backgroundColor = '#dadada',
  disableAxe = false,
  chartId = 'sen_chart',
}: Props) => {
  const [isRebuildChart, setRebuildChart] = useState<boolean>(false)

  const formatData = useCallback(
    (
      data: Array<number | number[] | undefined | null | any>,
      label: Array<string | number>,
      background?: string | CanvasGradient | undefined,
    ): Chart.ChartData => ({
      labels: label,
      datasets: [{ data, backgroundColor: background, ...configs }],
    }),
    [configs],
  )
  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart | null>(null)

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx && !isRebuildChart) {
      // create new chart
      chartRef.current = new Chart(ctx, {
        type: type,
        data: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  display: !disableAxe,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  display: !disableAxe,
                  beginAtZero: true,
                  maxTicksLimit: 8,
                  callback: function (value, index, values) {
                    return numeric(value).format('0,0.[0]a')
                  },
                },
              },
            ],
          },
          plugins: {
            legend: false,
          },
          hover: {
            onHover: (event, elements) => {
              const target = document.getElementById(chartId)
              if (!target) return
              target.style.cursor = elements[0] ? 'pointer' : 'default'
            },
          },
        },
      })
      setRebuildChart(true)
    }
  }

  const getBackground = useCallback(() => {
    if (!chartRef) return
    const ctx = chartRef?.current?.canvas?.getContext('2d')
    const gradient = ctx?.createLinearGradient(0, 0, 0, 150)
    gradient?.addColorStop(0, backgroundColor)
    gradient?.addColorStop(1, `${backgroundColor}00`)
    const background = type === 'line' ? gradient : backgroundColor
    return background
  }, [backgroundColor, type])

  useEffect(() => {
    const chartInstance = chartRef.current
    const dataInstace = chartInstance?.data.datasets?.find(({ data }) => data)
    const compareData = isEqual(dataInstace?.data, chartData)
    if (chartInstance && !compareData) {
      chartInstance.data = formatData(chartData, labels, getBackground())
      chartInstance?.update()
    }
  }, [chartData, formatData, getBackground, labels])

  return <canvas id={chartId} height="170px" ref={canvasCallback}></canvas>
}

export default SenChart
