<?php
/*
Plugin Name: Opciones del home
Plugin URI: https://github.com/HelaGone/CoverOptions-v2
Description: Este plugin permite configurar el contenido del home de cualquier tema de wordpress
Author: Laura Ram&iacute;rez & TLJ
Version: 2.0
*/

// in the main plugin file
add_action( 'admin_menu', 'add_plugin_page' );
add_action( 'admin_init', 'page_init'  );
/* Obtiene la busqueda de los temas */
add_action('wp_ajax_get_topic','get_taxonomy_tema');
/* Obtiene la busqueda de los temas */
add_action('wp_ajax_get_posts','get_posts_by_tema');
/* Guarda los temas */
add_action('wp_ajax_save_themes','save_theme');
/* Obtiene los temas */
add_action('wp_ajax_get_themes','get_all_themes');
/* Eliminar los temas */
add_action('wp_ajax_delete_theme','delete');
/* Cambia el orden de los temas */
add_action('wp_ajax_change_order','chenge_order_themes');
/* Guardar transmision en vivo */
add_action('wp_ajax_save_trans_vivo','save_transmision_vivo');
/* Obtiene transmision en vivo */
add_action('wp_ajax_get_trans_vivo','get_transmision_vivo');
/* Obtiene el feed main_theme_home */
add_action('wp_ajax_save_main_theme_home','save_main_theme');
add_action('wp_ajax_save_update_edit','save_edit');
add_action('wp_ajax_get_update_edit','get_feed_editorial_update');


/* Add options page	 */
function add_plugin_page(){
	// This page will be under "Settings"
	add_options_page(
		'Opciones del home',
		'Opciones del home',
		'manage_options',
		'options-home',
		'create_admin_page'
	);
}

function create_admin_page(){
	//add_action('admin_post_accion', 'nombre_de_la_funcion'); // Para usuarios logueados
	?>
	<div class="wrap">
		<div id="ophome-tabs">
		  <ul>
		    <li><a href="#tabs-1">Temas del home</a></li>
		    <li id="link_tab_2"><a href="#tabs-2">Transmisi&oacute;n en vivo</a></li>
		    <li id="link_tab_3"><a href="#tabs-3">Selecci&oacute;n del editor</a></li>
		  </ul>
			<div id="tabs-1"></div>
			<div id="tabs-2">
  			<h1>Transmisi&oacute;n en vivo</h1>
				<form method="post">

					<div class ="opch_txt_block">
						<div class = "opch_txt_left">T&iacute;tulo : </div>
						<div> <input  type="text"   id="title_trans_vivo" size = "70" placeholder=" T&iacute;tulo transmisi&oacute;n en vivo" /></div>
					</div>
					<div class ="opch_txt_block">
						<div class = "opch_txt_left">Imagen : </div>
						<input id="image-url" size = "55" type="text" name="image" placeholder="Selecciona una imagen" />
						<input id="upload-button" type="button" class="button" value="Upload Image" />
					</div>
					<div class="opch_txt_block" id="live_url_container" hidden>
						<div class="opch_txt_left">
							URL en vivo
						</div>
						<div>
							<input id="live-url" type="text" name="live_url" size="70" placeholder="https://www.youtube.com/watch?v=rlDrH4VLeyU"> <br/>
							<label id="live_url_field" for="live_url"><em>Llenar solo en caso de tratarse de Youtube o Facebook</em></label>
						</div>
					</div>
					<div class = "opch_txt_block">
						<div class = "opch_txt_left"> Activar  </div>
						<input type="checkbox" id ="active_transmision">
						<label for="channel">
							FOROtv
							<input type="radio" name="channel" value="FOROtv" checked>
						</label>
						<label for="channel">
							Las Estrellas
							<input type="radio" name="channel" value="Las Estrellas">
						</label>
						<label for="channel">
							Youtube
							<input type="radio" name="channel" value="Youtube">
						</label>
						<label for="channel">
							Facebook
							<input type="radio" name="channel" value="Facebook">
						</label>
					</div>
					<div class ="opch_save">
						  <input class ="button button-primary button-large" id="save_transmision_vivo" type="button" value="Guardar" />
					</div>
				</form>
			</div>
			<div id="tabs-3">
  			<h1>Selecci&oacute;n del editor</h1>
  			<div class ="opch_txt_block">
  				<div class = "opch_txt_left"> Resumen : </div>
  				<div>
						<textarea name="textarea" id="summary_edit" rows="10" cols="69"  placeholder="Escribe el resumen aqu&iacute;"></textarea>
					</div>
 				</div>
  			<div class ="opch_txt_block">
					<div class = "opch_txt_left">Nota 1 : </div>
					<div>
						<input type = "text" name = "note_edit_update" size = "70" id = "name_note_edit_0" placeholder="Buscar nota 1">
						<input type ="hidden" id ="id_note_edit_0" >
          </div>
          <div class="resultado_temas_cont" id="res_note_edit_0"></div>
				</div>
				<div class ="opch_txt_block">
					<div class = "opch_txt_left">Nota 2 : </div>
          <div>
						<input type = "text" name = "note_edit_update" size = "70" id = "name_note_edit_1" placeholder="Buscar nota 2">
						<input type ="hidden" id ="id_note_edit_1" >
          </div>
          <div class="resultado_temas_cont" id="res_note_edit_1"></div>
				</div>
				<div class ="opch_txt_block">
          <div class = "opch_txt_left">Nota 3 : </div>
          <div>
            <input type = "text" name = "note_edit_update" size = "70" id = "name_note_edit_2" placeholder="Buscar nota 3">
            <input type ="hidden" id ="id_note_edit_2" >
          </div>
          <div class="resultado_temas_cont" id="res_note_edit_2"></div>
				</div>
				<div class = "opch_txt_block">
					<div class = "opch_txt_left"> Activar  </div>
					<input type="checkbox" id ="active_edit_update">  &nbsp;
				</div>
				<div class ="opch_save">
	  			<input class ="button button-primary button-large" id ="save_update_edit" type="button" value="Guardar" />
				</div>
			</div>
		</div>
	</div>
	<?php
}

function page_init(){
	$title_plugin =get_admin_page_title();
	if( $title_plugin  !="Opciones del home"){
		return false ;
	}else{
		wp_enqueue_media();
		wp_register_script('opc_home', plugin_dir_url( __FILE__ ) . 'js/script.js',array('jquery' ,'jquery-effects-core','jquery-core' ,'jquery-ui-selectable'), '1', true );
		wp_enqueue_script("jquery-ui-tabs");
		wp_enqueue_script('opc_home');
  	wp_localize_script('opc_home','opc_vars',[ 'ajaxurl' => admin_url('admin-ajax.php') ]);
  	wp_register_style('opc_style',   plugin_dir_url( __FILE__ ) . 'css/style.css' );
		wp_enqueue_style('opc_style');
		wp_register_style('opc_style_2',plugin_dir_url( __FILE__ ) . 'css/base-jquery-ui.css');
		wp_enqueue_style('opc_style_2');
	}
}

function get_taxonomy_tema(){
	global  $wpdb;
	$arr = array();
	$str = $_POST["theme_search"];
	$filter ="";
	if($str != ""){
		$filter =  " AND t.name LIKE '%".$str."%' ";
	}
	$qry = "SELECT t.name, t.term_id, term_taxonomy_id
		FROM wp_term_taxonomy tt
		INNER JOIN wp_terms t using (term_id)
		WHERE taxonomy = 'TEMA'".$filter." ORDER BY term_taxonomy_id LIMIT 0, 20 ;";
	$temas = $wpdb->get_results( $qry );
	$n=0;
	foreach( $temas as $row ) {
		$id = $row->term_id;
		$description = $row->name;
		$arr[$n]["id"] = $id;
		$arr[$n]["tema"] =$description ;
		$n++;
	}
	$json = json_encode ($arr);
	echo $json;
	wp_die();
}

function get_posts_by_tema(){
	global  $wpdb;
	$arr = array();
	$filter = array();
	if(isset($_POST["theme_search"]) && $_POST["theme_search"] != ""){
		array_push($filter,  " term_id = ".$_POST["theme_search"]);
	}
	if(isset ($_POST["title_search"]) && $_POST["title_search"] != ""){
		array_push($filter,  " post_title LIKE '%".$_POST["title_search"]."%'");
	}
	$fil_total = count($filter);
	if($fil_total  == 2) {
		//Cuando busca por tema y por término de búsqueda
		$qry_where  = " WHERE ".$filter[0]. " AND ".$filter[1]. " AND post_status ='publish' AND post_type NOT IN('video' , 'amp_validated_url')";
		$qry = "SELECT t.term_id, name , term_taxonomy_id , ID, post_title , post_name
			FROM wp_terms t
			INNER JOIN wp_term_taxonomy USING(term_id)
			INNER JOIN wp_term_relationships tr USING (term_taxonomy_id)
			INNER JOIN wp_posts p
			ON tr.object_id = p.ID" . $qry_where ." ORDER BY post_modified DESC  LIMIT 0, 20";

	}else if($fil_total  == 1){
		// Cuando busca por tema sin término de búsqueda
		$qry_where  = " WHERE ".$filter[0] . " AND post_status ='publish' AND	post_type NOT IN('video' , 'amp_validated_url')";
		$qry = "SELECT ID, post_title , post_name
			FROM wp_terms t
			INNER JOIN wp_term_taxonomy USING(term_id)
			INNER JOIN wp_term_relationships tr USING (term_taxonomy_id)
			INNER JOIN wp_posts p ON tr.object_id =p.ID
			".$qry_where ." Group by ID ORDER BY post_modified DESC LIMIT 0, 50";

		//$qry ="SELECT  ID, post_title , post_name FROM  wp_posts ".$qry_where ." ORDER BY post_modified DESC  LIMIT 0, 50 ;";
	}else if($fil_total  == 0){
		$qry ="SELECT  ID, post_title , post_name FROM  wp_posts WHERE post_status ='publish' AND  post_type IN ('breaking' , 'noticia'  , 'especiales') ORDER BY post_modified DESC  LIMIT 0, 70 ;";
	}
	$posts = $wpdb->get_results($qry);
	$n=0;
	foreach( $posts as $row ) {
		$id = $row->ID;
		$post_title = $row->post_name;
		$arr[$n]["id"] = $id;
		$arr[$n]["post_title"] =$post_title ;
		$n++;
	}
	$json = json_encode ($arr);
	echo $json;
	wp_die();
}

function save_theme(){
	$opc = $_POST["tema"];
	$val = $_POST["datos"];
	update_option($opc , $val  , "no" );
	wp_die();
}

function get_all_themes(){
	global  $wpdb;
	$arr2 = array();
	$qry = "SELECT option_id, option_name, option_value FROM wp_options WHERE option_name = 'main_home_theme'";
	$themes = $wpdb->get_results( $qry );
	if(count($themes)>0){
		foreach( $themes as $row ) {
			$value = unserialize ($row->option_value);
			$total_themes = count($value);
			for($i=0 ; $i<$total_themes ; $i++){
				$orden = $value[$i]["order"];
				$option_name_child= $value[$i]["option_name"];
				$qry2 = "SELECT option_id, option_name, option_value FROM wp_options WHERE option_name =  '$option_name_child'";
				$child_theme= $wpdb->get_results( $qry2 );
				if(count($child_theme)>0){
					$valor2 =  unserialize($child_theme[0]->option_value);
					$arr = array(
						"option_id" => $child_theme[0]->option_id,
						"option_name" => $child_theme[0]->option_name,
						"value" => $valor2
					);
					array_push($arr2, $arr);
				}
			}
		}
		$json = json_encode ($arr2 );
	}
	echo $json;
	wp_die();
}

function delete(){
	$theme = $_POST["theme_name"];
	$delete = delete_option($theme);
	echo $delete;
	wp_die();
}

function chenge_order_themes(){
	$datos = $_POST["datos"];
	foreach ($datos as $clave => $fila) {
		$orden[$clave] = $fila['order'];
		$option_name[$clave] = $fila['option_name'];
	}
	array_multisort($orden, SORT_ASC, $datos);
	print_r($datos);
	update_option("main_home_theme",$datos  , "no" );
	wp_die();
}

function save_main_theme(){
	$datos = $_POST["datos"];
	$update =update_option("main_home_theme",$datos  , "no" );
	echo $update ;
	wp_die();
}

function save_transmision_vivo(){
	$datos = $_POST["datos"];
	$update = update_option("home_live_broadcast", $datos, "no");
	echo $update;
	wp_die();
}

function get_transmision_vivo(){
	global  $wpdb;
	$sql ="SELECT option_value FROM wp_options WHERE option_name = 'home_live_broadcast'";
	$res = $wpdb->get_results($sql);
	if(count($res)>0){
		$value = unserialize($res[0]->option_value);
		$json = json_encode($value );
		echo $json;
	}else {
		echo '';
	}
	wp_die();
}

function save_edit(){
	$datos = $_POST["datos"];
	$update =update_option("home_editorial_update",$datos  , "no" );
	echo $update ;
	wp_die();
}

function get_feed_editorial_update(){
	$res = get_option("home_editorial_update");
	if($res !== false){
		$json =  json_encode($res);
		echo $json;
	}else echo "";
	wp_die();
}

?>
