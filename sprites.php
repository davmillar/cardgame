<html>
<head>
  <title>Card Game Sprites</title>
</head>
<body>

    <?php
      $handle = opendir("./images");
      while (false !== ($file = readdir($handle))) {
        if (substr($file, -4) == ".png") {
          echo "<img src=\"./images/$file\" alt=\"photo\" />\n";
        }
      }
    ?>

</body>
</html>
