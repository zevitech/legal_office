<?php

/**
 * Plugin Name: Dyweb Forms Template
 * Description: The most advanced addons for Elementor with tons of widgets, layout pack and powerful custom controls.
 * Plugin URI: http://dywebsolution.com/
 * Author: 0xAungkon
 * Version: 1.0.0
 * Author URI: http://dywebsolution.com/
 */


function save_the_first_step(){
	if($_SERVER['REQUEST_METHOD'] === 'POST'){
		$data=array('Name'=>$_POST['Name'],'Email'=>$_POST['Email'],'Phone'=>$_POST['Phone'],'Type'=>$_POST['Messages']);
		$data_files=$_FILES;

		  $to = 'secureyourmark@gmail.com';
		  $subject = 'Trademarks Leads - '.$data['Name'].' - '.$data['Email'];
		  $message = '<html><body>';
		  $message .= '<h1>Lead Information</h1>';
		  $message .= '<table border="1">';



		  foreach($data as $key=>$value){
			$message .= '<tr><td>'.$key.'</td><td>'.$value.'</td></tr>';
		  }

		  $message .= '</table>';
		  $message .= '</body></html>';

		  $headers[] = 'Content-Type: text/html; charset=UTF-8';


		  wp_mail( $to, $subject, $message, $headers );


		$post_data = array(
			'post_title'    => $_POST['Name'].' - '.$_POST['Email'],
			'post_status'   => 'draft',
			'post_type'     => 'trademark_registers'
		);

		$post_id = wp_insert_post( $post_data );

		foreach($data as $key=>$value ){
			$key=str_replace('_',' ',$key);
			$key=ucfirst($key);
			update_post_meta( $post_id, $key, $value );
		}
		$file_url=save_post_file_to_folder();
		if($file_url){

			update_post_meta( $post_id, 'trademark_project_logo', $file_url );
		}
		return $post_id;

	}
	else{
		
      	return false;
	}
    

    
}



function save_post_file_to_folder() {
    $folder_name = 'trademark-contents';

    // Define the full path to wp-content directory
    $wp_content_dir = WP_CONTENT_DIR;

    // Define the full path to the new folder
    $new_folder_path = $wp_content_dir . '/' . $folder_name;

    

    // Check if there are any uploaded files
    if (!empty($_FILES)) {
        $file = $_FILES['trademark_project_logo']; // Change 'file' to the name of your file input field

        // File path where it will be saved
        $fl_name=time() . $file['name'];
        $file_path = $new_folder_path . '/'.$fl_name;
        
        // Move the uploaded file to the folder
        if (move_uploaded_file($file['tmp_name'], $file_path)) {
            // File was saved successfully, return its URL
            $file_url = content_url() . '/' . $folder_name . '/' . $fl_name;
            return $file_url;
        } else {
            // File couldn't be saved
            return false;
        }
    }
    
    // No file was uploaded
    return false;
}





function form_logics(){
    if(isset($_POST['trademark_id'])){
        $data=$_POST;
        $post_id=$data['trademark_id'];
        foreach($data as $key=>$value ){
            $key=str_replace('_',' ',$key);
            $key=ucfirst($key);
            update_post_meta( $post_id, $key, $value );
        }

        $file_url=save_post_file_to_folder();
        if($file_url){
            
            update_post_meta( $post_id, 'trademark_project_logo', $file_url );
        }
        
    }
    if(isset($_GET['trademark_id'])){
        $data=$_GET;
        $post_id=$data['trademark_id'];
        foreach($data as $key=>$value ){
            $key=str_replace('_',' ',$key);
            $key=ucfirst($key);
            update_post_meta( $post_id, $key, $value );
        }
    }
    
}


include_once('templates.php');





// Secure Your Mark | Step 1
// Secure Your Mark | Step 2
// The most trusted brand to register your trademark and protect your brand, name, logo, or slogan.



function onc_campaign_form() {

if(isset($_GET['safe_redirect']) && isset($_GET['pay_url']) && isset($_GET['trademark_id'])){
    $post_id = get_post($_GET['trademark_id']);
    
  
    $post = get_post($post_id);
  
    if ($post && get_post_status($post_id) == 'draft') {
      $post_data = array(
        'ID'          => $_GET['trademark_id'],
        'post_status' => 'publish',
      );
    
      // Update the post into the database
      wp_update_post($post_data);
      $arr=get_post_meta($_GET['trademark_id'],'');
      $to = 'secureyourmark@gmail.com';
      $subject = 'Trademarks Request - '.$arr['Name'][0].' - '.$arr['Email'][0].' - '.$_GET['trademark_id'];
      $message = '<html><body>';
      $message .= '<h1>Information</h1>';
      $message .= '<table border="1">';
  
  
     
      foreach($arr as $key=>$value){
        $message .= '<tr><td>'.$key.'</td><td>'.$value[0].'</td></tr>';
      }
      if(isset($arr['trademark_project_logo'])){
        $message .= '<tr><td>logo</td><td><img width="200" src="'.$arr['trademark_project_logo'][0].'" alt="Image"></td></tr>';
      }
      
      $message .= '</table>';
      $message .= '</body></html>';
    
      $headers[] = 'Content-Type: text/html; charset=UTF-8';
    
      
      wp_mail( $to, $subject, $message, $headers );
      header("Location: ".$_GET['pay_url']);
      exit();
    }
    else{
        
    }
  
  
    
  }
	else{
		
    // commit: fixed by anik 
		if(isset($_POST['action_double']) && isset($_POST['trademark_id'])){
		  $post_data = array(
			'ID'          => $_POST['trademark_id'],
			'post_status' => 'publish',
		  );
		  wp_update_post($post_data);

			$data=$_POST;
			$post = get_post($_POST['trademark_id']);
			$post_id=$post->ID;

			if ($post) {
				foreach($data as $key=>$value ){
				$key=str_replace('_',' ',$key);
				$key=ucfirst($key);
				update_post_meta( $post_id, $key, $value );
			}
			$file_url=save_post_file_to_folder();
			if($file_url){
				update_post_meta( $post_id, 'trademark_project_logo', $file_url );
			}

		  // Update the post into the database
		  $arr=get_post_meta($_POST['trademark_id'],'');
		  $to = 'secureyourmark@gmail.com';
		  $subject = 'Trademarks Request - '.$arr['Name'][0].' - '.$arr['Email'][0].' - '.$_POST['trademark_id'];
		  $message = '<html><body>';
		  $message .= '<h1>Information</h1>';
		  $message .= '<table border="1">';

		  foreach($arr as $key=>$value){
			$message .= '<tr><td>'.$key.'</td><td>'.$value[0].'</td></tr>';
		  }
		  if(isset($arr['trademark_project_logo'])){
			$message .= '<tr><td>logo</td><td><img width="200" src="'.$arr['trademark_project_logo'][0].'" alt="Image"></td></tr>';
		  }

		  $message .= '</table>';
		  $message .= '</body></html>';
		  $headers[] = 'Content-Type: text/html; charset=UTF-8';

		  wp_mail( $to, $subject, $message, $headers );
		  header("Location: https://secureyourmark.com/lp/");
		  exit();
		}
    
	}
}




    $folder_name = 'trademark-contents';

    // Define the full path to wp-content directory
    $wp_content_dir = WP_CONTENT_DIR;

    // Define the full path to the new folder
    $new_folder_path = $wp_content_dir . '/' . $folder_name;

    // Check if the folder doesn't exist
    if (!file_exists($new_folder_path)) {
        
        // Create the folder if it doesn't exist
        mkdir($new_folder_path);
    }

    $labels = array(
        'name'                  => _x( 'Trademark Registers', 'Post Type General Name', 'text_domain' ),
        'singular_name'         => _x( 'Trademark Register', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'             => __( 'Trademark Registers', 'text_domain' ),
        'archives'              => __( 'Item Archives', 'text_domain' ),
        'attributes'            => __( 'Item Attributes', 'text_domain' ),
        'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
        'all_items'             => __( 'All Items', 'text_domain' ),
        'add_new_item'          => __( 'Add New Item', 'text_domain' ),
        'add_new'               => __( 'Add New', 'text_domain' ),
        'new_item'              => __( 'New Item', 'text_domain' ),
        'edit_item'             => __( 'Edit Item', 'text_domain' ),
        'update_item'           => __( 'Update Item', 'text_domain' ),
        'view_item'             => __( 'View Item', 'text_domain' ),
        'view_items'            => __( 'View Items', 'text_domain' ),
        'search_items'          => __( 'Search Item', 'text_domain' ),
        'not_found'             => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
        'featured_image'        => __( 'Featured Image', 'text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
        'items_list'            => __( 'Items list', 'text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Trademark Register', 'text_domain' ),
        'description'           => __( 'Trademark Register Type Description', 'text_domain' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'custom-fields' ),
        'hierarchical'          => false,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'capability_type'       => 'post',
    );
    register_post_type( 'trademark_registers', $args );
    form_logics();
}
add_action( 'init', 'onc_campaign_form', 0 );





