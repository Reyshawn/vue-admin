import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
        borderWidth: 1
      },{
        data: [
          317594,
          481045,
          153060,
          506519,
          205162,
          650720
        ],
        borderWidth: 1
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
      }
    })
  }
}