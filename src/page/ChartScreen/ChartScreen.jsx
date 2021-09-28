/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import Chart from '../../components/chart'
import resas from '../../api/resas'
import getPref from '../../api/getPref'
import './ChartScreen.css'

const ChartScreen = () => {
  const [seriesTmp, setSeriesTmp] = useState([])
  const [prefs, setPref] = useState([])

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: '都道府県'
    },
    subtitle: {
      text: 'Source: RESAS API'
    },
    xAxis: {
      categories: [
        '1960',
        '1965',
        '1970',
        '1975',
        '1980',
        '1985',
        '1990',
        '1995',
        '2000',
        '2005',
        '2010',
        '2015',
        '2020',
        '2025',
        '2030',
        '2035',
        '2040',
        '2045'
      ]
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    },

    series: seriesTmp
  }

  // get pref in Japan
  useEffect(async () => {
    const response = await getPref

    const prefRes = []
    const data = response.data.result
    data.forEach(element => {
      prefRes.push(element)
    })

    setPref(prefRes)
  }, [])

  const handleCheckbox = async e => {
    const arrayTmp = [...seriesTmp]
    let check = 0
    options.series.forEach((item, index) => {
      if (e.target.name === item.name) {
        arrayTmp.splice(index, 1)
        check = 1
      }
    })

    setSeriesTmp([...arrayTmp])

    if (check === 0) {
      const response = await resas.get('/population/composition/perYear', {
        params: {
          prefCode: e.target.value,
          cityCode: '-'
        }
      })
      // const response = await getPopu(e.target.value)
      const population = response.data.result.data[0].data
      const prefItem = { name: e.target.name, data: [] }

      population.forEach(popu => {
        prefItem.data.push(popu.value)
      })

      setSeriesTmp([...seriesTmp, prefItem])
    }
  }

  return (
    <div className="container">
      <div className="container__pref">
        {prefs.map(pref => (
          <div key={pref.prefCode} style={{ width: '12%' }}>
            <input
              id={pref.prefCode}
              key={pref.prefCode}
              type="checkbox"
              name={pref.prefName}
              value={pref.prefCode}
              onChange={handleCheckbox}
            />
            <label className="container__pref-name" htmlFor={pref.prefCode}>
              {pref.prefName}
            </label>
          </div>
        ))}
      </div>
      <div className="container__chart">
        <Chart data={options} />
      </div>
    </div>
  )
}

export default ChartScreen
