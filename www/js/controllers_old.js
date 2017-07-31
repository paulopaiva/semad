angular.module('starter.controllers', [])
 .controller('StatusCtrl', function($scope, $cordovaCapture, $state, $cordovaNetwork,  $cordovaGeolocation, $cordovaToast, $http, Conexao, $cordovaContacts, $cordovaSocialSharing, $ionicModal, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaGeolocation, $timeout, $ionicPopup)  {
if (start==0) {
    $scope.lista = [];
    $scope.listaComentario = [];
    $scope.listaCurtir = [];
    $scope.btnMsg = true;
    $scope.msgFoto = false;
    $scope.msgVideo = false;
    $scope.msgTexto = false;
    $scope.onTv=false;
    $scope.onRadio=false;
    $scope.titulo="";
    $scope.template="";
    $scope.form = {};
    $scope.usuario={};
    $scope.msgvideo={};
    $scope.msgfoto={};
    $scope.msgtexto={};
    $scope.classe_curtir="";
    $scope.classe_compartilhar="";
    $scope.classe_comentar="";
    $scope.idorgao="0";
    $scope.video="";
    $scope.foto="";
    $scope.idmensagem="";
    $scope.descricao="";
    $scope.latitude="";
    $scope.longitude="";
    $scope.data_hora="";
    $scope.endereco="";
    $scope.status="";
    $scope.bairro="";
    $scope.area="";
    $scope.status="";
    $scope.foto_file="";
    $scope.foto_file_path="";
    $scope.video_file="";
    $scope.video_file_path="";
    $scope.currentPercentage=0;
    $scope.btn = false;
    $scope.onChat = false;

  if (localStorage.getItem('nome')!=null){
    $scope.tema=localStorage.getItem('tema');
    $scope.tab_tema=localStorage.getItem('tab_tema');
    $scope.btn_tema=localStorage.getItem('btn_tema');
    $scope.img_fundo=localStorage.getItem('img_fundo');
    idUsuario= localStorage.getItem('idusuario');
    $scope.idusuario=idUsuario;
  }else {
     $scope.img_fundo="url(ico/papel1.png)";
     $scope.tema="bar-positive";
     $scope.tab_tema="tabs-background-positive tabs-color-light";
     $scope.btn_tema="button-positive";
     $scope.idusuario="";
  }

     start=1;
}


//localStorage.clear();
//    localStorage.setItem('tema',"bar-energized");
//    localStorage.setItem('tab_tema',"tabs-background-energized");
//    localStorage.setItem('btn_tema',"button-energized");

/// inicio da funcao maoa

document.addEventListener('deviceready',function(){ // inicia o aplicativo



 // alert ('O evento é acionado quando Cordova está totalmente carregada.')
    if (start2==0){

        start2=1;
        $scope.secao=sessionStorage.getItem('secao');
        if ($scope.secao==null){
    //      alert('2.1')
           sessionStorage.setItem('secao',true);
           idUsuario=localStorage.getItem('idusuario');
           $scope.idusuario=idUsuario;


    }

        if (!localStorage.getItem('nome')){

          localStorage.setItem('img_fundo',"url(ico/papel1.jpg)");
          localStorage.setItem('tema',"bar-positive");
          localStorage.setItem('tab_tema',"tabs-background-positive tabs-color-light");
          localStorage.setItem('btn_tema',"button-positive");
          localStorage.setItem('contador',1);

          $scope.tema=localStorage.getItem('tema');
          $scope.tab_tema=localStorage.getItem('tab_tema');
          $scope.btn_tema=localStorage.getItem('btn_tema');
          $scope.img_fundo=localStorage.getItem('img_fundo');
          $scope.pegaLocal();
          $scope.usuario();

        }
        else
        {


          var type = $cordovaNetwork.getNetwork()
          var isOnline = $cordovaNetwork.isOnline()

         if (isOnline==false){
              $scope.showAlert('Informação','Vc esta sem conexão de dados, por favor ative sua conexao de dados...');
              // navigator.app.exitApp();
         }else
         {


            var valores = {
            parametros:'validaUsuario',
            idusuario:localStorage.getItem('idusuario'),
            pagina:0}
            $http({
                  method:'POST',
                  url: path+'api/api.php',
                  data: valores,
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function(data){
                     $scope.statusUsuario = data;
                  if (($scope.statusUsuario[0].status=="CANCELADO") || ($scope.statusUsuario[0].status=="BLOQUEADO")){

                  //  $scope.usuarioBloqueado();
                       alert ('Usuário bloqueado!');
                       navigator.app.exitApp();

                  }else {



                  }
                  }).error(function(data){

                    alert ('erro ao conectar ao banco de dados.');
                  });

            // verificar se o ususario esta ativo

         }



        }

    }
   }, false);






/// fim da funcao de mapa

$scope.iniciaMensagem = function (){


 // $scope.pegaCategoria();
//  $scope.pegaStatus();
  $scope.pegaIndicacao();
}

$scope.perfilPopup = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem da Foto",
      body: " <i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(2);
                  }


             }]
    });

};


$scope.cameraPopup = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem da Foto",
      body: " <i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFoto(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFoto(2);
                  }


             }]
    });

};
$scope.videoPopup = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem do Vídeo",
      body: "<i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarVideo(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarVideo(2);
                  }


             }]
    });

}

$scope.cameraPopupPerfil = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem da Foto",
      body: " <i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(2);
                  }


             }]
    });

};


$scope.excluirMsg = function(id,index){
var valores = {
  parametros:'excluirMensagem',
  idmensagem:id
}
   var confirmPopup = $ionicPopup.confirm({
     title: 'Apagar',
     template: 'Apaga a mensagem?'
   });

   confirmPopup.then(function(res) {
     if(res) {
$ionicLoading.show({template: 'Excluindo...'});

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      $ionicLoading.hide();
	    $scope.listaUsuario.splice(index);
      $scope.pegaStatusUsuario();
    });
     } else {
       console.log('You are not sure');
     }
   });

      $ionicLoading.hide();
}

$scope.pegaCategoria = function(){
var valores = {
  parametros:'pegaCategoria',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaCategoria = data;


        });


};

$scope.pegaIndicacao = function(){
var valores = {
  parametros:'pegaIndicacao',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaCategoria = data;

        });


};
$scope.pegaAgenda = function(){

var valores = {
  parametros:'pegaAgenda',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaAgenda=[];
          for (var i = 0; i < data.length; i++) {

              data[i].data=new Date(data[i].data);
              $scope.listaAgenda.push(angular.copy(data[i]));

         };


        });


};

$scope.paginacaoAgenda = function(){
var valores = {
  parametros:'pegaAgenda',
  pagina:$scope.listaAgenda.length
 }
$scope.btn = false;
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
    if(data.length == 0){

        $scope.btn = true;

     }else{
      for (var i = 0; i < data.length; i++) {

          data[i].data=new Date(data[i].data);
          $scope.listaAgenda.push(angular.copy(data[i]));

     };  // for

    $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');
    }); // http
ionicLoading.hide();

}




$scope.pegaCursoOnline = function(){

var valores = {
  parametros:'pegaCursoOnline',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaCursoOnline = data;

        });


};


$scope.pegaCurso();
$scope.pegaProposta = function(){
var valores = {
  parametros:'pegaProposta',
  pagina:0
}
    $ionicLoading.show({template: 'Carregando...'});
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaProposta = data;

        });

$ionicLoading.hide();

};

$scope.pegaEntreternimento = function(){
var valores = {
  parametros:'pegaEntreternimento',
  pagina:0
}
    $ionicLoading.show({template: 'Carregando...'});
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaEntreternimento = data;

        });

$ionicLoading.hide();

};

$scope.pegaSocial = function(){
var valores = {
  parametros:'pegaSocial',
  pagina:0
}
    $ionicLoading.show({template: 'Carregando Redes Sociais...'});
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaSocial = data;

        });

$ionicLoading.hide();

};


$scope.pegaVideo = function(){

if (($scope.contador>30) && ($scope.statusUsuario[0].status!="ATIVO")){
   $scope.ativarUsuario();
} else
{

var valores = {
  parametros:'pegaVideo',
  idcurso:localStorage.getItem('idcurso'),
  pagina:0}

$ionicLoading.show({template: 'Carregando vídeos...'});

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){

    $scope.listaVideo=[];
    for (var i = 0; i < data.length; i++) {
      data[i].data=new Date(data[i].data);
      $scope.listaVideo.push(angular.copy(data[i]));

     };
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
$ionicLoading.hide();

}

}

$scope.paginacaoVideo = function(){
if (($scope.contador>50) && ($scope.statusUsuario[0].status!="ATIVO")){
   $scope.ativarUsuario();
} else
{
var valores = {
  parametros:'pegaVideo',
  idcurso:localStorage.getItem('idcurso'),
  pagina:$scope.listaVideo.length

}
$scope.btn = false;
//if ($scope.listaVideo.length>4){
//$ionicLoading.show({template: 'Carregando vídeos..'});
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
    if(data.length == 0){

        $scope.btn = true;

     }else{

      for (var i = 0; i < data.length; i++) {
          data[i].data=new Date(data[i].data);
      $scope.listaVideo.push(angular.copy(data[i]));

     };
   }
    $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');

    });
//}
$ionicLoading.hide();

}
}

$scope.pegaStatusUsuario = function(){
var valores = {
  parametros:'pegaStatusUsuario',
  pagina:0,
  idusuario:idUsuario
}


$ionicLoading.show({template: 'Carregando Mensagens...'});
//console.log(valores);
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      $scope.listaUsuario = [];

      if (data.length>0){
      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
          if (data[i].video!=""){
            data[i].status_label="img/IconeVideo.png";
          }
      $scope.listaUsuario.push(angular.copy(data[i]));
     };
    }else
    {
      $scope.showAlert('Informação','Vc ainda não postou mensagens...');
    }

    }); // fim httpm
$ionicLoading.hide();

}

$scope.pegaNotificacao = function(){
var valores = {
  parametros:'pegaNotificacao',
  pagina:0,
  idusuario:idUsuario
}
$ionicLoading.show({template: 'Carregando notifições...'});

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data);
      $scope.listaNotificacao = [];
      if (data.length>0){
      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
          if (data[i].video!=""){
            data[i].status_label="img/IconeVideo.png";
          }
          if (data[i].status_cc=="true"){
            data[i].status_label='{"background":"#A7DBD8"}';
          }else{
            data[i].status_label='{"background":"#F8F5FC"}';
          }


      $scope.listaNotificacao.push(angular.copy(data[i]));

     };
    }else
    {
      $scope.showAlert('Informação','Vc ainda não postou mensagens...');
    }

    });
$ionicLoading.hide();
}

$scope.paginacaoNotificacao = function(){
var valores = {
  parametros:'pegaNotificacao',
  pagina:$scope.listaNotificacao.length,
  idusuario:idUsuario
}
$scope.btn = false;
//if ($scope.lista.length>1){
//$ionicLoading.show({template: 'Carregando notificações ..'});
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
    if(data.length == 0){

        $scope.btn = true;

     }else{
      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
          if (data[i].video!=""){
            data[i].status_label="img/IconeVideo.png";
          };

          if (data[i].status_cc=="true"){
            data[i].status_label='{"background":"#A7DBD8"}';
          }else{
            data[i].status_label='{"background":"#F8F5FC"}';
          }


      $scope.listaNotificacao.push(angular.copy(data[i]));

     };  // for

    $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');
    }); // http
ionicLoading.hide();

}

$scope.paginacaoUsuario = function(){
var valores = {
  parametros:'pegaStatusUsuario',
  pagina:$scope.listaUsuario.length,
  idusuario:idUsuario
}

//$ionicLoading.show({template: 'Carregando mensagens...'});
$scope.btn = false;
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
    if(data.length == 0){

        $scope.btn = true;

     }else{

      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
          if (data[i].video!=""){
            data[i].status_label="img/IconeVideo.png";
          }
      $scope.listaUsuario.push(angular.copy(data[i]));

     };
      $scope.$broadcast('scroll.infiniteScrollComplete');
     }
    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');
//    $scope.$broadcast('scroll.refreshComplete');

    });
    $ionicLoading.hide();

}

////  fim *********************

$scope.convidaAmigos = function(){
 var link="https://play.google.com/store/apps/details?id=br.com.ics.socialmidia";

    $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
      console.log(allContacts);
    });

};


// pegar status de postagem
$scope.pegaStatus = function(){

var valores = {
  parametros:'pegaStatus',
  pagina:0,
  idcurso:localStorage.getItem('idcurso')

}
       $ionicLoading.show({
        template: 'Carregando feed de mensagens...'
      });

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){

     $scope.lista = [];

     for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
       //   data[i].perfil= path+"perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }
      $scope.lista.push(angular.copy(data[i]));
//      $scope.$broadcast('scroll.refreshComplete');

     // Stop the ion-refresher from spinning
    //  $scope.$broadcast('scroll.refreshComplete');



     };

    });
$ionicLoading.hide();
}
// recarregar o status de mensgens quado chegar ao final do scroll
$scope.paginacao = function(){

var valores = {
  parametros:'pegaStatus',
  idcurso:localStorage.getItem('idcurso'),
  pagina:$scope.lista.length,
  status:'Privada'
}
       $ionicLoading.show({
        template: 'Carregando feed de mensagens...'
      });
$scope.btn = false;

if ($scope.lista.length>1){
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
 //     //console.log($scope.lista.length);
//      if ($scope.lista.length>0){
    if(data.length == 0){

        $scope.btn = true;

     }else{

      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
       //   data[i].perfil= path+"perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }
 //     //console.log(data[i].nome);
      $scope.lista.push(angular.copy(data[i]));

//     };
     }
     }
    $scope.$broadcast('scroll.infiniteScrollComplete');
//    $scope.$broadcast('scroll.refreshComplete');

    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');

    });

}
$ionicLoading.hide();

}

$scope.mostraFoto = function(foto,titulo) {
  if (foto!=""){
   var alertPopup = $ionicPopup.alert({
     title: titulo,
     template: '<img class="full-image" src="'+foto+'" ></img>'
   });
   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });
   }
 };

$scope.mudaTema = function(tema,tema2){
  localStorage.setItem('tema',"bar-"+tema);
  localStorage.setItem('tab_tema',"tabs-background-"+tema+" "+tema2);
  localStorage.setItem('btn_tema',"button-"+tema);
  $scope.tema=localStorage.getItem('tema');
  $scope.tab_tema=localStorage.getItem('tab_tema');
  $scope.btn_tema=localStorage.getItem('btn_tema');
  $scope.showAlert('Informação','As mudanças seram aplicadas após reiniciar o app.');

}

$scope.pegaPapel = function(){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
 //     targetWidth: 200,
 //     targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

      var tempImg = new Image();
      tempImg.src =  "data:image/jpeg;base64," + imageData;
      tempImg.onload = function() {
        var MAX_WIDTH = (tempImg.width*0.30);
        var MAX_HEIGHT =(tempImg.height*0.30);
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
           if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }
        }
        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        $scope.img_fundo = canvas.toDataURL("image/jpeg");
        localStorage.setItem('img_fundo',"url("+$scope.img_fundo+")");
        $scope.showAlert('Informação','As mudanças seram aplicadas após reiniciar o app.');
        }

    }, function(err) {

    });

}

$scope.gravaUsuario = function(usuario){
       $ionicLoading.show({
        template: 'Enviando...'
      });

 //  delete $scope.usuario;
 //  $scope.usuarioForm.$setPristine();

    if ((idUsuario==0) || (idUsuario==null)) {
    var today = new Date();
    var dt =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

    var valores = {
      parametros:'gravarUsuario',
      nome:usuario.nome,
      email:usuario.email,
      data_cadastro:dt,
      endereco:usuario.localizacao,
      telefone:usuario.telefone,
      foto:usuario.foto_perfil,
      idcurso:usuario.idcurso,
      senha:usuario.senha,
      idpush:localStorage.getItem('tokem'),
      sexo:usuario.sexo
    }
    }else{
     var valores = {
      parametros:'atualizaUsuario',
      nome:usuario.nome,
      email:usuario.email,
      endereco:usuario.localizacao,
      telefone:usuario.telefone,
      foto:usuario.foto_perfil,
      sexo:usuario.sexo,
      idcurso:usuario.idcurso,
      senha:usuario.senha,
      idpush:localStorage.getItem('tokem'),
      idusuario:idUsuario
    }}
  //  //console.log(valores);
  //  //console.log(path+'api/api.php');
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

 //          console.log(data);

           if (data[0].idusuario){
            idUsuario=data[0].idusuario;
            $scope.idusuario=data[0].idusuario;
            localStorage.setItem('idusuario', data[0].idusuario);
            localStorage.setItem('nome', usuario.nome);
            localStorage.setItem('email', usuario.email);
            localStorage.setItem('endereco', usuario.endereco);
            localStorage.setItem('telefone', usuario.telefone);
            localStorage.setItem('sexo', usuario.sexo);
            localStorage.setItem('foto', usuario.foto_perfil);
            localStorage.setItem('idcurso', usuario.idcurso);
            localStorage.setItem('senha', usuario.senha);
            $ionicLoading.hide();
            $scope.showAlert('Informação','Usuário '+usuario.nome+' atualizado com sucesso!')
            $scope.closeUsuario();

           }else{
               $ionicLoading.hide();
               $scope.showAlert('Informação','erro ao cadastrar usuário, o email '+usuario.email+' esta ativo, por favor informe outro email ou entre em contato com o administrador do sistema para liberar o mesmo.');
           }

        }).error(function(data){
          $ionicLoading.hide();
          $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

        });


}

$scope.zoomFoto = function(img){
//  window.open(img);
//window.location.assign(img);
}

$scope.pegaComentario = function(){
$scope.listaComentario = [];
$scope.form={};

var valores = {
  parametros:'pegaComentario',
  idmensagem:$scope.idmensagem,
  pagina:0
}

//console.log(valores);
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){

      if ($scope.listaComentario.length>0)
      {
       // $scope.listaComentario = [];

      }
     for (var i = 0; i < data.length; i++) {

          data[i].data=new Date(data[i].data);

          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }

          $scope.listaComentario.push(angular.copy(data[i]));
      };
       $ionicLoading.hide();

    });
}

$scope.curtir = function(idmsg,qtdcurtir,index){
      $ionicLoading.show({
        template: 'Enviando...'
      });


    var today = new Date();
    $scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

    var valores = {
      parametros:'gravarCurtir',
      idmensagem:idmsg,
      idusuario:idUsuario,
      data:$scope.data_hora
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

              //console.log(data)
          //   $scope.pegaStatus();
              $scope.lista[index].classe_curtir="selecionado";
              $scope.lista[index].curtir=data[0].curtir;

              $ionicLoading.hide();
     //        $ionicLoading.hide();
    //       $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')

        }).error(function(data){
           $ionicLoading.hide();
           $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

        });


}

$scope.gravaComentario = function(form){
       $ionicLoading.show({
        template: 'Enviando...'
      });

    var today = new Date();
    $scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

    var valores = {
      parametros:'gravarComentario',
      idmensagem:$scope.idmensagem,
      idusuario:idUsuario,
      data:$scope.data_hora,
      comentario:form.comentario
    }
  //  //console.log(valores);

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            //console.log(data);
             $scope.lista[$scope.index].classe_comentar="selecionado";
             $scope.lista[$scope.index].comentario=data[0].comentario;
             $scope.pegaComentario();


     //        $ionicLoading.hide();
    //       $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')

        }).error(function(data){
          $ionicLoading.hide();
          $scope.showAlert('Informação','erro ao compaenviar a mensagem, sem conexão com a internet.');

        });


}
$scope.compartilhaAgenda = function(titulo,local,descricao,data,imagem,id,qtdCompartilhamento, index){

   var mensagem ="Evento: "+ titulo+' (Local: '+local+") "+descricao;

   $scope.listaAgenda[index].classe_compartilhar="selecionado";
   $cordovaSocialSharing
    .share(mensagem, titulo, imagem, "#coragemparamudar") // Share via native share sheet
    .then(function(result) {

    var today = new Date();
    $scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

    var valores = {
      parametros:'gravarCompartilhaAgenda',
      idagenda:id,
      idusuario:idusuario,
      data:$scope.data_hora

    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
             //console.log(data);
             $scope.listaAgenda[index].compartilhamento=data[0].compartilhamento;
             $scope.listaAgenda[index].classe_compartilhar="selecionado";
     //        $ionicLoading.hide();
    //       $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')

        }).error(function(data){
      //     $ionicLoading.hide();
      //     $scope.showAlert('Informação','erro ao compaenviar a mensagem, sem conexão com a internet.');

        });


    }, function(err) {
      // An error occured. Show a message to the user
    });


}

$scope.compartilhaProposta = function(titulo,descricao,imagem, link,index){

   var mensagem ="Àrea: "+ titulo +" Proposta: "+ descricao;
   $scope.listaProposta[index].classe_compartilhar="selecionado";

   $cordovaSocialSharing
    .share(mensagem, "#coragemparamudar", imagem, link) // Share via native share sheet
    .then(function(result) {
 //            $scope.listaProposta[index].classe_compartilhar="selecionado";
    }, function(err) {
      // An error occured. Show a message to the user
    });


}


$scope.compartilha = function(nome,imagem,video,mensagem,idmsg,qtdCompartilhamento, index){
   $scope.lista[index].classe_compartilhar="selecionado";

    var link =mensagem;
   var midia="";
   if (imagem==null){
      midia=video;
   }else{
      midia=imagem;
   }
   $cordovaSocialSharing
    .share(mensagem, nome, midia, "#CORAGEMPARAMUDAR") // Share via native share sheet
   .then(function(result) {

     var today = new Date();
    $scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

    var valores = {
      parametros:'gravarCompartilha',
      idmensagem:idmsg
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
             //console.log(data);
             $scope.lista[index].compartilhamento=data[0].compartilhamento;
             $scope.lista[index].classe_compartilhar="selecionado";
     //        $ionicLoading.hide();
    //       $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')

        }).error(function(data){
      //     $ionicLoading.hide();
      //     $scope.showAlert('Informação','erro ao compaenviar a mensagem, sem conexão com a internet.');

        });


    }, function(err) {
      // An error occured. Show a message to the user
    });


}
$scope.vidChat =function() {
   $ionicLoading.show({template: 'Aguarde...'});

       var video = document.getElementById("VideoChat");
       var button = document.getElementById("Connect");
       if (video.paused) {
          video.play();
          button.textContent = " Desconectar";
          $ionicLoading.hide();
          $scope.onChat = true;
       } else {
          video.pause();
          button.textContent = " Conectar";
          $ionicLoading.hide();
          $scope.onChat = false;

       }
    };
/*
document.getElementById("Video").addEventListener("progress", function(){
    alert ('carregando video')
});
*/

$scope.videoPlay =function(index) {
      $scope.video();

      document.getElementById("myvideo").innerHTML='<video id="Video" controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" poster ="gif/carregando05.gif" class="videoPlayer"><source src="'+$scope.listaVideo[index].link+'" type="video/mp4"/></video>';

       $scope.titulo=$scope.listaVideo[index].titulo;

       var video = document.getElementById("Video");
     //  var button = document.getElementById("playVideos"); class="full-image"
//       video.src=$scope.listaVideo[index].link;
    //   video.setAttribute("controls", true);
/*
    video.loop = false;
    video.addEventListener('ended', function() { video.currentTime=0.1; video.play(); }, false);
    video.play();



*/




//       alert (video.seekable.start())

       if (video.paused) {
          video.play();
      //    button.textContent = " ||";


       } else {
          video.pause();
       //   button.textContent = " >";
       }

    };


$scope.enviarVideo = function(formulario){

      $ionicLoading.show({
        template: 'Enviando...'
      });

    $scope.tipo=formulario.tipo;
    $scope.endereco=formulario.endereco;
    $scope.assunto=formulario.assunto;
    $scope.descricao=formulario.descricao;
    $scope.localizacao=formulario.localizacao;
    $scope.status=formulario.status;

    var today = new Date();
    $scope.video_file ="vdo_file-"+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+
                     "-"+today.getMinutes()+"-"+today.getSeconds()+today.getMilliseconds()+".mp4";
        /// ***** enviar video ******
      $ionicLoading.show({
        template: 'Enviando...'
      });
      $scope.video_file_path=path+"video/"+$scope.video_file;
      $scope.currentPercentage=0;
        var url = path+"uploadftp_video.php";
        //File for Upload
        var targetPath =$scope.video;
        // File name only
        var filename = $scope.video_file;
        var options = {
             fileKey: "file",
             fileName: filename,
             chunkedMode: false,
             mimeType: "video/mp4",
         params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
         };
         $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            // //console.log("SUCCESS: " + JSON.stringify(result.response));
             $scope.gravarTexto();
             $ionicLoading.hide();
           //  $scope.videoForm.$setPristine();
         }, function (err) {
             $ionicLoading.hide();
             $scope.showAlert("Erro ao Enviar Vídeo", JSON.stringify(err));
         }, function (progress) {
                 if (progress.lengthComputable) {
                   var perc = Math.floor(progress.loaded / progress.total * 100);
                   $scope.currentPercentage=perc;
                }
         });

}

$scope.enviarTexto = function(formulario){

      $ionicLoading.show({
        template: 'Enviando...'
      });

      $scope.tipo=formulario.tipo;
      $scope.endereco=formulario.endereco;
      $scope.assunto=formulario.assunto;
      $scope.descricao=formulario.descricao;
      $scope.localizacao=formulario.localizacao;
      $scope.status=formulario.status;
      $scope.gravarTexto();
//      $scope.msgForm.$setPristine();
};

$scope.enviarFoto = function(formulario){

      $ionicLoading.show({
        template: 'Enviando...'
      });

      $scope.currentPercentage=0;
      $scope.tipo=formulario.tipo;
      $scope.endereco=formulario.endereco;
      $scope.assunto=formulario.assunto;
      $scope.descricao=formulario.descricao;
      $scope.localizacao=formulario.localizacao;
      $scope.status=formulario.status;


        $scope.dataURL = $scope.foto;
        var today = new Date();
        $scope.foto_file="img_file-"+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+today.getMilliseconds()+".jpg";
        $scope.foto_file_path=path+'foto/'+$scope.foto_file;
       // enviar o arquivo compactado *******************************************

        var url = path+"uploadftp_foto.php";
        //File for Upload
        var targetPath =$scope.dataURL;
        // File name only
        var filename = $scope.foto_file;
        var options = {
             fileKey: "file",
             fileName: filename,
             chunkedMode: false,
             mimeType: "image/jpg",
         params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
         };
         $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            // //console.log("SUCCESS: " + JSON.stringify(result.response));
             $scope.gravarTexto();
           //  $scope.fotoForm.$setPristine();

         }, function (err) {
             $ionicLoading.hide();
             $scope.showAlert("Erro ao Enviar Imagem", JSON.stringify(err));
         }, function (progress) {
                 if (progress.lengthComputable) {
                   var perc = Math.floor(progress.loaded / progress.total * 100);
                   $scope.currentPercentage=perc;
                }
         });


};

$scope.pegaLocal = function(){

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      $http({
          method:'POST',
          url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.latitude+","+$scope.longitude,
          datatype: 'jsonp',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
             $scope.msgvideo.localizacao =data.results[0].formatted_address;
             $scope.msgfoto.localizacao =data.results[0].formatted_address;
             $scope.msgtexto.localizacao =data.results[0].formatted_address;
             $scope.localizacao =data.results[0].formatted_address;

             $scope.endereco =data.results[0].formatted_address;
             $scope.bairro=data.results[1].formatted_address;
             $scope.usuario.localizacao =data.results[0].formatted_address;


          }).error(function(data){

             $scope.showAlert('ERRO NO GPS','Não foi possível pegar sua localização.'); // error

          });

    }, function(err) {
         $scope.showAlert('ERRO NO GPS','Não foi possível pegar sua localização.'); // error
    });

};

$scope.gravaCompartilha = function(idMsg,qtdCompartilhamento){
alert (idmsg +" "+qtdCompartilhamento);

}

$scope.mostraVideo = function(index) {
  if ($scope.lista[index].video!=""){
   var alertPopup = $ionicPopup.alert({
     title: 'Vídeo',
     template: '<video controls="controls" preload="metadata" poster ="gif/carregando05.gif" webkit-playsinline="webkit-playsinline" class="full-image"><source src="'+$scope.lista[index].video+'" type="video/mp4"/></video>'
   });

   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });
   }
 };

 $scope.mostraAgenda=function(index) {
   var alertPopup = $ionicPopup.alert({
     title: 'Agenda',
     template: '<h4>'+$scope.listaAgenda[index].descricao+'</h4>'
   });

   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });

 };

$scope.mostraVideo2 = function(index) {
  if ($scope.listaVideo[index].link!=""){
   var alertPopup = $ionicPopup.alert({
     title: $scope.listaVideo[index].titulo,
     template: '<video controls="controls" autoplay="autoplay" poster ="gif/carregando05.gif" class="video-js full-image" ><source src="'+$scope.listaVideo[index].link+'" type="video/mp4"/></video>'
   });

   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });
   }
 };

$scope.mostraVideo3 = function() {
  alert ('video mostrar')
  if ($scope.video!=""){
   var alertPopup = $ionicPopup.alert({
     title: 'Vídeo',
     template: '<video controls="controls" preload="metadata" webkit-playsinline="webkit-playsinline" class="full-image"><source src="'+$scope.video+'" type="video/mp4"/></video>'
   });

   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });
   }
 };

$scope.gravarChat = function(formChat){
if (idUsuario!=""){
 $ionicLoading.show({template: 'Enviando...'});


var today = new Date();
$scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
if ($scope.endereco==null){
  $scope.endereco=" ";
}
var valores = {
  parametros:'gravarChat',
  assunto:formChat.assunto,
  descricao:formChat.descricao,
  bairro:$scope.bairro,
  localizacao:$scope.localizacao,
  latitude:$scope.latitude,
  longitude:$scope.longitude,
  idusuario:idUsuario,
  data_hora:$scope.data_hora

}
$scope.msgtexto.descricao="";
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
       console.log(data);
       $ionicLoading.hide();

    }).error(function(data){
       $ionicLoading.hide();
       $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

    });
 } else {
       $scope.showAlert('Informação','Para vc mandar mensagens vc precisa primeiro se cadastrar no aplicativo. Se vc estiver tendo dificudades em fazer o cadatro entre em contato com o suporte pelo email: paulospcoelho@hotmail.com');

 }
}

$scope.gravarTexto = function(){
if (idUsuario!=""){
var today = new Date();
$scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
if ($scope.endereco==null){
  $scope.endereco=" ";
}

var valores = {
  parametros:'gravarMensagem',
  pagina:0,
  tipo:"Mensagem",
  assunto:$scope.assunto,
  descricao:$scope.descricao,
  bairro:$scope.bairro,
  endereco:$scope.endereco,
  localizacao:$scope.localizacao,
  latitude:$scope.latitude,
  longitude:$scope.longitude,
  idusuario:idUsuario,
  idcurso:localStorage.getItem('idcurso'),
  idorgao:0,
  area:"",
  status:"Publica",
  data_hora:$scope.data_hora,
  foto:$scope.foto_file_path,
  video:$scope.video_file_path

}
//console.log(valores);
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
//       console.log(data);
       $ionicLoading.hide();
//      $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')
       $scope.closemenu_msg();
//       $scope.limparDados();
       $scope.foto_file_path="";
       $scope.video_file_path="";
       $scope.msgvideo={};
       $scope.msgfoto={};
       $scope.msgtexto={};
       $scope.pegaStatus();

    }).error(function(data){
       $ionicLoading.hide();
       $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

    });
 } else {
       $scope.showAlert('Informação','Para vc mandar mensagens vc precisa primeiro se cadastrar no aplicativo. Se vc estiver tendo dificudades em fazer o cadatro entre em contato com o suporte pelo email: paulospcoelho@hotmail.com');

 }
}
// inicio popup
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    //console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       //console.log('You are sure');
     } else {
       //console.log('You are not sure');
     }
   });
 };
 // An alert dialog
 $scope.showAlert = function(titulo,template) {
   var alertPopup = $ionicPopup.alert({
     title: titulo,
     template: template
   });

   alertPopup.then(function(res) {
    // //console.log('Thank you for not eating my delicious ice cream cone');
   });

 };
//   fim popup
$scope.carregarFoto = function(opc){


    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URI,
      sourceType: opc,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

     $scope.foto  =  imageData;
     $scope.btnMsg = false;
     $scope.msgFoto = true;

    }, function(err) {
       alert ('erro ao capturar imagem.')
    });


}

$scope.carregarFotoPerfil = function(opc){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URI,
      sourceType: opc,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };


    $cordovaCamera.getPicture(options).then(function(imageData) {
       $scope.usuario.foto_perfil=imageData;
    }, function(err) {
       alert ('erro ao carregar a foto.')
    });

}

$scope.carregarVideo = function(opc){
  $scope.foto  =  " foto";
  if (opc==1){

  var opcoes =  { limit: 1, quality: 30, duration:60};

    $cordovaCapture.captureVideo(options).then(function(videoData) {

    var i, path, len;
    for (i = 0, len = videoData.length; i < len; i += 1) {
        path = videoData[i];
       };

      $scope.btnMsg = false;
      $scope.msgVideo = true;
      $scope.video=path.fullPath;
      document.getElementById("myvideoPopup").innerHTML='<video style="height: 320px; width: 320px;" id="Video" controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" poster ="images/filmes_logo.jpg" class="videoPlayer"><source src="'+$scope.video+'" type="video/mp4"/></video>';



      // Success! Video data is here
    }, function(err) {
       alert('erro ao carregar o vídeo');
    });


  }else{

    var options ={ quality: 30,
    destinationType: navigator.camera.DestinationType.FILE_URI, // retrona o path imageURI
//    destinationType: navigator.camera.DestinationType.DATA_URL, // retrona o path imageURI
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType:1
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.btnMsg = false;
      $scope.msgVideo = true;
      /*
      window.FilePath.resolveNativePath(imageData, successCallback, errorCallback);
      function successCallback(file){
           resize_vdo("file:"+file);
      }
      function errorCallback(err){
        alert ('erro ao coneverter Path');
      }


      */

      $scope.video=imageData;

    }, function(err) {
      alert('erro ao carregar o vídeo');

    });

    }


}


$scope.carregarTexto = function(){
$scope.btnMsg = false;
$scope.msgTexto = true;
}

$scope.carregarCurtir = function(){
$scope.listaCurtir = [];
var valores = {
  parametros:'pegaCurtir',
  idmensagem:$scope.idmensagem,
  pagina:0
}

//console.log(valores);
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){

      if ($scope.listaCurtir.length>0)
      {
       // $scope.listaComentario = [];

      }

     for (var i = 0; i < data.length; i++) {

          data[i].data=new Date(data[i].data);
          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }
          $scope.listaCurtir.push(angular.copy(data[i]));
      };
       $ionicLoading.hide();


    });
}
$scope.limparDados = function(){
  $scope.btnMsg = true;
  $scope.msgFoto = false;
  $scope.msgVideo = false;
  $scope.msgTexto = false;
  $scope.idorgao="0";
  $scope.video="";
  $scope.foto="";
  $scope.idmensagem="";
  $scope.descricao="";
  $scope.latitude="";
  $scope.longitude="";
  $scope.data_hora="";
  $scope.endereco="";
  $scope.status="";
  $scope.bairro="";
 // $scope.tipo="";
  $scope.area="";
  $scope.status="";
  $scope.foto_file="";
  $scope.foto_file_path="";
  $scope.video_file="";
  $scope.video_file_path="";
  $scope.currentPercentage=0;

}

//===========================================================================================
  $ionicModal.fromTemplateUrl('templates/menu-msg.html', {
    scope: $scope
  }).then(function(menu) {
    $scope.menu = menu;
  });

  // Triggered in the login modal to close it
  $scope.closemenu_msg = function() {
    $scope.msgTexto=false;
    $scope.msgVideo=false;
    $scope.msgFoto=false;
    $scope.btnMsg=true;

    $scope.menu.hide();
  };
  // Open the login modal
  $scope.menu_msg = function() {
    $scope.menu.show();
    $scope.pegaLocal();
  };

  $ionicModal.fromTemplateUrl('templates/tab-tv.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modaltv = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTv = function() {
    $scope.modaltv.hide();
  };

  // Open the login modal
  $scope.tv = function() {

    $scope.modaltv.show();
  };

  // Abre tela de cadastro
  $ionicModal.fromTemplateUrl('templates/tab-radio.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalradio = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRadio = function() {
    $scope.modalradio.hide();
  };

  // Open the login modal
  $scope.radio = function() {

    $scope.modalradio.show();
  };
//   abre tema
  $ionicModal.fromTemplateUrl('templates/tab-tema.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modaltema = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTema = function() {
    $scope.modaltema.hide();
  };

  // Open the login modal
  $scope.abreTema = function() {

    $scope.modaltema.show();
  };

  // Abre tela de cadastro
  $ionicModal.fromTemplateUrl('templates/tab-comentar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalcomentar = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeComentar = function() {
//    $scope.pegaStatus();
    $scope.modalcomentar.hide();
  };

  // Open the login modal
  $scope.comentar = function(idmensagem, qtd, index) {
    $scope.idmensagem=idmensagem;
    $scope.qtdComentario=qtd;
    $scope.index=index;
    $scope.video= $scope.lista[index].video;
    $scope.foto=$scope.lista[index].foto;
    $scope.descricao=$scope.lista[index].descricao;
    $scope.data_hora=$scope.lista[index].data_hora;
    $scope.endereco=$scope.lista[index].endereco;
    $scope.assunto=$scope.lista[index].assunto;
    $scope.curtir=$scope.lista[index].curtir;
    $scope.comentario=$scope.lista[index].comentario;
    $scope.compartilhamento=$scope.lista[index].compartilhamento;
    $scope.lista[index].status_label='{"background":"#F8F5FC"}';
    $scope.pegaComentario();
    $scope.modalcomentar.show();
  };

  $scope.comentarNotificacao = function(idmensagem, qtd, index) {
    $scope.idmensagem=idmensagem;
    $scope.qtdComentario=qtd;
    $scope.index=index;
    $scope.video= $scope.listaNotificacao[index].video;
    $scope.foto=$scope.listaNotificacao[index].foto;
    $scope.descricao=$scope.listaNotificacao[index].descricao;
    $scope.data_hora=$scope.listaNotificacao[index].data_hora;
    $scope.endereco=$scope.listaNotificacao[index].endereco;
    $scope.assunto=$scope.listaNotificacao[index].assunto;
    $scope.curtir=$scope.listaNotificacao[index].curtir;
    $scope.comentario=$scope.listaNotificacao[index].comentario;
    $scope.compartilhamento=$scope.listaNotificacao[index].compartilhamento;
   // $scope.listaNotificacao[index].status_label='{"background":"#F4FFF9"}';
    $scope.pegaComentario();
    $scope.modalcomentar.show();
  };


$ionicModal.fromTemplateUrl('templates/tab-usuario.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalusuario = modal;
});

$scope.closeUsuario = function() {
    $scope.modalusuario.hide();
};



$scope.usuario = function() {
  $scope.usuario.idusuario=localStorage.getItem('idusuario');
 $scope.usuario.nome= localStorage.getItem('nome');
 $scope.usuario.email= localStorage.getItem('email');
 $scope.usuario.endereco = localStorage.getItem('endereco');
 $scope.usuario.telefone = localStorage.getItem('telefone');
 $scope.usuario.idade = localStorage.getItem('idade');
 $scope.usuario.sexo = localStorage.getItem('sexo');
 $scope.usuario.foto_perfil = localStorage.getItem('foto');
 $scope.usuario.idcurso = localStorage.getItem('idcurso');
 if ($scope.usuario.foto_perfil==null){
    $scope.usuario.foto_perfil="images/foto.jpg";
 }

   $scope.modalusuario.show();
};

$ionicModal.fromTemplateUrl('templates/tab-social.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalsocial = modal;
});

$scope.closeSocial = function() {
    $scope.modalsocial.hide();
};

$scope.social = function() {
   $scope.pegaSocial();
   $scope.modalsocial.show();
};

$ionicModal.fromTemplateUrl('templates/tab-help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalhelp = modal;
});

$scope.closeHelp = function() {
    $scope.modalhelp.hide();
};

$scope.help = function() {
   $scope.modalhelp.show();
};

$ionicModal.fromTemplateUrl('templates/tab-contato.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalcontato = modal;
});

$scope.closeContato = function() {
    $scope.modalcontato.hide();
};

$scope.contato = function() {
   $scope.modalcontato.show();
};

$ionicModal.fromTemplateUrl('templates/tab-chatonLive.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalchatonLive = modal;
});

$scope.closechatonLive = function() {
    $scope.modalchatonLive.hide();
};

$scope.chatonLive = function() {
   $scope.pegaLocal();
   $scope.pegaCategoria();
   $scope.modalchatonLive.show();
};


$ionicModal.fromTemplateUrl('templates/tab-curtir.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalpegacurtir = modal;
});

  // Triggered in the login modal to close it
$scope.closepegaCurtir = function() {
//    $scope.pegaStatus();
    $scope.modalpegacurtir.hide();
};

  // Open the login modal
$scope.pegaCurtir = function(idmensagem, qtd) {
    $scope.idmensagem=idmensagem;
    $scope.qtdCurtir=qtd;

    $scope.carregarCurtir();

    $scope.modalpegacurtir.show();
};

$ionicModal.fromTemplateUrl('templates/tab-bloqueado.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalbloqueado = modal;
});

$scope.closeusuarioBloqueado = function() {
 //   $scope.modalbloqueado.hide();
  //  encerrar o aplicativo
  navigator.app.exitApp();
};

$scope.usuarioBloqueado = function() {
   $scope.modalbloqueado.show();
};

$ionicModal.fromTemplateUrl('templates/tab-ativar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalativar = modal;
});

$scope.closeativarUsuario = function() {
   $scope.modalativar.hide();
  //  encerrar o aplicativo
};

$scope.ativarUsuario = function() {
   $scope.modalativar.show();
};
$ionicModal.fromTemplateUrl('templates/video.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalvideo = modal;
});

$scope.closeVideo = function() {
    var video = document.getElementById("Video");
    video.pause();
    video.src="";
    $scope.modalvideo.hide();
};

$scope.video = function() {
   $scope.modalvideo.show();
};


})  // fim mensgaemCtrl



.controller('TemaCtrl', function($scope) {
$scope.tema=localStorage.getItem('tema');
$scope.tab_tema=localStorage.getItem('tab_tema');
$scope.btn_tema=localStorage.getItem('btn_tema');
})

.controller('EntreternimentoCtrl', function($scope) {
$scope.tema=localStorage.getItem('tema');
$scope.tab_tema=localStorage.getItem('tab_tema');
$scope.btn_tema=localStorage.getItem('btn_tema');
})

.controller('EnqueteCtrl', function($scope) {
  $scope.tema=localStorage.getItem('tema');
  $scope.tab_tema=localStorage.getItem('tab_tema');
  $scope.btn_tema=localStorage.getItem('btn_tema');
})

.controller('MapCtrl', function($scope, $state, $http, $cordovaGeolocation, $ionicLoading) {
//$scope.listaMap=[];

$scope.idmensagemMap="";
$scope.qtdMensagemNova="Mapa de Mensagens...";
$scope.carregaMapa = function() {
  $ionicLoading.show({template: 'Carregando...'});

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      title: 'Sua localização atual!',
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'ico/usuario.png',
      map: $scope.map,
      animation: google.maps.Animation.DROP
    });

/// inicio do ajax

    var valores = {
      parametros:'pegaStatusMapa',
      pagina:0,
      status:'Privada'
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){


//         $scope.listaMap=[];

         for (var i = 0; i < data.length; i++) {
              if (i==0){
                      $scope.idmensagemMap=data[0].idmensagem;
                      $scope.idmensagemMapAtual=data[0].idmensagem;

                    }

              data[i].data_hora=new Date(data[i].data_hora);
              if (data[i].assunto=="Saúde"){
                 var icone = 'ico/saude.png';
              }else if (data[i].assunto=="Produção do Programa"){
                var icone = 'ico/producao.png';
              }else if (data[i].assunto=="Educação"){
                var icone = 'ico/educacao.png';
              }else if (data[i].assunto=="Transporte"){
                var icone = 'ico/transporte.png';
              }else if (data[i].assunto=="Segurança"){
                var icone = 'ico/seguranca.png';
              }else if (data[i].assunto=="Saneamento Básico"){
                var icone = 'ico/saneamento.png';
              }else if (data[i].assunto=="Iluminação Pública"){
                var icone = 'ico/iluminacao.png';
              }else if (data[i].assunto=="Meaio Ambiente"){
                var icone = 'ico/meio.png';
              };
  //           $scope.listaMap.push(angular.copy(data[i]));

              var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
//                 title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 icon: icone,
                 map: $scope.map,
                 animation: google.maps.Animation.DROP
                });

 //                title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,

                var contentString = '<div><h4>'+data[i].assunto +'</h4>'+
                                    '<h4 style="color:blue"><p><b>'+ data[i].nome+'</b></p></h4>'+
                                    '<h5><p><b>'+ data[i].descricao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].localizacao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].endereco +'</b></p></h5></div>';
              $scope.attachSecretMessage(marker, contentString);

      };//fim do laco




  }); // fim do ajax

  }, function(error){
   $ionicLoading.hide();
    alert("Por favor, saia do aplicativo e ligue a localizacão do seu celular.");
  });

 $ionicLoading.hide();

};// da funcao
$scope.attachSecretMessage = function(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
});
google.maps.event.addListener(marker,'click', function() {
         infowindow.open(marker.get('map'), marker);

});

}

$scope.paginaMap= function(){
  /// inicio do ajax


    var valores = {
      parametros:'paginaStatusMapa',
      idmensagem: $scope.idmensagemMapAtual,
      status:'Privada'
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){



         for (var i = 0; i < data.length; i++) {
              if (i==0){
                      $scope.qtdMensagemNova="Novas Mensagens  #"+(data[0].idmensagem-$scope.idmensagemMap);
                      $scope.idmensagemMapAtual=data[0].idmensagem;
                  }
              data[i].data_hora=new Date(data[i].data_hora);

              if (data[i].assunto=="Saúde"){
                 var icone = 'ico/saude_novo.png';
              }else if (data[i].assunto=="Produção do Programa"){
                var icone = 'ico/producao_novo.png';
              }else if (data[i].assunto=="Educação"){
                var icone = 'ico/educacao_novo.png';
              }else if (data[i].assunto=="Transporte"){
                var icone = 'ico/transporte_novo.png';
              }else if (data[i].assunto=="Segurança"){
                var icone = 'ico/seguranca_novo.png';
              }else if (data[i].assunto=="Saneamento Básico"){
                var icone = 'ico/saneamento_novo.png';
              }else if (data[i].assunto=="Iluminação Pública"){
                var icone = 'ico/iluminacao_novo.png';
              }else if (data[i].assunto=="Meaio Ambiente"){
                var icone = 'ico/meio_novo.png';
              };
// adiciona a lista
    //         $scope.listaMap.push(angular.copy(data[i]));

              var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
//                 title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 icon: icone,
                 map: $scope.map,
                 animation: google.maps.Animation.DROP
                });

 //                title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,

                var contentString = '<div><h4>'+data[i].assunto +'</h4>'+
                                    '<h4 style="color:blue"><p><b>'+ data[i].nome+'</b></p></h4>'+
                                    '<h5><p><b>'+ data[i].descricao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].localizacao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].endereco +'</b></p></h5></div>';
              $scope.attachSecretMessage(marker, contentString);

      };//fim do laco




  });
}
$scope.carregaMapa();
var intervalo = window.setInterval(function() {

   $scope.paginaMap();


}, 10000);
/*
window.setTimeout(function() {
    clearInterval(intervalo);
    alert ('teste')
},30000);
*/


})
