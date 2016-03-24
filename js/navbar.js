document.write("<div class='naviagtion'>\
            <div class='header'>\
                <span id='name'>Kelly Zhang</span>\
            </div>\
            <ul class='topnav'>\
                <li class='mobile-header'>Kelly Zhang</li>\
                <li><a href='/index.html'>Home</a></li>\
                <li>\
                    <a href='#'>Art</a>\
                    <ul class='drop'>\
                        <li><a href='/gallery/index.html'>Gallery</a></li>\
                        <li><a href='/gallery/conceptart.html'>Concept Art</a></li>\
                        <li><a href='#'>3D</a></li>\
                    </ul>\
                </li>\
                <li><a href='/projects.html'>Projects</a></li>\
                <li><a href='#'>Contact</a></li>\
                <li class='icon'>\
                    <button type='button' class='btn btn-default' onclick='myFunction()'>\
                        <span class='sr-only'>Toggle navigation</span>\
                        <span class='glyphicon glyphicon-menu-hamburger'></span>\
                    </button>\
                </li>\
            </ul>\
        </div>\
        <script>\
            function myFunction() {\
                document.getElementsByClassName('topnav')[0].classList.toggle('responsive');\
            }\
        </script>");