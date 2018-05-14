(function($) {
  'use strict';
  /*
  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
var aplication =( function () {
  return {
    init : function init(){
      this.CompanyInfo();
      this.initEvents();
    },
    
    CompanyInfo : function CompanyInfo(){
      
      var ajax = new XMLHttpRequest();
      ajax.open('GET','company.json',true);
      ajax.send();
      ajax.addEventListener('readystatechange',this.getCompany,false);
    }, 
    
    getCompany : function getCompany(){
      if (aplication.isReady.call(this)){
        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="companyName"]');
        var $companyPhone = $('[data-js="companyPhone"]');
        $companyName.get().textContent = data.name;
        $companyPhone.get().textContent = data.phone;
      }
    },
    
    isReady : function isReady(){
      return this.readyState === 4 && this.status === 200;
    },
      
    initEvents : function initEvents(){
      $('[data-js="formularioCar"]').on('submit',this.handleForm);
    },
    
    handleForm : function handleForm(e){
      console.log(e); 
      e.preventDefault();
      var $tableCar = $('[data-js="tableCar"]').get();
      $tableCar.appendChild(aplication.createCar())
    },

    createCar : function createCar(){
      //return document.createTextnode('ola');
      var $fragmentCar = document.createDocumentFragment();
      var $tr = document.createElement('tr');
      var $tdImage = document.createElement('td');
      var $tdMarcaModel = document.createElement('td');
      var $tdCor = document.createElement('td');
      var $tdAno = document.createElement('td');
      var $tdPlaca = document.createElement('td');     
      var $image = document.createElement('img');

      $image.setAttribute('src', $('[data-js="imagem"]').get().value);   //para por imagem preciso setar um atributo
      $tdImage.appendChild($image);
      $tdMarcaModel.textContent = $('[data-js="marca-model"]').get().value;
      $tdCor.textContent = $('[data-js="cor"]').get().value;
      $tdAno.textContent = $('[data-js="ano"]').get().value;
      $tdPlaca.textContent = $('[data-js="placa"]').get().value;

      $tr.appendChild($tdImage);
      $tr.appendChild($tdMarcaModel);
      $tr.appendChild($tdCor);
      $tr.appendChild($tdAno);
      $tr.appendChild($tdPlaca);

      return $fragmentCar.appendChild($tr);
    } 
  }
})();

aplication.init();

})(window.DOM,document);
