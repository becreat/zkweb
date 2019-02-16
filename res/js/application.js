


/**
 * Node Modules 
 */
 var exec = require('child_process').execFile;
 var http  = require('http');
 var DB = require('sqlite3');






/**
 * init Angular  Main Aplication
 */
(function(){
	
	var modules = [
		'ngSanitize'
	];

 	var app = angular.module('ZKweb',modules);


 	app.controller('Main',function($scope){
 		$scope.oldtime = localStorage.getItem('oldtime');
 		$scope.mstart = false;



 		$scope.start = function()
 		{
 			exec('C:/ZKTeco/ZKAccess3.5/Access.exe'); 
 			$scope.mstart = true;
 			$scope.msg = '<code><font color="green">Starting.....</font></code>';
 			$scope.msg += '<code><br><font color="green">Started.....</font></code>';
 			
 			

 			setInterval(function(){

 				DB.query('SELECT top 1 * FROM acc_monitor_log where verified = 1 order by id desc')
 					.on('done', function (data){
 						
 									

 						if($scope.oldtime == data.records[0].time)
 						{
 							
 							
 						}else{
 							$scope.oldtime = data.records[0].time;
 							localStorage.setItem('oldtime',data.records[0].time);
 							
 							
 							var url = 'http://unicoreplus.com/office/Attendance/UpdateAttendanceByBio/'+data.records[0].pin;
 								
 								

 							http.get(url,function(){
 								$scope.msg += ' <code><br> <font color="blue"> Attendance taken for  ID : <strong>' + data.records[0].pin + '</strong> ';
 								$scope.$apply();
 							});
 							
 						}

 						

 					})

 			},2000);


 		
 			

 			
 		}
 	});

})();








/**
 * Live Loading 
 */

//LiveWatchDir('res');

function LiveWatchDir(path)
{

  fs.watch(path, function() {
     if (location)
       location.reload();
  });
  
  var dir = fs.readdirSync(path);
 
  dir.forEach(function(dir){
    
    if(dir.indexOf('.') == -1){
      var newpath = path + '\\' + dir;
      LiveWatchDir(newpath);

    }

    
  });

}






