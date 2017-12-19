import { Component, OnInit, Input } from '@angular/core';
import { DATA } from '../data/data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']  
})
export class ChartComponent implements OnInit {

  @Input() metaData;
  options: Object;
  public data: any;
  public chartType: string;
  public library: string;
  public colors: any = ['#CD0E3F', '#FBC433', '#CCCC2B', '#19A5A8', '#57BFD2', '#93227F', '#D90E31' ]

  public getData(dataUrl){
      let dataObject = DATA.find(o => o.id == dataUrl);
      return dataObject.data;
  };

  public transform(){
      const chartData = [];
      for(let i=0; i< this.data.yAxis.length; i++){
          chartData.push({
              name: this.data.yAxis[i],
              data: this.data.data[i]
          })
      }
      return chartData;
  }

  public treemapTransform(){
      const chartData = [];
      for(let i=0; i< this.data.yAxis.length; i++){
          chartData.push({
              id: this.data.yAxis[i],
              name: this.data.yAxis[i],
              color: this.colors[i]
          });
          for(let j=0; j < this.data.xAxis.length; j++){
              chartData.push({
                  parent: this.data.yAxis[i],
                  name: this.data.xAxis[j],
                  value: this.data.data[i][j]
              })
          }
      }
      return chartData;
  }

  public heatmapTransform(){
      const chartData = [];
      for(let i=0; i< this.data.xAxis.length; i++){
          for(let j=0; j< this.data.yAxis.length; j++){
              let array = [];
              array.push(i);
              array.push(j);
              array.push(this.data.data[j][i]);
              chartData.push(array);
          }
      }
      return chartData;
  }

  firstLevelTransform() {
    const seriesData = [];
    const chartData = [];

    for (let i = 0; i < this.data.yAxis.length; i++) {
      let dataSum: number = 0;
      for (let j = 0; j < this.data.data[i].length; j++) {
        dataSum += this.data.data[i][j];
      }
      chartData.push({
        name: this.data.yAxis[i],
        y: dataSum,
        drilldown: this.data.yAxis[i],
        color: this.colors[i]
      });
    }

    seriesData.push({
      data: chartData
    })

    return seriesData;
  }

  secondLevelTransform() {
    const drilldownData = [];
    const seriesData = [];
    for (let i = 0; i < this.data.yAxis.length; i++) {
      let dataArray:any = [];
      
      for (let j = 0; j < this.data.xAxis.length; j++) {
        let dataArrayElement:any = [];
        dataArray.push({
          name: this.data.xAxis[j],
          y: this.data.data[i][j],
          color: this.colors[j]
        })
      }
      seriesData.push({
        name: this.data.yAxis[i],
        id: this.data.yAxis[i],
        data: dataArray
      });
    }
    return seriesData;
  }

  ngOnInit(){
      this.data = this.getData(this.metaData.data);
      
      switch(this.metaData.type){
        case 'column': 
            const seriesData = this.transform();
            this.options = {
            	chart: {
        	        type: 'column',
        	        width: 350,
        	        height: 350
        	    },
        	    title: {
        	        text: this.metaData.title
        	    },
        	    xAxis: {
        	        categories: this.data.xAxis,
        	        crosshair: true
        	    },
        	    yAxis: {
        	        min: 0,
        	        title: {
        	            text: 'Rainfall (mm)'
        	        }
        	    },
        	    tooltip: {
        	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        	            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        	        footerFormat: '</table>',
        	        shared: true,
        	        useHTML: true
        	    },
        	    plotOptions: {
        	        column: {
        	            pointPadding: 0.2,
        	            borderWidth: 0
        	        }
        	    },
        	    series: seriesData
    	};
        break;
              
        case 'column-stacked': 
            const seriesData3 = this.transform();
              this.options = {
        	chart: {
		        type: 'column',
		        width: 350,
		        height: 350
		    },
		    title: {
		        text: this.metaData.title
		    },
		    xAxis: {
		        categories: this.data.xAxis,
		        crosshair: true
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Rainfall (mm)'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0,
                    stacking: 'normal'
		        }
		    },
		    series: seriesData3
		};
        break;
            
        case 'line': 
            const seriesData2 = this.transform();
              this.options = {
        	chart: {
		        type: 'line',
		        width: 350,
		        height: 350
		    },
		    title: {
		        text: this.metaData.title
		    },
		    xAxis: {
		        categories: this.data.xAxis,
		        crosshair: true
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Rainfall (mm)'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series: seriesData2
		};
        break;
              
        case 'radar': 
            const seriesData1 = this.transform();
              this.options = {
        	chart: {
		        polar: true,
		        type: 'line',
                width: 350,
		        height: 350
		    },
		    title: {
		        text: this.metaData.title
		    },
		    xAxis: {
		        categories: this.data.xAxis
		    },
		    yAxis: {
		        gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    series: seriesData1
		};
        break;
        
        case 'heatmap':
        let data = this.heatmapTransform();
            this.options = {
                chart: {
                    type: 'heatmap',
                    plotBorderWidth: 1,
                    width: 350,
		            height: 350
                },

                title: {
                    text: this.metaData.title
                },

                xAxis: {
                    categories: this.data.xAxis
                },

                yAxis: {
                    categories: this.data.yAxis,
                    title: null
                },

                colorAxis: {
                    min: 0,
                    minColor: '#F8D538',
                    maxColor: '#FC5F20'
                },

                legend: {
                    align: 'right',
                    layout: 'vertical',
                    margin: 0,
                    verticalAlign: 'top',
                    y: 25,
                    symbolHeight: 280
                },

                tooltip: {
                    formatter: function () {
                        return '<b> In ' + this.series.xAxis.categories[this.point.x]  + ', ' +
                            this.series.yAxis.categories[this.point.y] + '</b> had <br><b>' + this.point.value + ' mm of rainfall</b>';
                    }
                },

                series: [{
                    borderWidth: 1,
                    data: data,
                    dataLabels: {
                        enabled: false,
                        color: '#000000'
                    }
                }]
            };    
        break;  
              
        case 'pie':
        const seriesData4 = this.firstLevelTransform();
        const drilldownData = this.secondLevelTransform();
              this.options = {
                chart: {
                    type: 'pie',
                    width: 350,
		            height: 350
                },
                title: {
                    text: this.metaData.title
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                            }
                        }
                },
                tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y} mm </b> of rainfall<br/>'
                },
                series: seriesData4,
                drilldown: {
                    series: drilldownData
                }
        };
        break;

        case 'treemap': {
            let data = this.treemapTransform();
            this.options = {
                    series: [{
                    type: "treemap",
                    layoutAlgorithm: 'stripes',
                    alternateStartingDirection: true,
                    levels: [{
                        level: 1,
                        layoutAlgorithm: 'sliceAndDice',
                        dataLabels: {
                            enabled: true,
                            align: 'left',
                            verticalAlign: 'top',
                            style: {
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }
                        }
                    }],
                    data: data
                }],
                title: {
                    text: this.metaData.title
                },
                chart: {
                    width: 350,
                    height: 350
                }
            }
        };
        break;
     }
   }
}