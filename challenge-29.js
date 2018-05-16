(function($) {
  'use strict';

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
        var $tdMarcaModel = aplication.createItem('td','textContent','[data-js="marca-model"]');
        var $tdCor = aplication.createItem('td','textContent','[data-js="cor"]');
        var $tdAno = aplication.createItem('td','textContent','[data-js="ano"]');
        var $tdPlaca = aplication.createItem('td','textContent','[data-js="placa"]');     
        var $image = aplication.createItem('img','src','[data-js="imagem"]');
        
        $tdImage.appendChild($image);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdMarcaModel);
        $tr.appendChild($tdCor);
        $tr.appendChild($tdAno);
        $tr.appendChild($tdPlaca);

        return $fragmentCar.appendChild($tr);
      } ,

      createItem : function CreateItem(item,propritey,dom){
        var variavel = document.createElement(item);
        variavel[propritey] =  $(dom).get().value;
        //variavel.setAttribute((propritey), $(dom).get().value); 
        return variavel;  
      }
    }
  })();

  aplication.init();
})(window.DOM,document);
