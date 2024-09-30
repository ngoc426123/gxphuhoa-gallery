<?php 
if (!function_exists('pr')) {
  function pr($data) {
    echo '<pre>';
    print_r($data);
    echo '</pre>';
  }
}

if(!function_exists("getImageName")){
	function getImageName(){
		// OPTION
		$number_word=30;
		// DATE
		$now    = getdate();
		$second = $now["seconds"];
		$minute = $now["minutes"];
		$hour   = $now["hours"];
		$day    = $now["mday"]; if(strlen($day)==1){$day="0".$day;}
		$month  = $now["mon"]; if(strlen($month)==1){$month="0".$month;}
		$year   = $now["year"];
		// RAMDOM NAME
		$name="gx_";
		for ($i=0; $i < $number_word; $i++) { 
			$name.=mt_rand(0,9);
		}
		$name.="_".$day.$month.$year;
		return $name;
	}
}
?>