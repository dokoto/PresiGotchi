<?php


header('Content-Type: application/json');


$buscar = $_GET['buscar'];
$url = 'https://es.fotolia.com/search?filters%5Bcontent_type%3Aall%5D=1&search-submit=Buscar&k=' . $buscar;
$homepage = file_get_contents($url);




preg_match_all('/\< *[img][^\>]*[src] *= *[\"\']{0,1}([^\"\']*)/i', $homepage, $salida);


//print_r($salida);

echo json_encode($salida[1]);



//echo($result);




?>
