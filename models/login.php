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
        $array = $_GET['variableName'];
        $user_att = explode(",",$array);
        $checkThisUsername = $user_att[0];
        $checkThisPassword = $user_att[1];

        // Prevent SQL injection
        $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
        $stmt->bind_param("s", $checkThisUsername);
        $stmt->execute();
        $stmt->store_result();

        if($stmt->num_rows > 0)
        {
            $stmt->bind_result($hashed_password);
            $stmt->fetch();

            if(password_verify($checkThisPassword, $hashed_password))
            {
                echo "Login successful";
            }
            else
            {
                echo "Incorrect password";
            }
        }
        else
        {
            echo "User not found";
        }
        $stmt->close();
        
    }

    $conn->close();
?>