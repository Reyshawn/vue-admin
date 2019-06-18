import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets: [{
        data: [
          617594,
          181045,
          153060,
          106519,
          105162,
          95072
        ],
        //backgroundColor: 'teal'
        backgroundColor: [
          '#010059',
          '#52437b',
          '#ff7a8a',
          '#fcf594',
          '#fafdcb',
          '#aee7e8',
          '#28c3d4',
          '#248ea9'
        ],
        borderWidth: 1,
        borderColor: '#777',
        hoverBorderWidth: 3,
        hoverBorderColor: '#000'
      }]
    }, {
      title: {
        display: true,
        text: 'Largest Cities in Massachussets',
        fontSize: 25
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: 'teal'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled:false
      }
    })
  }
}