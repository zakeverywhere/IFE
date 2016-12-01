/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

window.onload = function(){
  // 以下两个函数用于随机模拟生成测试数据
  function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
  }
  function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
      datStr = getDateStr(dat);
      returnData[datStr] = Math.ceil(Math.random() * seed);
      dat.setDate(dat.getDate() + 1);
    }
    return returnData;
  }

  var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
  };

  // 用于渲染图表的数据
  var chartData = {};
    

  // 记录当前页面的表单选项
  var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
  }

  //convert time to pixel;
  var pixelState = {
    "day":5,
    "week":35,
    "month":150,
  }

  //convert original data into form data
  function converData(){
    var sourceData = aqiSourceData[pageState.nowSelectCity];
    var returnData = {};

    //change data according to time selection
    switch(pageState.nowGraTime){
      //deal with day
      case 'day':
         returnData = sourceData;
         break;

      //deal with week
      case 'week': 

         var weekCount = 0;
         var weekValue = [];
         for(var dateStr in sourceData){
            //add data into weekly value array;
            weekValue.push(sourceData[dateStr]);

            //if its end of week or it's end of data, calculate average value and store in returnData
            var date = new Date(dateStr);
            
            if(date.getDay() ===6||dateStr===Object.keys(sourceData).pop()){
               

               //calculate weekly total aqi;
               var weekAqi = 0;
               for (var i = 0; i < weekValue.length; i++) {
                  weekAqi+=weekValue[i];
               }

               //store in returnData
               weekCount+=1;
               returnData["week "+weekCount] = Math.round(weekAqi/weekValue.length);

               //empty weekValue for next week
               weekValue = [];
            }
         }
         break;

      //deal with month
      case 'month': 
         var currentMonth = -1;
         var monthValue = [];
         for(var dateStr in sourceData){
            
            var date = new Date(dateStr);
            if(currentMonth===-1)(currentMonth=date.getMonth());
            
            //if its a new month or end of data then calculate values and store in data;
            if(date.getMonth()!==currentMonth || dateStr===Object.keys(sourceData).pop()){
               
               //calculate monthly total aqi;
               var monthAqi = 0;
               for (var i = 0; i < monthValue.length; i++) {
                  monthAqi+=monthValue[i];
               }

               //store in returnData
               returnData["month "+currentMonth] = Math.round(monthAqi/monthValue.length);

               //empty monthvalue for next month
               currentMonth = date.getMonth();
               monthValue = [];
            }
            monthValue.push(sourceData[dateStr]);
         }
      default:break;
    }
    chartData = returnData;
  }
  /**
   * 渲染图表
   */
  function renderChart() {
    var chart = document.getElementsByClassName('aqi-chart-wrap')[0];
    chart.innerHTML = "";
    var i = 0
    for (var date in chartData) {
      var bar = document.createElement('div');

      //set bar css property
      bar.className = 'aqi-bar-'+pageState.nowGraTime;
      bar.title = date+": "+chartData[date];
      bar.style.width = pixelState[pageState.nowGraTime];
      bar.style.left = i*pixelState[pageState.nowGraTime];
      bar.style.height = chartData[date];
      bar.style.bottom = "-500";
      //change bg color
      //normalize color value
      var color = Math.ceil(chartData[date]/100);
      switch(color){
        case 1: color = "red";break;
        case 2: color = "green";break;
        case 3: color = "blue";break;
        case 4: color = "orange";break;
        case 5: color = "grey";break;
        default: color = "black";
      }
      bar.style.backgroundColor = color;
      chart.appendChild(bar);
      i++;
    }
  }

  /**
   * 日、周、月的radio事件点击时的处理函数
   */
  function graTimeChange(time) {
    // 确定是否选项发生了变化 
    if(pageState.nowGraTime === time){return}
    // 设置对应数据
    pageState.nowGraTime = time;
    converData();
    // 调用图表渲染函数
    renderChart();
  }

  /**
   * select发生变化时的处理函数
   */
  function citySelectChange(city) {
    // 确定是否选项发生了变化 
    if(city === pageState.nowSelectCity){return}
    // 设置对应数据
    pageState.nowSelectCity = city;
    converData();
    // 调用图表渲染函数
    renderChart();
  }

  /**
   * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
   */
  function initGraTimeForm() {
    $("form-gra-time").addEventListener("click",function(event){
        if(event.target.name === "gra-time"){
          graTimeChange(event.target.value);
        }
    });
    
  }

  /**
   * 初始化城市Select下拉选择框中的选项
   */
  function initCitySelector() {
  	var selector = $("city-select");
    var optionContent = "";
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    	for (var city in aqiSourceData){
    		optionContent += "<option>"+ city +"</option>";
    	}
    	selector.innerHTML = optionContent;
      pageState.nowSelectCity = selector.options[selector.selectedIndex].text;
      
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    	selector.addEventListener("change",function(){
    		citySelectChange(selector.options[selector.selectedIndex].text);
    	},false);
  }

  /**
   * 初始化图表需要的数据格式
   */
  function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    converData();
    
    // 处理好的数据存到 chartData 中
    renderChart();
  }

  /**
   * 初始化函数
   */
  function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData(); 
  }


  init();


  //helper functions
  function $(id){
  	return document.getElementById(id);
  }
}
