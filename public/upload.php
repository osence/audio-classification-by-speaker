<?php
$uploads_dir = '../records';
$input = $_FILES['audio_data']['tmp_name']; //temporary name that PHP gave to the uploaded file
$output = $_FILES['audio_data']['name'].".wav"; //letting the client control the filename is a rather bad idea

$path = "$uploads_dir/$output";
//move the file from temp name to local folder using $output name
move_uploaded_file($input, $path);
