/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import resas from './api/resas'

const App = () => {
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
    const response = await resas.get('/prefectures')

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
      const population = response.data.result.data[0].data
      const prefItem = { name: e.target.name, data: [] }

      population.forEach(popu => {
        prefItem.data.push(popu.value)
      })

      setSeriesTmp([...seriesTmp, prefItem])
    }
  }

  return (
    <div style={{ width: '90%', margin: 'auto', display: 'grid' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '50px', marginTop: '50px' }}>
        {prefs.map(pref => (
          <div key={pref.prefCode} style={{ width: '12%' }}>
            <input
              key={pref.prefCode}
              type="checkbox"
              name={pref.prefName}
              value={pref.prefCode}
              onChange={handleCheckbox}
            />
            <span style={{ fontSize: '20px' }}>{pref.prefName}</span>
          </div>
        ))}
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default App
