<?php

require_once('Photo.php');

class PhotoGallery {
    private $name;
    private $tags;
    private $photos = array();

    public function __construct($name, $tags) {
        $this->name = $name;
        $this->tags = $tags;
    }

    public function addPhoto($dateOfCreation, $author, $device) {
        $photo = new Photo($dateOfCreation, $author, $device);
        $this->photos[] = $photo;
    }

    public function getPhotos() {
        return $this->photos;
    }

    public function getName() {
        return $this->name;
    }

    public function getTags() {
        return $this->tags;
    }
}

// // Example Usage:
// $gallery = new PhotoGallery("My Gallery", "nature, landscape");
// $gallery->addPhoto("2024-06-01", "John Doe", "iPhone");
?>
