(function (huge) {


    huge.MainUIApp = function () {

        //App Variables
        var _menuData,
            mainMenuComponent,
            mobileNavigationContainer,
            navMobile,
            siteLogo,
            pageWrapper;

        //DOM Variables
        var overlay;

        /*Constructor*/
        (function () {
            console.log('init app');

            setupOverlay();

            setupMobileNavHelper();

            mainMenuComponent = new huge.ui.MenuBuilder();

            //Add reset menu event
            huge.events.Events.addEventListener(huge.events.RESET_MENU, resetMenu_handler);

            //Add overlay events
            huge.events.Events.addEventListener(huge.events.SHOW_OVERLAY, showOverlay_handler);

            huge.events.Events.addEventListener(huge.events.HIDE_OVERLAY, hideOverlay_handler);

            //Begin the Service Manager, and starts the site load functionality
            huge.data.ServiceManager.loadSiteConfiguration(loadSiteConfigurationHandler);

        }());

        function setupOverlay() {
            //setup overlay
            overlay = document.getElementById('overlay');
            overlay.addEventListener('click', overlayClick_handler, false);
        }

        function setupMobileNavHelper() {
            navMobile = document.getElementById('nav-mobile');

            siteLogo = document.getElementById('logo-wrapper');

            mobileNavigationContainer = document.getElementById('nav-mobile-container');

            pageWrapper = document.getElementById('page-wrapper');

            navMobile.addEventListener('click', setupMobileNavHelperClick_handler, false);


        }

        function dataBind() {
            mainMenuComponent.dataBind(_menuData.items);
        }

        function showOverlay_handler() {
            overlay.classList.remove('no-display');
        }

        function hideOverlay_handler() {
            overlay.classList.add('no-display');
        }

        function resetMenu_handler() {
            mobileNavigationContainer.classList.remove('on');
            pageWrapper.classList.remove('on');
            
            var elements = document.querySelectorAll('.active'),
                i = elements.length;
            
            while(i-- > 0){
                elements[i].classList.remove('active');
            }
            
        }

        function loadSiteConfigurationHandler() {
            var httpRequest = this;
            try {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        _menuData = JSON.parse(httpRequest.responseText);
                        dataBind();
                    } else {
                        //alert('There was a problem with the request.');
                    }
                }
            } catch (e) {
                //alert('Caught Exception: ' + e.description);
            }
        }

        function overlayClick_handler() {
            huge.events.Events.dispatchEvent(huge.events.HIDE_OVERLAY);
            mainMenuComponent.resetMenu();
        }

        function setupMobileNavHelperClick_handler() {
            navMobile.classList.toggle('active');
            siteLogo.classList.toggle('active');

            mobileNavigationContainer.classList.toggle('on');
            pageWrapper.classList.toggle('on');

            if (overlay.classList.contains('no-display'))
                huge.events.Events.dispatchEvent(huge.events.SHOW_OVERLAY);
            else
                huge.events.Events.dispatchEvent(huge.events.HIDE_OVERLAY);

        }

        return {

        };
    }();

})(window.huge || {});