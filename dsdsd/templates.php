<?php

add_shortcode( 'form_step_1', 'step_1_func' );
function step_1_func( $atts ) {
    // if(! $_SERVER['REQUEST_METHOD'] === 'POST'){
    //     return '<h3>You Have To Follow Proper Procedure </h3>';
    // }

    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-1.php');
	return ob_get_clean();
}


add_shortcode( 'form_step_2', 'step_2_func' );
function step_2_func( $atts ) {
    if(! $_SERVER['REQUEST_METHOD'] === 'POST'){
        return '<h3>You Have To Follow Proper Procedure </h3>';
    }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-2.php');
	return ob_get_clean();
}


add_shortcode( 'form_step_3', 'step_3_func' );
function step_3_func( $atts ) {
    if(! isset($_POST['trademark_id'])){
        return '<h3>You Have To Follow Proper Procedure </h3>';
    }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-3.php');
	return ob_get_clean();
}


add_shortcode( 'form_step_4', 'step_4_func' );
function step_4_func( $atts ) {
    if(! isset($_POST['trademark_id'])){
        return '<h3>You Have To Follow Proper Procedure </h3>';
    }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-4.php');
	return ob_get_clean();
}


add_shortcode( 'form_step_5', 'step_5_func' );
function step_5_func( $atts ) {
    if(! isset($_POST['trademark_id'])){
        return '<h3>You Have To Follow Proper Procedure </h3>';
    }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-5.php');
	return ob_get_clean();
}


add_shortcode( 'form_step_6', 'step_6_func' );
function step_6_func( $atts ) {
    if(! isset($_POST['trademark_id'])){
        return '<h3>You Have To Follow Proper Procedure </h3>';
    }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-6.php');
	return ob_get_clean();
}



add_shortcode( 'form_step_7', 'step_7_func' );
function step_7_func( $atts ) {
//     if(! isset($_POST['trademark_id']) && ! isset($_GET['trademark_id'])){
//         return '<h3>You Have To Follow Proper Procedure </h3>';
//     }
    $atts = shortcode_atts(
        array(
            'link' => '#',
        ),
        $atts
    );
    $link = $atts['link'];
    ob_start();
    require_once('step-7.php');
	return ob_get_clean();
}




add_shortcode( 'form_step_all', 'form_step_all_func' );
function form_step_all_func( $atts ) {
    ob_start();
    require_once('step-all.php');
	return ob_get_clean();
}



if (!function_exists('str_contains')) {
    function str_contains (string $haystack, string $needle)
    {
        return empty($needle) || strpos($haystack, $needle) !== false;
    }
}


function form_scripts() {
    $page= get_post(get_the_ID());
    $content = $page->post_content ;
    $match='[form_step_';
    if(str_contains($content, $match)){
        wp_register_style('layout',  plugins_url('/assets/css/layout.css', __FILE__) , array(), '1.0', 'all');
        wp_register_style('layout-style', plugins_url('/assets/css/style.css', __FILE__) , array(), '1.0', 'all');
        wp_register_style('checkout-popup', plugins_url('/assets/css/checkout_popup.css', __FILE__) , array(), '1.0', 'all');
        wp_enqueue_style('layout');
        wp_enqueue_style('layout-style');
        wp_enqueue_style('checkout-popup');
        wp_enqueue_script( 'custom', plugins_url('/assets/js/custom.js', __FILE__)  , array( 'jquery' ),'',true );
        wp_enqueue_script( 'dev', plugins_url('/assets/js/dev.js', __FILE__), array( 'jquery' ,'custom'),'',true );
        wp_enqueue_script( 'copjs', plugins_url('/assets/js/copjs.js', __FILE__), array(),'',true );
    }
    
}
add_action( 'wp_enqueue_scripts', 'form_scripts' );





