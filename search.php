<?php

$searchTerm = htmlspecialchars($_GET['q']);

if (!empty($searchTerm)) {
    
    echo "Search Results: " . $searchTerm;
   
} else {
    echo "Please Enter ";
}
?>
