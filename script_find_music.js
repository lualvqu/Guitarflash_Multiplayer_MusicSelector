// ==UserScript==
// @name         GUITAR FLASH MULTIPLAYER SONG SELECT - automated by BlackKing
// @namespace    BlackKing
// @version      0.1.0
// @description  Permite Escolher a musica pelo nome no modo multiplayer
// @author       Lucas Alves
// @match        http://guitarflash.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Variavel para guardar o IdInterval da funcao
    var IdIntervaloWaitingChange

    //Variavel usada para controlar Start/Stop
    var v_stop = 1;

    //funcao utilizada para pegar elementos pelo Xpath
    function getElementByXPath(path) {
        return (new XPathEvaluator())
            .evaluate(path, document.documentElement, null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
    };

/*//////////////////////////////////////////////////
    Criando o Menu e adicionado ele a pagina
//////////////////////////////////////////////////*/

    //Setando onde o menu sera adicionado

    var gancho = document.getElementById('divTudo');

    var setGancho = function(classe){
        gancho = document.getElementById(classe);
    };

    //criando o html do menu

    var criarMenu = function (){
        var menu = document.createElement('div');
        menu.classList.add('float-left');
        menu.innerHTML = '' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
        '<div class="container">' +
            '<div id="menu_area" class="row align-itens-center">' +
                '<div class="col-lg-3 text-left py-2">' +
                    '<button id="btn-busca" type="button" class="btn btn-success font-weight-bold" onClick="start()">BUSCAR</button>' +
                    '<span id="status" class="badge badge-danger align-middle">Desligado</span>' +
                '</div> ' +
            '</div>' +
        '</div>' +
        '';

        gancho.append(menu);

    };

    //adicionando o menu a pagina
    criarMenu();

/*//////////////////////////////////////////////////
    Pegando os objetos html dos botoes via xpath 
                para usar nas funcoes
//////////////////////////////////////////////////*/

    //Botao Skip
    var btn_skp = getElementByXPath('//*[@id="fsVotD"]');

/*//////////////////////////////////////////////////
    > Controlar Start e Stop do search do bot
//////////////////////////////////////////////////*/

    var start = function (){
        v_stop = 0;
        classToggle();
        buscar();
    };

    var stop = function(){
        v_stop = 1;
        document.getElementById('status').innerHTML = "Desligado";
        classToggle();
    };

    var classToggle = function(){
        document.getElementById('btn-busca').classList.toggle('btn-success');
        document.getElementById('btn-busca').classList.toggle('btn-danger');
        document.getElementById('status').classList.toggle('badge-success');
        document.getElementById('status').classList.toggle('badge-danger');
    };

/*//////////////////////////////////////////////////
    > Main Functions BOT
//////////////////////////////////////////////////*/

    //funcao verifica se a primeira musica das opcoes atuais ja mudou
    var waitingChange = function(cache){
        atual = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[1]/div/div[2]/div[1]');
        if(atual===cache){
            buscar();
        }
    };

    //cria um intervalo de repeticao para funcao ficar checando se as opcoes mudaram a cada X segundos
    var criarInterval = function(cache){
        IdIntervaloWaitingChange = setInterval(waitingChange(cache), 1000);
        waitingChange(cache);
    };

    //deleta o intervalo criado
    var pararInterval = function(){
        clearInterval(IdIntervaloWaitingChange);
    };

    //funcao principal de busca e verifica se a musica digitada no chat esta entres as opcoes atuais
    var buscar = function (){

        if(v_stop == 1){
            return;
        }

        document.getElementById('status').innerHTML = "Buscando Musica: " + v_search;

        try {
            opc1 = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[1]/div/div[2]/div[1]');
            opc2 = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[2]/div/div[2]/div[1]');
            opc3 = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[3]/div/div[2]/div[1]');
            opc4 = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[4]/div/div[2]/div[1]');
            v_search = document.getElementById('inChat').value;
        }
        catch(err) {
            console.log('Erro ao tentar capturar informações.');
            stop();
            return;
        }

        switch(v_search){
            case opc1.innerHTML:
                chooseMusic(opc1);
                break;
            case opc2.innerHTML:
                chooseMusic(opc2);
                break;
            case opc3.innerHTML:
                chooseMusic(opc3);
                break;
            case opc4.innerHTML:
                chooseMusic(opc4);
                break;
            default:
                btn_skp.click();
                criarInterval(opc1);
        }
    };

    //Funcao para clicar na musica encontrada
    var chooseMusic = function(btn){
        btn.click();
        stop();
    };

})();