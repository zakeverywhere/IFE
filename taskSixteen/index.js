window.onload = function(){
	


	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {
		"北京": 90,
	    "上海": 40
	};

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var city = document.getElementById('aqi-city-input').value.trim();
		var value = document.getElementById('aqi-value-input').value.trim();
		var cityFlag=/[^\u4e00-\u9fa5\a-zA-Z]/.test(city);
		var valueFlag=/[^0-9]/.test(value);

		if(cityFlag){
			console.log("please enter a valid city name!");
			return;
		}
		if(valueFlag){
			console.log("please enter a valid api value!");
		}
		aqiData[city]=value;
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var tableContent = 
		"<tr><th>city</th><th>aqi</th><th>delete</th></tr>";
		//build table from data
		for (var city in aqiData){
			tableContent+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>delete</button></td></tr>"
		}
		var table = document.getElementById("aqi-table");
		table.innerHTML = city ? tableContent:"";
	}
	

	
	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(city) {
	  // do sth.
	  delete aqiData[city];
	  renderAqiList();
	}

	function init() {
		
		renderAqiList();
		// 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
		var btn = document.getElementById('add-btn');
		btn.addEventListener("click",function(){
			addBtnHandle();
		})
	  	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	 	 //this will be done in rendering state.
	 	 document.getElementById("aqi-table").addEventListener('click',function(event){
	 	 	if(event.target.nodeName.toLowerCase()==='button'){
	 	 		delBtnHandle(event.target.dataset.city);
	 	 	}
	 	 })
	}

	init();
}
