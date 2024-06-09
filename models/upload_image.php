<?php
include 'DB.php';

$servername = $_SERVERNAME;
$user_server = $_USER_SERVER;
$password_server = $_PASSWORD_SERVER;
$dbname = $_DBNAME;

$conn = new mysqli($servername, $user_server, $password_server, $dbname);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    function uploadImage($conn) {
        // $uploadDir = 'uploads/'; // Directory for the uploaded images
        $uploadDir = './uploads/'; // Directory for the uploaded images
        
        if (!is_dir($uploadDir))
        {
            mkdir($uploadDir, 0777, true);
        }

        $author = $_GET['author'];

        $tempFile = $_FILES['image']['tmp_name'];
        $originalFileName = basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $originalFileName;
        
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        $check = getimagesize($tempFile);
        if($check !== false)
        {
            echo "File is an image - " . $check['mime'] . ".<br>";
            $uploadOk = 1;
        }
        else
        {
            echo "File is not an image.<br>";
            $uploadOk = 0;
        }

        if (file_exists($targetFile))
        {
            echo "Sorry, file already exists.<br>";
            $uploadOk = 0;
        }

        if ($_FILES['image']['size'] > 5000000)
        {
            echo "Sorry, your file is too large.<br>";
            $uploadOk = 0;
        }

        $allowedTypes = array("jpg", "jpeg", "png", "gif");
        if(!in_array($imageFileType, $allowedTypes))
        {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
            $uploadOk = 0;
        }

        if ($uploadOk == 0)
        {
            echo "Sorry, your file was not uploaded.<br>";
        }
        else
        {
            // Move the uploaded file to the target directory
            if (move_uploaded_file($tempFile, $targetFile))
            {
                echo "The file " . htmlspecialchars($originalFileName) . " has been uploaded.<br>";

                // Prepare the SQL statement to insert the image record
                $stmt = $conn->prepare("INSERT INTO images (author, image_dir) VALUES (?, ?)");
                if (!$stmt)
                {
                    echo "Failed to prepare statement: " . $conn->error . "<br>";
                    return;
                }
                
                $stmt->bind_param("ss", $author, $targetFile);
                
                // Execute the statement and check for errors
                if ($stmt->execute())
                {
                    echo "Record added successfully.<br>";
                }
                else
                {
                    echo "Error: " . $stmt->error . "<br>";
                }

                // Close the statement
                $stmt->close();
            }
            else
            {
                echo "Sorry, there was an error uploading your file.<br>";
            }
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_FILES['image']))
    {
        uploadImage($conn);
    }
}


$conn->close();
?>
