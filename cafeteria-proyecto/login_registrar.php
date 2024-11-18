<?php
include('conexion.php'); 

$nombre_completo = $_POST["nombreCompleto"];
$correo = $_POST["correo"];
$contraseña = $_POST["contraseña"];


//login
if(isset($_POST["btningresar"])){
    $query = mysqli_query($conn,"SELECT * FROM clientes WHERE  correo = '$correo' AND contraseña = '$contraseña'");
    $nr = mysqli_num_rows($query);

    if($nr==1)
    {
        echo "<script> alert('Bienvenido: $nombre_completo'); window.location='index.html' </script>";
    }else
    {
        echo"<script> alert('El usuario no existe'); window.location='loginvista.html'</script>";
    }
    
}

//Registrar
if(isset($_POST["btnregistrar"]))
{
    $sqlgrabar = "INSERT INTO clientes (nombreCompleto, correo, contraseña) values ('$nombre_completo', '$correo', '$contraseña')";
    if(mysqli_query($conn, $sqlgrabar))
    {
        echo "<script> alert('Usiario resgistrado exitosamente: $nombre_completo'); window.location='loginvista.html' </script>";
    } 
    else 
    {
        echo "Error al registrar usuario: ".$sql. mysqli_error($conn);
    }
} 
?>