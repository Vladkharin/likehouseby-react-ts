<?php

$name = $_POST['name'];
$tel = $_POST['tel'];
$choice = $_POST['choice'];

if (!$name or !$tel) {
    exit;
}


$json = (object) [
    'Имя' => $name,
    'Телефон' => $tel,
    'Предложение Клиенту' => $choice
];

$dir = opendir('orders');
$count = 0;
while ($file = readdir($dir)) {
    if ($file == '.' || $file == '..' || is_dir('orders' . $file)) {
        continue;
    }
    $count++;
}

$fp = fopen('orders/' . $count + 1 . '.json', 'w');

fwrite($fp, json_encode($json, JSON_UNESCAPED_UNICODE));

fclose($fp);

$conn_id = ftp_connect('37.140.192.156');

$login_result = ftp_login($conn_id, 'u2316755', 'C27hV2aj7bEjwS7W');

ftp_pasv($conn_id, true);

$file = __DIR__ . '/orders/' . $count + 1 . '.json';

if (ftp_put($conn_id, 'www/likehouse.org/orders/' . basename($file), $file, FTP_ASCII)) {

    echo 'Файл успешно загружен';

} else {

    echo 'Не удалось загрузить файл';

}

ftp_close($conn_id);