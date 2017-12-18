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
            this.options = {
                chart: {
                    type: 'heatmap',
                    plotBorderWidth: 1,
                    width: 350,
		            height: 350
                },

                title: {
                    text: 'Sales per employee per weekday'
                },

                xAxis: {
                    categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
                },

                yAxis: {
                    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
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
                        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                            this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                    }
                },

                series: [{
                    name: 'Sales per employee',
                    borderWidth: 1,
                    data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
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
                    text: 'Browser market shares. January, 2015 to May, 2015'
                },
                subtitle: {                        
                    text: 'Click the slices to view versions. Source: netmarketshare.com.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
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

        case 'sankey': 
            this.options = {
                    title: {
                        text: 'Highcharts Sankey Diagram'
                    },
                    series: [{
                        keys: ['from', 'to', 'weight'],
                        data: [
                            ['Brazil', 'Portugal', 5 ],
                            ['Brazil', 'France', 1 ],
                            ['Brazil', 'Spain', 1 ],
                            ['Brazil', 'England', 1 ],
                            ['Canada', 'Portugal', 1 ],
                            ['Canada', 'France', 5 ],
                            ['Canada', 'England', 1 ],
                            ['Mexico', 'Portugal', 1 ],
                            ['Mexico', 'France', 1 ],
                            ['Mexico', 'Spain', 5 ],
                            ['Mexico', 'England', 1 ],
                            ['USA', 'Portugal', 1 ],
                            ['USA', 'France', 1 ],
                            ['USA', 'Spain', 1 ],
                            ['USA', 'England', 5 ],
                            ['Portugal', 'Angola', 2 ],
                            ['Portugal', 'Senegal', 1 ],
                            ['Portugal', 'Morocco', 1 ],
                            ['Portugal', 'South Africa', 3 ],
                            ['France', 'Angola', 1 ],
                            ['France', 'Senegal', 3 ],
                            ['France', 'Mali', 3 ],
                            ['France', 'Morocco', 3 ],
                            ['France', 'South Africa', 1 ],
                            ['Spain', 'Senegal', 1 ],
                            ['Spain', 'Morocco', 3 ],
                            ['Spain', 'South Africa', 1 ],
                            ['England', 'Angola', 1 ],
                            ['England', 'Senegal', 1 ],
                            ['England', 'Morocco', 2 ],
                            ['England', 'South Africa', 7 ],
                            ['South Africa', 'China', 5 ],
                            ['South Africa', 'India', 1 ],
                            ['South Africa', 'Japan', 3 ],
                            ['Angola', 'China', 5 ],
                            ['Angola', 'India', 1 ],
                            ['Angola', 'Japan', 3 ],
                            ['Senegal', 'China', 5 ],
                            ['Senegal', 'India', 1 ],
                            ['Senegal', 'Japan', 3 ],
                            ['Mali', 'China', 5 ],
                            ['Mali', 'India', 1 ],
                            ['Mali', 'Japan', 3 ],
                            ['Morocco', 'China', 5 ],
                            ['Morocco', 'India', 1 ],
                            ['Morocco', 'Japan', 3 ]
                        ],
                        type: 'sankey',
                        name: 'Sankey demo series'
                    }]
            }

        case 'table':

      };
 }
};