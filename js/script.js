const $ = jQuery.noConflict();
$(function( $ ) {
   var n = 1;
   var activeTab =0;
   function form_default (ext =""){
     let fm = `
     <div class ="opch_wrap" id="theme_content_${n}">
      <div class ="opch_txt_block">
        <input type ="hidden" name ="option_names" id = "option_name_${n}" />
        <div class = "opch_txt_left"> <strong> Tema ${n} : </strong> </div>
        <div><input type ="text"  size = "70" name="theme_name" id="theme_name_${n}" placeholder="Escribe el nombre del tema" autocomplete="off" ></div>
      </div>
      <div class ="opch_txt_block">
        <div class ="opch_txt_left">Selecciona un tema: </div>
        <div>
            <input type = "text" name = "tema" size = "70" id = "tema_${n}" placeholder="Buscar tema " autocomplete="off" >
            <input type ="hidden" name ="tema_id" id = "tema_id_${n}">
        </div>
        <div class="resultado_temas_cont" id="resultado_temas_${n}"></div>
      </div>

      <div class ="opch_txt_block">
          <div class = "opch_txt_left">Nota principal : </div>
          <div>
              <input type = "text" name = "name_main_note" size = "70" id = "nmn_${n}" placeholder="Buscar nota principal" autocomplete="off" >
              <input type ="hidden" name ="id_main_note" id = "imn_${n}">
          </div>
          <div class="resultado_temas_cont" id="res_nmn_${n}"></div>
       </div>


      <div class="opc_subhead_cont">
          <div class = "opch_subhead"> Activar  </div>
          <div class = "opch_subhead_1"> Notas secundarias  </div>
          <div class = "opch_subhead_2"> Thumbnail</div>
      </div>

      <!-- ***************    AQUI INICIA NOTAS SECUNDARIA  #1 ********************* -->
      <div class ="opch_txt_block">
          <div class = "opch_txt_left"> Nota 1 : </div>
          <div class = "opch_check_active"><input type ="checkbox" name ="activo_${n}" id = "ckact_1_${n}"></div>
           <div  class="opch_ohter_notes">
              <input type ="text" name = "name_notes" size = "65" id = "nn_1_${n}" placeholder="Buscar nota # 1" autocomplete="off" >
              <input type ="hidden" name ="id_notes_${n}" id = "in_1_${n}">
          </div>
          <div class="resultado_temas_cont_2" id="res_nn_1_${n}"></div>
          <div class ="opch_check_thumb">
              <input type ="checkbox" name ="thumbnails_${n}" id = "thum_1_${n}">
          </div>
      </div>

      <div class ="opch_txt_block">
          <div class = "opch_txt_left">Nota 2 : </div>
          <div class = "opch_check_active">	<input type ="checkbox" name ="activo_${n}" id = "ckact_2_${n}"></div>
              <div class="opch_ohter_notes">
                  <input type ="text" name = "name_notes" size = "65" id = "nn_2_${n}" placeholder="Buscar nota # 2" autocomplete="off" >
                  <input type ="hidden" name ="id_notes_${n}" id = "in_2_${n}">
              </div>
              <div class="resultado_temas_cont_2" id="res_nn_2_${n}"></div>
              <div class ="opch_check_thumb">
                  <input type ="checkbox" name ="thumbnails_${n}" id = "thum_2_${n}">
              </div>
       </div>

      <div class ="opch_txt_block">
          <div class = "opch_txt_left">Nota 3 : </div>
          <div class = "opch_check_active"><input type ="checkbox" name ="activo_${n}" id = "ckact_3_${n}"></div>
              <div  class="opch_ohter_notes">
                  <input type ="text" name = "name_notes" size = "65" id = "nn_3_${n}" placeholder="Buscar nota # 3" autocomplete="off" >
                  <input type ="hidden" name ="id_notes_${n}" id = "in_3_${n}">
              </div>
              <div class="resultado_temas_cont_2" id="res_nn_3_${n}"></div>
              <div class ="opch_check_thumb">
                  <input type ="checkbox"  name ="thumbnails_${n}"  id = "thum_3_${n}">
              </div>
       </div>

       <div class ="opch_txt_block">
          <div class = "opch_txt_left">  Orden del Tema  :  </div>

          <div>
              <input type ="text" size = "3" name ="order_themes"  value ="${n}" id = "order_${n}">
          </div>

       </div>

      <div class ="opch_save">
          <input type ="button" name ="btn_save_themes" id ="save_theme_${n}" value ="Guardar" class="button button-primary button-large">
          &nbsp  &nbsp  &nbsp  &nbsp
          <input type ="button"  name ="btn_delete_themes" id ="delete_theme_${n}" class="button tagadd" value ="Eliminar">
       </div>
  </div>`;
  n++;
  return fm;
}

    /* Agrega nuevo tema vacio */
    $(document).on("click","#add_theme",function(e){
      if(n<7){
        $("#bt_save_them_1").remove();
        $("#bt_orden_them_1").remove();
        let fmdefault = form_default();
        $("div#tabs-1").append(fmdefault);
        nametema();
      }else {
        return false;
      }
      btn_generales_tab1();
    });

    /* Genera un nombre al tema para option name = 'home_theme_#' */
    let nametema = () => {
        let allNames = [];
        let id = "";
        for(let j=0; j<7; j++){
          allNames.push(j+1);
        }
        $(`input[name='option_names']`).each(function() {
          let existName = $(this).val();
          existName =parseInt (existName.substr(-1));
          if(Number.isInteger(existName)){
            let pos = allNames.indexOf(existName);
            allNames.splice(pos, 1)
          }else{
            id = $(this).attr("id");
          }
        });
        let name_opc =  allNames[0];
        $(`#${id}`).val(`home_theme_${name_opc}`);
      }

    /* obiene los temas  taxonomy ='TEMA' */
    function get_topic(m){
      $("#resultado_temas_"+m).html("");
      let theme_search = $("#tema_"+m).val();
      $.ajax({
        url: opc_vars.ajaxurl,
        type: "POST",
        data: {
          action : 'get_topic',
          theme_search : theme_search
        }
      })
      .success(function( result ) {
        let obj = JSON.parse(result);
        let size = obj.length;
        let idSelectable = "selectable"+m;
        let opc = `<ol class="selector" id="${idSelectable}">`
        for(let i =0 ;  i<size ; i++){
          let id =  obj[i]["id"];
          let tema=  obj[i]["tema"];
          opc+= `<li id="${id}"> ${tema}</li>`
        }
        opc+= `</ol>`;
        $("#resultado_temas_"+m).html(opc);
        $(`#${idSelectable}`).selectable({
          selected: function(event, ui) {
            let selected_id = $(ui.selected).attr('id');
            let selected_name = $(ui.selected).text();
             $("#tema_"+m).val(selected_name);
             $("#tema_id_"+m).val(selected_id);
             $("#resultado_temas_"+m).html("");
           }
         });
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
         console.error( "La solicitud a fallado: " +  textStatus +" - "  +errorThrown);
       });
     }

     /* Obtiene los posts */
    function get_posts(m){
      $("#res_nmn_"+m).html("");
      let tema_id = ($("#tema_id_"+m).val() == "") ? null : $("#tema_id_"+m).val();
      let search_title = ($("#nmn_"+m).val() == "") ? null : $("#nmn_"+m).val();
      if(tema_id || search_title){
        $.ajax({
          url: opc_vars.ajaxurl,
          type: "POST",
          data: {
            action: 'get_posts',
            theme_search: tema_id ,
            title_search: search_title
          },
          beforeSend: function(){
            $("#res_nmn_"+m).html('<div class="imgload">Buscando resultados ...</div>');
          },
          success: function(result){
            let obj = JSON.parse(result);
            let size = obj.length;
            let idSelectable = "selectable_mn"+m;
            let opc = `<ol class="selector" id="${idSelectable}">`
            for(let i =0 ;  i<size ; i++){
              let id =  obj[i]["id"];
              let title=  obj[i]["post_title"];
              opc+= `<li id="${id}">${title}</li>`
            }
            opc+= `</ol>`;
            $("#res_nmn_"+m).html(opc);
            $(`#${idSelectable}`).selectable({
              selected: function(event, ui) {
                let selected_id = $(ui.selected).attr('id');
                let selected_name = $(ui.selected).text();
                $("#nmn_"+m).val(selected_name);
                $("#imn_"+m).val(selected_id);
                $("#res_nmn_"+m).html("");
              }
            });
          },
          fail: function( jqXHR, textStatus, errorThrown ) {
            console.error( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
          }
        })
      }
    }

    /* OBTIENE LAS NOTAS secundarias*/
    function get_notes(tema, elem){
      let res_notas = `res_nn_${elem}_${tema}`;
      $(`#${res_notas}`).html("");
      let tema_id = ($("#tema_id_"+tema).val() == "") ? null : $("#tema_id_"+tema).val();
      let search_title = ($(`#nn_${elem}_${tema}`).val() == "") ? null : $(`#nn_${elem}_${tema}`).val();
      $.ajax({
        url: opc_vars.ajaxurl,
        type: "POST",
        data: {
          action : 'get_posts',
          theme_search : tema_id,
          title_search : search_title
        },
        beforeSend: function(){
          $(`#${res_notas}`).html('<div class="imgload">Buscando resultados ...</div>');
        },
        success : function( result ) {
          let obj = JSON.parse(result);
          let size = obj.length;
          let idSelectable = `selectable_nn_${elem}_${tema}`;
          let opc = `<ol class="selector" id="${idSelectable}">`
          for(let i =0 ;  i<size ; i++){
             let id =  obj[i]["id"];
             let title=  obj[i]["post_title"];
             opc+= `<li id="${id}">${title}</li>`
          }
          opc+= `</ol>` ;
          $(`#${res_notas}`).html(opc);
          $(`#${idSelectable}`).selectable({
            selected: function(event, ui) {
              let selected_id = $(ui.selected).attr('id');
              let selected_name = $(ui.selected).text();
              $(`#nn_${elem}_${tema}`).val(selected_name);
              $(`#in_${elem}_${tema}`).val(selected_id);
              $(`#res_nn_${elem}_${tema}`).html("");
            }
          });
        },
        fail: function( jqXHR, textStatus, errorThrown ) {
          console.error( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
        }
      })
    }

    function save_themes(t){
        let temahome = $(`#option_name_${t}`).val();
        let theme_name= $(`#theme_name_${t}`).val();
        let theme_id= $(`#tema_id_${t}`).val();
        let tema_name= $(`#tema_${t}`).val();
        let idmn= $(`#imn_${t}`).val();
        let nmn= $(`#nmn_${t}`).val();
        let theme_orden= $(`#nmn_${t}`).val();
        let myTheme = new Object();
        myTheme.name = theme_name;
        myTheme.taxonomy_id = theme_id;
        myTheme.taxonomy_name = tema_name;
        myTheme.main_note_id =  idmn;
        myTheme.main_note_name =  nmn;
        let arrayNotes = [];

        $(`input[name='id_notes_${t}']`).each(function() {
            let notes = new Object();
            let idElemt = $(this).attr('id');
            let item = idElemt.substr(3,1);
            let theme = idElemt.substr(5,1);
            let name_note =  $(`#nn_${item}_${theme}`).val();
            let id_note = $(this).val();
            if(name_note  == ""){
                id_note = $(this).val("");
            }else{
                let n_note = name_note;
                let active =  $(`#ckact_${item}_${theme}`).is(':checked');
                let thumb =   $(`#thum_${item}_${theme}`).is(':checked');

                notes.note_id = id_note;
                notes.note_name = n_note;
                notes.active = active;
                notes.thumbnail =  thumb;

                arrayNotes.push(notes);
            }
        });
        myTheme.notes = arrayNotes;
        $.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'save_themes',
                tema : temahome,
                datos : myTheme
            }
        })
        .success(function( result ) {
          updateMainTheme();
          location.reload();
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
             console.error( "La solicitud a fallado: " +  textStatus +" - "  +errorThrown);
         });
    }

    async function get_themes_home(){
        $("div#tabs-1").html("<h1>Temas del Home</h1>");
        await  $.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_themes'
            } ,
            success : function( result ) {
              if(result != "" ) {
                  let obj = JSON.parse(result);
                  let size = obj.length;
              if(size > 0) {
                  for(let i = 0; i< size ; i++){
                      let k = i+1;

                      let fmdefault = form_default(k);
                      $("div#tabs-1").append(fmdefault);

                      let option_name = obj[i]["option_name"];
                      let order = k;
                      let name  = obj[i]["value"]["name"];
                      let mainnoteid  = obj[i]["value"]["main_note_id"];
                      let mainnotename  = obj[i]["value"]["main_note_name"];
                      let taxonomyid  = obj[i]["value"]["taxonomy_id"];
                      let taxonomyname = obj[i]["value"]["taxonomy_name"];
                      let arry_notes = obj[i]["value"]["notes"];

                      $(`#theme_name_${k}`).val(name);
                      $(`#imn_${k}`).val(mainnoteid);
                      $(`#nmn_${k}`).val(mainnotename);
                      $(`#tema_id_${k}`).val(taxonomyid);
                      $(`#tema_${k}`).val(taxonomyname);
                      $(`#option_name_${k}`).val(option_name);
                      $(`#order_${k}`).val(order);
                      if( arry_notes !== undefined){
                          let tn = arry_notes.length;
                          let a = 1;
                          for(let m = 0 ; m<tn ; m++ ){

                          let noteid =     arry_notes[m]["note_id"];
                          let notename =     arry_notes[m]["note_name"];
                          let active =    JSON.parse(arry_notes[m]["active"]);
                          let thumbnail = JSON.parse( arry_notes[m]["thumbnail"]);

                          $(`#in_${a}_${k}`).val(noteid);
                          $(`#nn_${a}_${k}`).val(notename);

                          $(`#ckact_${a}_${k}`).prop('checked', active );
                          $(`#thum_${a}_${k}`).prop('checked', thumbnail);

                          a++;
                          }
                      }
                  }
                }
              }else{
                  console.error("No hay temas guardados");
                  let fmdefault = form_default();
                  $("div#tabs-1").append(fmdefault);
                  nametema();
              }
              },
              fail : function( jqXHR, textStatus, errorThrown ) {
                   console.error( "La solicitud de obtener get_themes_home ha fallado: " +  textStatus +" - "  +errorThrown);
               }
        });
        await btn_generales_tab1();

    }

    function updateMainTheme(){
      let arrayTheme = [];
      let i=1;
      $("input[name='order_themes']").each(function( ind, elem){
        let theme = new Object();
        let item = $(elem).val();
        let id = $(elem).attr('id');
        id = id.substr(-1);
        let opc_name_them = $(`#option_name_${id}`).val();
        theme.order = i;
        theme.option_name = opc_name_them;
        arrayTheme.push(theme);
        i++;
      });
      $.ajax({
        url: opc_vars.ajaxurl,
        type: "POST",
        data: {
          action : 'save_main_theme_home',
          datos : arrayTheme
        }
      }).success(function(result){
        //console.log(result);
      }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.error( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
      });
    }

    function btn_generales_tab1(){
      let btn_gral  =`
        <div  class="bt_save_them" id ="bt_save_them_1">
          <input type ="button" class ="button tagadd" value="Añadir tema" id="add_theme">
        </div>
        <div class="bt_orden_them" id ="bt_orden_them_1">
          <input type ="button" class ="button tagadd" value="Guardar orden de los temas" id="change_order_theme">
        </div>`;
      $("div#tabs-1").append(btn_gral);
    }

    /***** Obtiene los datos de transmison en vivo  */
    function get_feed_trasmision_vivo(){
      $.ajax({
        url: opc_vars.ajaxurl,
        type : "POST",
        data : {
        action : 'get_trans_vivo',
        },
        success : function (res){
          if(res != ""){
            let obj = JSON.parse(res);
            $("#title_trans_vivo").val(obj["title"]);
            $("#image-url").val(obj["image"]);
            $("#active_transmision").prop('checked', JSON.parse(obj["active"]));
            $.each($("input[name=channel]"), function(i, v){
              if($(v).val() == obj["channel"]){
                $(v).prop("checked", "true");
                if($(v).val() == "Youtube"||$(v).val() == "Facebook"){
                  $("#live-url").show();
                  $("#live-url").val(obj["live_url"]);
                  $("#live_url_container").show();
                }else{
                  $("#live-url").hide();
                }
              }
            });
          }
        }
      });
    }

    function get_post_for_editorial(elem){
      let item = `res_note_edit_${elem}`;
      $(`#${item}`).html("");
      let tema_id=null;
      let search_title = ($("#name_note_edit_"+elem).val() == "") ? null : $("#name_note_edit_"+elem).val();
      $.ajax({
        url: opc_vars.ajaxurl,
        type: "POST",
        data: {
          action: 'get_posts',
          theme_search: tema_id,
          title_search: search_title
        },
        beforeSend: function(){
          $(`#${item}`).html('<div class="imgload">Buscando resultados ...</div>');
        },
        success : function( result ) {
          let obj = JSON.parse(result);
          let size = obj.length;
          let idSelectable = `select_editorial_${elem}`;
          let opc = `<ol class="selector" id="${idSelectable}">`
          for(let i =0 ;  i<size ; i++){
            let id =  obj[i]["id"];
            let title=  obj[i]["post_title"];
            opc+= `<li id="${id}">${title}</li>`;
          }
          opc+= `</ol>`;
          $(`#${item}`).html(opc);
          $(`#${idSelectable}`).selectable({
            selected: function(event, ui) {
              let selected_id = $(ui.selected).attr('id');
              let selected_name = $(ui.selected).text();
              $(`#name_note_edit_${elem}`).val(selected_name);
              $(`#id_note_edit_${elem}`).val(selected_id);
              $(`#${item}`).html("");
            }
          });
        },
        fail : function( jqXHR, textStatus, errorThrown ) {
          console.error( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
        }
      });
    }

    /*** Obtiene datos de seleccion del editor */
    function get_feed_update_edit(){
      $.ajax({
        url: opc_vars.ajaxurl,
        type : "POST",
        data : {
          action : 'get_update_edit'
        },
        success : function(res){
          if(res != ""){
            let obj = JSON.parse(res);
            $("#summary_edit").val(obj["summary"]);
            $("#active_edit_update").prop('checked', JSON.parse(obj["active"]));
            if(obj.notes  !== undefined){
              let nota = obj.notes;
              let tl =   Object.keys(nota).length;
              for (let i = 0; i< tl; i++){
                let name = nota[i]["note_name"];
                let id = nota[i]["note_id"];
                $(`#name_note_edit_${i}`).val(name);
                $(`#id_note_edit_${i}`).val(id);
              }
            }
          }
        }
      });
    }

    // Búsqueda temas: Busca en keystroke keyup
    $(document).on("keyup",  "input[name='tema']" ,function(e){
      let item = $(this).attr('id');
      let k = item.substr(5);
      let minlength =1;
      let that = this
      let tema_value = $(this).val();
      if(tema_value.length >= minlength ) {
        get_topic(k);
        return false;
      }
    });

    $(document).on("focusout", "input[name=tema]", function(e){
      if($(this).val() == ""){
        console.log( $(this) );
        const k = $(this).attr('id').substr(5);
        $("#tema_id_"+k).val("");
        console.log($(this).val());
      }else{
        console.log( $(this).val() );
      }
    });

    // Busqueda nota princiapl
    $(document).on("keyup",  "input[name='name_main_note']" ,function(e){
      let item = $(this).attr('id');
      let k = item.substr(4);
      let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
      let that = this;
      let main_note_field_value = $(this).val();
      if(main_note_field_value.length > 3 ) {
        $("#res_nmn_"+k).html("");
        // get_posts(k);
        if( code == 13) {
          get_posts(k);
          return false;
        }
      }
    });

   // Cuando estas en text de nota principal mustra las ultimas 50 notas
    $(document).on("focus",  "input[name='name_main_note']" ,function(e){
      let item = $(this).attr('id');
      let k = item.substr(4);
      let value = $(this).val();
      if(value.length <= 0 ) {
        get_posts(k);
        return false;
      }
    });

    // Borra resultados si sale del text de la nota principal
    $(document).on("focusout",  "input[name='name_main_note']" ,function(e){
      let item = $(this).attr('id');
      let k = item.substr(4);
      let minlength =3;
      let that = this;
      let value = $(this).val();
      $("#res_nmn_"+k).html("");
      return false;
    });

    /* Busqueda notas secundarias */
    $(document).on("keyup",  "input[name='name_notes']" ,function(e){
      let item = $(this).attr('id');
      let tema = item.substr(5);
      let elem = item.substr(3 , 1) ;
      let that = this, value = $(this).val();
      let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
      if(value.length > 0 ) {
        $(`#res_nn_${elem}_${tema}`).html("");
        if(code == 13){
          get_notes(tema, elem);
          return false;
        }
      }else if(value.length ==0){
        get_notes(tema, elem);
      }
    });

    $(document).on("focus",  "input[name='name_notes']" ,function(e){
      let item = $(this).attr('id');
      let tema = item.substr(5);
      let elem = item.substr(3 , 1) ;
      let that = this, value = $(this).val();
      if(value.length > 0 ) {
      }else {
        get_notes(tema, elem);
        return false;
      }
    });

    $(document).on("focusout",  "input[name='name_notes']" ,function(e){
      let item = $(this).attr('id');
      let tema = item.substr(5);
      let elem = item.substr(3 , 1) ;
      let res_notas = `res_nn_${elem}_${tema}`;
      $(`#${res_notas}`).html("");
    });

    $(document).on("click",  "input[name='btn_save_themes']" ,function(e){
        let item = $(this).attr('id');
        let tema = item.substr(11);
        save_themes(tema);
    });

    $(document).on("click","input[name=btn_delete_themes]",function(e){
        let theme = $(this).attr('id');
        theme = theme.substr(-1);
        delete_theme = $(`#option_name_${theme}`).val();
        let conf = confirm(`¿Está seguro de eliminar el tema  ${theme}?`);
        if(conf){
                console.log("Eliminando.....");
                $.ajax({
                    url: opc_vars.ajaxurl,
                    type: "POST",
                    data: {
                        action : 'delete_theme',
                        theme_name : delete_theme
                    }
                })
                .success(function( result ) {
                    $(`#theme_content_${theme}`).empty();
                    updateMainTheme();
                    location.reload();
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                     console.error( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
                 });
        }
    });

    $(document).on("focusout","input[name=order_themes]",function(e){
        let theme = $(this).attr('id');
        theme = theme.substr(-1);
        let valor = parseInt($(this).val());
        if(valor> 0 && valor <  n) {
        }else{
            alert("Solo se permiten valores del 1 al " +(n-1));
            $(this).val(theme);
            $(this).focus();
            return false;
        }
    });

    $(document).on("click","#change_order_theme",function(e){
        let valores = [];
        let duplicados = [];
        let arrayTheme = [];
        $("input[name='order_themes']").each(function( ind, elem) {
            let theme = new Object();
            let item = $(elem).val();
            let id = $(elem).attr('id');
                id = id.substr(-1);
            let opc_name_them = $(`#option_name_${id}`).val();
            theme.order = item;
            theme.option_name = opc_name_them;
            arrayTheme.push(theme);
            valores.push(item);

        });
        const tempArray = [...valores].sort();
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] === tempArray[i]) {
              duplicados.push(tempArray[i]);
              alert(`¡Error! El orden del tema ${tempArray[i]} esta duplicado` );
              return false;
            }
          }
          if(duplicados.length == 0){
                $.ajax({
                    url: opc_vars.ajaxurl,
                    type: "POST",
                    data: {
                        action : 'change_order',
                        datos : arrayTheme
                    }
                })
                .success(function( result ) {
                  location.reload();
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    console.error( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
                });
          }
    });

    let mediaUploader;
    $('#upload-button').click(function(e) {
      e.preventDefault();
      if (mediaUploader) {
        mediaUploader.open();
        return;
      }
      mediaUploader = wp.media.frames.file_frame = wp.media({
        title: 'Selecciona una imagen',
        button: {
          text: 'Selecciona una imagen'
        },
        multiple: false
      });
      mediaUploader.on('select', function() {
        attachment = mediaUploader.state().get('selection').first().toJSON();
        $('#image-url').val(attachment.url);
      });
      mediaUploader.open();
    });

    let transmision = new Object();
    $.each($("input[name=channel]"), function(i, v){
      $(v).on('click', function(evt){
        transmision.channel = $(v).val();
        if($(v).val() == "Facebook"||$(v).val() == "Youtube"){
          $("#live_url_container").show();
          $("#live-url").show();
        }else{
          $("#live_url_container").hide();
        }
      })
    });

    /*
    REGEX => \?v=([a-zA-Z0-9\-\_]{1,})\
    */
    $("#save_transmision_vivo").click(function(){
      let title_trans = $("#title_trans_vivo").val();
      let imagen_trans = $("#image-url").val();
      let active_trans = $('#active_transmision').is(':checked');
      let live_url = $("#live-url").val();
      let channel = $("input[name=channel]:checked").val();
      console.log(channel);
      transmision.title = title_trans;
      transmision.image = imagen_trans;
      transmision.active = active_trans;
      transmision.live_url = live_url;
      transmision.channel = channel;
      $.ajax({
        url: opc_vars.ajaxurl,
        type : "POST",
        data : {
          action : 'save_trans_vivo',
          datos :transmision
        },
        success : function (res){
          location.reload();
        }
      });
    });

    /*********  Guarda Selección del editor **********************/
    $("#save_update_edit").click(function (){
      let updateEditorial = new Object();
      let summary = $("#summary_edit").val();
      let active_update_editorial = $('#active_edit_update').is(':checked');
      let arrayNotes = [];
      $(`input[name='note_edit_update']`).each(function() {
        let notes = new Object();
        let idElemt = $(this).attr('id');
        let id = idElemt.substr(-1);
        let  name_note =$(`#name_note_edit_${id}`).val();
        if(name_note  == ""){
          $(`#${idElemt}`).val("");
        }else{
          let n_note = name_note;
          let id_note =  $(`#id_note_edit_${id}`).val();
          notes.note_id = id_note;
          notes.note_name = n_note;
          arrayNotes.push(notes);
        }
      });
      updateEditorial.summary = summary;
      updateEditorial.notes = arrayNotes;
      updateEditorial.active = active_update_editorial;
      $.ajax({
        url :  opc_vars.ajaxurl,
        type : "POST",
        data :{
          action : 'save_update_edit',
          datos : updateEditorial
        },
        success : function(res){
          location.reload();
        }
      });
    });

    $(document).on("keyup",  "input[name='note_edit_update']" ,function(e){
        let item = $(this).attr('id');
        let k = item.substr(-1);
        let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
        let that = this, value = $(this).val();
        if(value.length > 0 ) {
            $(`#res_note_edit_${k}`).html("");
            if( code == 13) {
                get_post_for_editorial(k);
                return false;
              }
        }else if(value.length ==0){
            get_post_for_editorial(k);
        }
    });

    $(document).on("focus",  "input[name='note_edit_update']" ,function(e){
        let item = $(this).attr('id');
        let k = item.substr(-1);
        let that = this, value = $(this).val();
        if(value.length > 0 ) {
        }else {
          get_post_for_editorial(k);
        }
      });

    $(document).on("focusout",  "input[name='note_edit_update']" ,function(e){
        let item = $(this).attr('id');
        let elem = item.substr(-1);
        let res_notas = `res_note_edit_${elem}`;
        $(`#${res_notas}`).html("");
    });

    /*  TAB-1 */
    get_themes_home();
    /*  TAB-2 */

  let tabss = $( "#ophome-tabs" ).tabs({
    active: 0,
  });

  $( "#link_tab_2" ).on( "click", function() {
    get_feed_trasmision_vivo();
  });

  $("#link_tab_3").on("click" , function(){
      get_feed_update_edit();
  });

});
