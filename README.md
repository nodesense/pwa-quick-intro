Web/Service Worker/PWA/Cache -- Same Origin
    example.com
    www.example.com - CORS
    exampe.com:8080 - CORS
    http/https:example.com - CORS

Home Computer - administrator /windows login
    You - website A
    Spouse - website A


HOME Computer 
    your account  - Cache for your account  /windows login
        website A 

    children - seperate account  /windows login
        WebA - differnt cache

Browser/Shared
    Same computer
        logins are different - not a problem

index.html - this calls goes through service-worker proxy

<register service worker> -- whole domain/ single origin

service worker running locally within browser 

example.com - one service worker registered - acting as proxy, runs inside browser
    tab1 - example.com
    tab2 - example.com
    tab3....example.com


www.example.com - one service worker registered
    tab1 - www.example.com
    tab2 - www.example.com
    tab3....www.example.com



<link href="/styles.css" /> -- browser download from web server/- this calls goes through service-worker proxy
<script src="/script1.js" />  -- browser download from web server /- this calls goes through service-worker proxy

<img src="/image1.png"..  -- browser download from web server /- this calls goes through service-worker proxy

<script>

    fetch('url') /axios - XHR - AJAX - hook/interceptors / - this calls goes through service-worker proxy
    .then () 

     -- browser download from web server/ajax/async/callback


Cache some files 

Legacy [No Service Worker]
    On the webserver, we have set 
        index.html
            script.js
            css

        Expiry: May 31, 2019
        Cache-Control:

    open browser
        www.example.com --> connect to example.com [must be online]
            script.js - is it cached or not,
            if cached, use local copy

Service Worker [Every requests goes through service worker]
    including index.html

    open browser
        www.example.com 
                [online/offline], the request goes to service worker

                online, index.html, get the file from server, send to page
                if offline, index.html, can serve local copy/offline.html

App
  Service Worker cache ==>   Script + Design + Assets -- offline
  Reside inside browser


product catalog - 
list of gifts - no secrets  - cached

my favorite gifts  - no cache

list of countries - not problem
emails - sentive
contacts - Sensitve

{ online && 

    <Route path="/my-orders" com... />

    <Route path="/my-orders" com... />

    <Route path="/categories" com... />

    <Route path="/gifts" com... />
}

{
    offline && 

    <Route path="/categories" com... />

    <Route path="/gifts" com... />
}