(function (huge) {
    'use strict';
    /**
     * @namespace UI Components package
     */
    huge.ui = huge.ui || {};

    huge.ui.MenuBuilder = function () {

        var _menuData;

        //DOM Variables
        var navigationContainer,
            mobileNavigationContainer;

        /**
         * @constructor
         */
        (function () {
            init();
        })();

        /**
         * Initialize the class variables
         * @function
         */
        function init() {
            navigationContainer = document.getElementById('nav-container');
            mobileNavigationContainer = document.getElementById('nav-mobile-container');
        }

        /**
         * Bind the info received from server
         * @param {Object}   data     menu item data
         * @function
         */
        function dataBind(data) {
            _menuData = data;

            addMenuComponent(navigationContainer, 'nav-primary');

            addMenuComponent(mobileNavigationContainer, 'nav-primary-mobile', true);

            addInteractions(navigationContainer);
            addInteractions(mobileNavigationContainer);
        }

        /**
         * Add an menu item to the menu items list
         * @param {Object}   type     menu item data
         * @function
         */
        function addMenuComponent(navigationContainer, navigatorId, isMobile) {

            var menuContainer = document.createElement('ul'),
                length = _menuData.length,
                i;

            menuContainer.setAttribute('id', navigatorId);
            menuContainer.setAttribute('class', 'menu-component');

            for (i = 0; i < length; i++) {
                menuContainer.appendChild(menuItemFactory(_menuData[i], isMobile));
            }

            navigationContainer.appendChild(menuContainer);
        }

        /**
         * Create the DOM representation of each menu item
         * @param {Object}   type     The menu data
         * @function
         */
        function menuItemFactory(data, isMobile) {
            var item = document.createElement('li'),
                elementLinkContainer,
                arrowContainer;

            //Checks if is from mobile, to create the custom element with the arrow compoment
            if (isMobile) {
                arrowContainer = document.createElement('i');
                arrowContainer.setAttribute('class', 'right');

                var resultLink = '<a href="#">' + arrowContainer.outerHTML + data.label + '</a>',
                    parser = new DOMParser();

                elementLinkContainer = parser.parseFromString(resultLink, "text/xml").firstChild;
            } else {
                elementLinkContainer = document.createElement('a');
                elementLinkContainer.textContent = data.label;
            }

            elementLinkContainer.href = data.url;

            item.appendChild(elementLinkContainer);

            if (data.items) {
                if (data.items.length > 0) {
                    item.setAttribute('class', 'icon');
                    item.appendChild(submenuFactory(data.items));
                }
            }

            return item;
        }


        /**
         * Create the DOM representation of each menu item
         * @param {Object}   type     The menu data
         * @function
         */
        function submenuFactory(data) {
            var subMenu = document.createElement('ul'),
                length = data.length,
                i;

            subMenu.setAttribute('class', 'sub-menu');

            for (i = 0; i < length; i++) {
                subMenu.appendChild(menuItemFactory(data[i]));
            }
            return subMenu;
        }

        /**
         * Add the interactions for the menu items
         * @function
         */
        function addInteractions(menuContainer) {

            var primaryNavElements = menuContainer.querySelectorAll('li > a'),
                i = primaryNavElements.length;

            while (i-- > 0) {
                setClickHandler(primaryNavElements[i], menuClickHandler);
            }
        }

        /**
         * Add the click handler for an specified element
         * @param {Object}   type     The DOM element to receive the click event
         * @param {Function}   type   The callback function to call after click
         * @function
         */
        function setClickHandler(element, clickFunction) {
            element.addEventListener('click', clickFunction, false);
        }

        /**
         * Do the logic to navigate between elements of navigation
         * @function
         */
        function menuClickHandler(event) {
            var secondaryNav = event.currentTarget.parentNode.querySelector('ul');

            resetMenu();

            if (secondaryNav) {
                event.preventDefault();

                huge.events.Events.dispatchEvent(huge.events.SHOW_OVERLAY);

                //go to the next ul which contains the submenu    
                event.currentTarget.parentElement.classList.add('hover');

                var secondaryElementsNav = secondaryNav.querySelectorAll('li > a');

                //Add the click handler for the sub elements
                var i = secondaryElementsNav.length;
                while (i-- > 0) {
                    setClickHandler(secondaryElementsNav[i], menuClickHandler);
                }
            } else {
                huge.events.Events.dispatchEvent(huge.events.HIDE_OVERLAY);

                huge.events.Events.dispatchEvent(huge.events.RESET_MENU);
            }
            /**/
        };

        /**
         * Reset the elements to remove the hover state
         * @function
         */
        function resetMenu() {
            var menuElements = document.querySelectorAll('.hover'),
                i = menuElements.length;

            while (i-- > 0) {
                menuElements[0].classList.remove('hover');
            }
        }

        //	Public methods
        return {
            dataBind: dataBind,
            resetMenu: resetMenu
        };
    };
})(window.huge || {});