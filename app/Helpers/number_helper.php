<?php
if (!function_exists('padding_number')) {
  function padding_number($number, $padding) {
    $num = $number."";

    while (strlen($num) < $padding) {
      $num = "0" . $num;
    }

    return $num;
  }
}
?>