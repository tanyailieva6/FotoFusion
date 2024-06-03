<?php

class Photo {
    private $dateOfCreation;
    private $author;
    private $device;

    public function __construct($dateOfCreation, $author, $device) {
        $this->dateOfCreation = $dateOfCreation;
        $this->author = $author;
        $this->device = $device;
    }

    public function getDateOfCreation() {
        return $this->dateOfCreation;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function getDevice() {
        return $this->device;
    }
}
?>
