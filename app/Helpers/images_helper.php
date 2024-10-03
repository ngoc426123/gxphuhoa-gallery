<?php
if (!function_exists("getImagePath")) {
  function getImagePath($image) {
    return [
      "imagePath" => ROOTPATH . "/" . UPLOAD_DIR . "/" . $image["location"] . "/" . $image["name"],
      "thumbPath" => ROOTPATH . "/" . UPLOAD_DIR . "/" . $image["location"] . "/" . $image["thumb"],
    ];
  }
}

if (!function_exists("getImageUrl")) {
  function getImageUrl($image) {
    return [
      "imageUrl" => "http://localhost/gxphuhoa-gallery-BE/" . UPLOAD_DIR . "/" . $image["location"] . "/" . $image["name"],
      "thumbUrl" => "http://localhost/gxphuhoa-gallery-BE/" . UPLOAD_DIR . "/" . $image["location"] . "/" . $image["thumb"],
    ];
  }
}
?>