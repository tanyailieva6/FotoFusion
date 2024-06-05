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
        $user_array = $_GET['variableName'];
        $user = explode(",",$user_array);

        $user_username = $user[0];
        $user_fullname = $user[1];
        $user_password = $user[2];

        $password_hash = password_hash($user_password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO `users` ( `username`, `fullname`, `password`) VALUES ('$user_username','$user_fullname','$password_hash')";
        
        if($conn->query($sql)===TRUE)
        {
            echo true;
        }
        else
        {
            echo false;
        }

    }

    $conn->close();
?>