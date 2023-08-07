//import modules
import { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { Dimensions, StyleSheet, View,Text } from 'react-native';
import { BarChart } from 'echarts/charts';
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import {SVGRenderer,SvgChart} from '@wuba/react-native-echarts'
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
//initialize  the main graphic object
echarts.use([
    SVGRenderer,
    BarChart,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    DataZoomComponent,
    LineChart,
    GridComponent
]);


//those variables is used to define the graphic's size
const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('screen').width;

//define api function
const getMesaure= async(device,file)=>{
  try {
    let resp=await fetch('https://apifullheath.onrender.com/devices/getMesaure/dev/1/file/20')
    let data=await resp.json()
    console.log(data, 'line 35')
    return data;
  } catch (error) {
    return []
  }
}



export default function LiveChart(props){
               const svgRef = useRef(null);
               const {params,info}=props;

              useEffect(()=>{
                   async function  renderChart(){
                       let chart;
                       let inter;
                       let data=await getMesaure(params.device,params.file);

                       //configuration of the graphics
                       const option ={
                        tooltip: {
                          trigger: 'axis',
                          // axisPointer: {
                          //   type: 'cross',
                          //   label: {
                          //     backgroundColor: '#283b56',
                          //   },
                          // },
                          axisPointer: {
                            animation: false
                          }
                        },
                        legend: {},
                        toolbox: {
                          show: true,
                          feature: {
                            dataView: { show: false, readOnly: false },
                            restore: {},
                          },
                        },
                        dataZoom: {
                          show: false,
                          start: 0,
                          end: 100,
                        },
                        xAxis: [
                          {
                            type: 'category',
                            boundaryGap: true,
                            data: data.TimeStamp,
                          }
                        ],
                        yAxis: [
                          {
                            type: 'value',
                            scale: true,
                            name: info.name,
                            max: info.max,
                            min: info.min,
                            boundaryGap: [0.2, 0.2],
                            // axisLabel: {
                            //   formatter: '{value} °C'
                            // }
                          }
                        ],
                        series: [
                          {
                            name: info.name,
                            type: 'line',
                            data: data[params.kd],
                            smooth: true,
                            markLine: {
                              data: [{ type: 'average', name: 'Avg' }]
                            }
                          },
                        ],
                       }

                       //render chart
                       if(svgRef.current){
                        chart=echarts.init(svgRef.current,'light',{
                          renderer:'svg',
                          width: E_WIDTH,
                          height:E_HEIGHT
                        })
                        chart.setOption(option)
                        inter=setInterval(async()=>{
                          let newData=await getMesaure(params.device,params.file);
                          let newTimeStamp=newData.TimeStamp.pop(),
                              newValue=newData[params.kd].pop();
                          
                              

                          if(!(data.TimeStamp.includes(newTimeStamp) && data[params.kd].includes(newValue))){
                               //timestamp
                               data.TimeStamp.shift();
                               data.TimeStamp.push(newTimeStamp);

                               //value
                               data[params.kd].shift();
                               data[params.kd].push(newValue)
                           
                               chart.setOption({
                                  xAxis: [
                                    {
                                      data: data.TimeStamp,
                                    }
                                  ],
                                  series: [
                                    {
                                      data: data[params.kd],
                                    }
                                  ],
                                });
                          }    
                        },10000)
                       }

                       return () =>{ 
                        chart?.dispose()
                        clearInterval(inter)
                      }
                   }


                   renderChart()
              },[])


              return(
                <SvgChart ref={svgRef} />
              )

}