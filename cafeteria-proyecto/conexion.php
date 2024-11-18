<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "conexion";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if (!$conn) 
{
    die("Conexion fallida:" . mysqli_connect_error());
}

?>