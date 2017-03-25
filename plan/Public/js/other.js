/**
 * 目前报名的总人数
 */
var totalNumber = 0;
/**
 * 总人数上限
 */
var targetNumber = 500;
var loadingPath = '../Public/images/';

getTotalNumber();

/**
 * the callback function
 * callback handle when click submit button
 *
 * @param  {[Object]} submitObj            [the information of user input]
 * @param  {[Function]} startAnimation     [start perform animation]
 * @param  {[Function]} processAnimation   [the process of loading]
 * @param  {[Function]} endAnimation       [end animation when ajax complete]
 */
function submitInformation(submitObj, startAnimation, processAnimation, endAnimation){
	startAnimation();
	//eg:
	// $.ajax({
	// 	type: 'post', //OR GET
	// 	url: '...',
	// 	data: submitObj，
	// 	success: function(res){
	// 		endAnimation()
	// 	}
	// })

	var _process = 1; //进度： 1-100

	//模拟请求进度
	var _timer = setInterval(function(){
		_process ++
		if(_process >100){
			clearInterval(_timer);
			//request is ended, so perform 'endAnimation' to stop loading
			setTimeout(function(){
				endAnimation()
			}, 300);
			return ;
		}
		//_process 参数是当前进度值
		processAnimation(_process);
	}, 30)
}

/**
 * 总人数
 */
function getTotalNumber(){
	//you can use ajax to get the number and set it into 'totalNumber'
	totalNumber = 100;
}
