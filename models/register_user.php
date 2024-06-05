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

        // Check if the username already exists
        $stmt = $conn->prepare("SELECT username FROM users WHERE username = ?");
        $stmt->bind_param("s", $user_username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0)
        {
            echo "Username already exists";
        }
        else
        {
            $password_hash = password_hash($user_password, PASSWORD_DEFAULT);

            $insert_stmt = $conn->prepare("INSERT INTO users (username, fullname, password) VALUES (?, ?, ?)");
            $insert_stmt->bind_param("sss", $user_username, $user_fullname, $password_hash);

            if ($insert_stmt->execute())
            {
                echo "User registered successfully";
            }
            else
            {
                echo "Error";
                // echo "Error: " . $conn->error;
            }

            $insert_stmt->close();
        }

        $stmt->close();
    }

    $conn->close();
?>