// ==UserScript==
// @name         GUITAR FLASH MULTIPLAYER SONG SELECT - automated by BlackKing
// @namespace    BlackKing
// @version      0.0.1
// @description  Permite Escolher a musica pelo nome no modo multiplayer
// @author       Lucas Alves
// @match        http://guitarflash.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //funcao utilizada para pegar elementos pelo Xpath
    function getElementByXPath(path) {
        return (new XPathEvaluator())
            .evaluate(path, document.documentElement, null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
    }

    //Botao Skip
    var btn_skp = getElementByXPath('//*[@id="fsVotD"]');

    //Controlar Start/Stop
    var v_stop = 1;


    var start = function (){
        v_stop = 0;
        buscar();
    };

    var stop = function(){
        v_stop = 1;
        document.getElementById('status').innerHTML = "Desligado";
    };

    var waitingChange = function(cache){
        atual = getElementByXPath('/html/body/div[4]/div/div[1]/div[5]/div[2]/div[2]/div[1]/div[3]/div/a[1]/div/div[2]/div[1]');
        if(atual===cache){
            buscar();
        }
        else{
            setTimeout(waitingChage(cache), 500);
        }
    };


    var buscar = function (){

        if(v_stop == 1){
            return;
        }

        document.getElementById('status').innerHTML = "Buscando Musica: " + v_search;

        console.log('Verificando....');

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
                waitingChange(opc1);
        }
    };

    var chooseMusic = function(btn){
        btn.click();
        stop();
    };

    var criarMenu = function (){
        var menu = document.createElement('div');
        menu.innerHTML = '' +
            '<style type="text/css">' +
            '.btn{color: white;font-weight: bold;padding: 5px 20px;border: none;};' +
            '#status{float:left;};' +
            '#menu_area{float:left;width:100px;heigth:30px;background-color:gray;}' +
            '</style>' +
            '<div id="menu_area">' +
            '<button type="button" class="btn" onClick="start()" style="background-color: green;">BUSCAR</button>' +
            '<p id="status">Desligado</p>' +
            '</div>';

        //document.getElementById('jogoRodapeBts1').append(menu);
        document.getElementById('divConteudoDinamico').append(menu);

    };

    criarMenu();


})();