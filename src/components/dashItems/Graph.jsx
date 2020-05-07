import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import '../../styles/graph.css';

class Graph extends Component {
    constructor(props) {
        super(props);

      this.state = { chartData: {} }
    }

    componentDidUpdate(prevProps) {

      if (this.props !== prevProps) {

          this.setState({
            chartData: {
              labels: this.props.splitDays,
              datasets: [{
                  label: 'Number of Cases',
                  data: this.props.splitCases,
                  backgroundColor: [
                      'rgba(255, 0, 0, 0.5)'
                  ],
                  borderColor: [
                      'rgba(255, 50, 50, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 2
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
            }
          });

      }
  }
    
    render() {
        return (
            <div className="graphWrapper">
                <div className="graphBody">
                    <Line data={this.state.chartData}
                        options={{
                            title: {
                                display: 'display',
                                text: `Recorded Cases In ${this.props.userSubmitted}`,
                                fontsize: '30px'
                            },
                            legend: {
                                display: 'display',
                                position: 'top'
                            }

                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Graph;