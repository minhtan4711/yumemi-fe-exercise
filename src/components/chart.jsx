/* eslint-disable react/prop-types */
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

const Chart = ({ data }) => (
  <div>
    <HighchartsReact highcharts={Highcharts} options={data} />
  </div>
)

export default Chart
