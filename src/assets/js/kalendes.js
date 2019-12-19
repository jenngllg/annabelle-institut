(function() {

    // Localize jQuery variable
    var jQuery;
    var host = "https://www.kalendes.com";


    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.1.0') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);

        // Call our main function
        main();
    }
    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            /**
             * Objets et fonctions du widget
             */
            kalendes = {
                html:{
                    container:null,
                    iframe:null,
                    button:null,
                    iosHandlerWindow:null
                },
                initial:{
                    isInitialized:false,
                    hasError:false,
                    hasClicked:false
                },
                isFullPage:false,
                isMinimized:true,
                boutique:null
            };
            /******** ios bloque les cookie de Kalendes tant qu'un premier cookie n'a pas été déposé - redirection vers la page Kalendes / dépôt puis retour ********/
            kalendes.iosCookieHandler = function(){
              kalendes.html.iosHandlerWindow = window.open(host+'/widget/ios-cookie-handler.html',"_blank");
              setTimeout(function(){
                kalendes.iosCookieHandlerDone();
              },10000);
            };
            kalendes.iosCookieHandlerDone = function(){
              if (!kalendes.html.iosHandlerWindow){return;}
              kalendes.html.iosHandlerWindow.close();
              kalendes.html.iosHandlerWindow = null;
              main();
            };
            kalendes.hide = function(){
                kalendes.hideFrame();
                kalendes.showButton();
                kalendes.hideBackdrop();
            };
            kalendes.show = function(){
                if (kalendes.initial.hasError) {
                    kalendes.iosCookieHandler();
                    return;
                }
                if (kalendes.initial.isInitialized){
                    kalendes.showFrame();
                    kalendes.hideButton();
                    kalendes.showBackdrop();
                }
                else {
                    kalendes.initial.hasClicked = true;
                }
            };
            kalendes.hideFrame = function(){
                kalendes.html.iframe.addClass("hidden");
                kalendes.enableParentScroll();
            };
            kalendes.showFrame = function(){
                kalendes.html.iframe.removeClass("hidden");
                if (!kalendes.isMinimized){
                    kalendes.removeParentScroll();
                }
                kalendes.html.iframe[0].contentWindow.postMessage("WIDGET_OPENED","*");
            };
            kalendes.hideBackdrop = function(){
                kalendes.html.backdrop.addClass("hidden");
                kalendes.stopBackdropScrolling(false);
            };
            kalendes.showBackdrop = function(){
                kalendes.html.backdrop.removeClass("hidden");
                kalendes.stopBackdropScrolling(true);
            };
            var freezeVp = function(e) {
                e.preventDefault();
            };
            kalendes.stopBackdropScrolling = function (bool) {
                if (bool === true) {
                    kalendes.html.backdrop.on("wheel", freezeVp, false);
                    kalendes.html.backdrop.on("touchmove", freezeVp, false);
                } else {
                    kalendes.html.backdrop.off("wheel", freezeVp, false);
                    kalendes.html.backdrop.off("touchmove", freezeVp, false);
                }
            };
            kalendes.hideButton = function(){
                kalendes.html.button.addClass("hidden");
            };
            kalendes.showButton = function(){
                if (!kalendes.boutique.parameters.espaceClient.widget.button.display){return;}
                kalendes.html.button.removeClass("hidden");
            };
            kalendes.setInitialized = function(){
                kalendes.initial.isInitialized = true;
                if (kalendes.initial.hasClicked){
                    kalendes.show();
                }
                else {
                    kalendes.hide();
                }
            };
            kalendes.minimize = function(){
                kalendes.isMinimized = true;
                kalendes.html.iframe.removeClass("maximize");
                kalendes.enableParentScroll();
            };
            kalendes.maximize = function(){
                kalendes.isMinimized = false;
                kalendes.html.iframe.addClass("maximize");
                kalendes.removeParentScroll();
            };
            kalendes.removeParentScroll = function(){
                $('html').addClass("no-scroll");
            };
            kalendes.enableParentScroll = function(){
                $('html').removeClass("no-scroll");
            };

            /**
             * Création du code HTML
             */
            // Remise à 0
            $('#kalendes-widget-iframe').remove();
            $('#kalendes-widget-button').remove();
            $('#kalendes-widget-backdrop').remove();

            // création du code Html
            var toAppend = "<iframe id='kalendes-widget-iframe' class='hidden' src='"+host+"/visit/#/booking?host="+kalendes_host+"&widget=true' ></iframe>";
            toAppend += "<div id='kalendes-widget-button' class='hidden' onclick='kalendes.show()'><img src='"+host+"/visit/assets/images/widget/shopping_cart.png'></div>";
            toAppend += "<div id='kalendes-widget-backdrop' class='hidden' onclick='kalendes.hide()'></div>";
            $('#kalendes-widget-container').html(toAppend);
            // Ajout du code css
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: host+"/widget/widget.css"
            });
            css_link.appendTo('head');

            // prise de référence sur les élément HTML
            kalendes.html.container = $('#kalendes-widget-container');
            kalendes.html.iframe = $('#kalendes-widget-iframe');
            kalendes.html.button = $('#kalendes-widget-button');
            kalendes.html.backdrop = $('#kalendes-widget-backdrop');

            /**
             * Passerelle de communication entre l'espace client et le widget
             */
            var receiveMessage = function(event){
                if (event.data &&  event.data.code== "INIT"){
                    kalendes.boutique = event.data.boutique;
                    initWidget(true);
                }
                if (event.data && event.data.code== "INIT_FAILURE"){
                    initWidget(false);
                }
                if (event.data && event.data.code == "IOS_COOKIE_HANDLER_DONE"){
                    kalendes.iosCookieHandlerDone();
                }
                if (event.data == "HIDE"){
                    kalendes.hide();
                }
                if (event.data == "MINIMIZE"){
                    kalendes.minimize();
                }
                if (event.data == "MAXIMIZE"){
                    kalendes.maximize();
                }
            };
            window.addEventListener("message", receiveMessage, false);

            /**
             * initialisation du Widget sur réception de l'EVENT Boutique
             */
            var initWidget = function(status){
                if (!status){
                    kalendes.initial.hasError = true;
                    kalendes.html.button.addClass("bottomRight");
                    kalendes.html.button.addClass("indigo");
                    kalendes.html.button.removeClass("hidden");
                    return;
                }

                // paramétrage de la position et du thème
                var position = kalendes.boutique.parameters.espaceClient.widget.button.position;
                var theme = kalendes.boutique.parameters.espaceClient.widget.button.color;
                if (theme){
                    kalendes.html.button.addClass(theme);
                }
                if (position == "TOP_RIGHT"){
                    kalendes.html.button.addClass("topRight");
                    kalendes.html.iframe.addClass("topRight");
                }
                else if (position == "TOP_LEFT"){
                    kalendes.html.button.addClass("topLeft");
                    kalendes.html.iframe.addClass("topLeft");
                }
                else if (position == "BOTTOM_LEFT"){
                    kalendes.html.button.addClass("bottomLeft");
                    kalendes.html.iframe.addClass("bottomLeft");
                }
                else {
                    kalendes.html.button.addClass("bottomRight");
                    kalendes.html.iframe.addClass("bottomRight");
                }

                // Détermination du mode desktop / mobile. Envoi de l'information au widget
                if ($('html').width()<600){
                    kalendes.maximize();
                    kalendes.isFullPage = true;
                    kalendes.html.iframe[0].contentWindow.postMessage("WIDGET_FULL_PAGE","*");
                }

                // Passage en mode inactif - affichage du bouton + frame cachée
                kalendes.setInitialized();
            }
            return;
        })
    }


})();