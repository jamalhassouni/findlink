<?php
header("Content-Type: application/json");
error_reporting(0);
if(isset($_GET["link"]))
{		
   $main_url=$_GET["link"];
   @$str = file_get_contents($main_url);

   // This Code Block is used to extract title
   if(strlen($str)>0)
   {
     $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
     preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title);

   }
  

   // This Code block is used to extract description 
   $b =$main_url;
   @$url = parse_url( $b ) ;
   @$tags = get_meta_tags( $main_url );

   // This Code Block is used to extract og:image which facebook extracts from webpage it is also considered 
   // the default image of the webpage
   $d = new DomDocument();
   @$d->loadHTML($str);
   $xp = new domxpath($d);
   foreach ($xp->query("//meta[@property='og:image']") as $el)
   {
     $l2=parse_url($el->getAttribute("content"));
     if($l2['scheme'])
     {
	   $img[]=$el->getAttribute("content");
	  // print_r($img2);
     }
     else
     {
	
     }
   }
  
$Pagetitle = $tags['og:title'];
$PageDesc =  $tags['og:description'];
if (empty($Pagetitle)) {
  $Pagetitle = $tags['twitter:title'];
}
 if (empty($PageDesc)) {
 	if (empty($tags['description'])) {
 	$PageDesc = $tags['keywords']; 
 	}
 	elseif (empty($tags['keywords'])) {
 		$PageDesc = $tags['description']; 
 	}elseif($PageDesc == null) {
 	$PageDesc = $tags['twitter:description'];
 	}
 	
 }
 if (is_null($PageDesc)) {
 	$PageDesc = $tags['twitter:description'];
 }

} 
$resonse = array(
"url" => $main_url,
"title" => $title[1],
"Pagetitle" =>$Pagetitle,
"PageDesc" =>$PageDesc,
"image"=>$img[0]

);

echo  json_encode($resonse);

   