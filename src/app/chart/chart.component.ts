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
                    name: 'Sales per employee',
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
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
                series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'IE',
                            y: 56.33,
                            drilldown: 'IE'
                        }, {
                            name: 'Chrome',
                            y: 24.03,
                            drilldown: 'Chrome'
                        }, {
                            name: 'Firefox',
                            y: 10.38,
                            drilldown: 'Firefox'
                        }, {
                            name: 'Safari',
                            y: 4.77,
                            drilldown: 'Safari'
                        }, {
                            name: 'Opera',
                            y: 0.91,
                            drilldown: 'Opera'
                        }, {
                            name: 'Proprietary or Undetectable',
                            y: 0.2,
                            drilldown: null
                        }]
                }],
                drilldown: {
                        series: [{
                            name: 'IE',
                            id: 'IE',
                            data: [
                                ['v11.0', 24.13],
                                ['v8.0', 17.2],
                                ['v9.0', 8.11],
                                ['v10.0', 5.33],
                                ['v6.0', 1.06],
                                ['v7.0', 0.5]
                            ]
                        }, {
                            name: 'Chrome',
                            id: 'Chrome',
                            data: [
                                ['v40.0', 5],
                                ['v41.0', 4.32],
                                ['v42.0', 3.68],
                                ['v39.0', 2.96],
                                ['v36.0', 2.53],
                                ['v43.0', 1.45],
                                ['v31.0', 1.24],
                                ['v35.0', 0.85],
                                ['v38.0', 0.6],
                                ['v32.0', 0.55],
                                ['v37.0', 0.38],
                                ['v33.0', 0.19],
                                ['v34.0', 0.14],
                                ['v30.0', 0.14]
                            ]
                        }, {
                            name: 'Firefox',
                            id: 'Firefox',
                            data: [
                                ['v35', 2.76],
                                ['v36', 2.32],
                                ['v37', 2.31],
                                ['v34', 1.27],
                                ['v38', 1.02],
                                ['v31', 0.33],
                                ['v33', 0.22],
                                ['v32', 0.15]
                            ]
                        }, {
                            name: 'Safari',
                            id: 'Safari',
                            data: [
                                ['v8.0', 2.56],
                                ['v7.1', 0.77],
                                ['v5.1', 0.42],
                                ['v5.0', 0.3],
                                ['v6.1', 0.29],
                                ['v7.0', 0.26],
                                ['v6.2', 0.17]
                            ]
                        }, {
                            name: 'Opera',
                            id: 'Opera',
                            data: [
                                ['v12.x', 0.34],
                                ['v28', 0.24],
                                ['v27', 0.17],
                                ['v29', 0.16]
                            ]
                        }]
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