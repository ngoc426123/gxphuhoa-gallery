<?php
if (!function_exists('get_current_time')) {
  function get_current_time() {
    date_default_timezone_set("Asia/Ho_Chi_Minh");

    return date("d/m/Y h:i:s");
  }
}
?>