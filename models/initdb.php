<!--
    Initializes the database
-->

<?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;

    $conn = new mysqli($servername, $user_server, $password_server, $dbname);
    
    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
    }

    $conn->close();
?>