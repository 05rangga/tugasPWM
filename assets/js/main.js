$(document).ready(function () {
  
    //AOS library
    AOS.init();

    
    //Fetch API
    var url = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=id&apiKey=a2c7dc63403f47e49535eea916ed17ca";
    //var url = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=id&apiKey=a2c7dc63403f47e49535eea916ed17ca";
    //var Api_Key = "a2c7dc63403f47e49535eea916ed17ca";
    var latesturl = "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=a2c7dc63403f47e49535eea916ed17ca"
    
    
    var latResponse = ''
    $.get(latesturl,function(dataLat){
     // console.log(data)
      if(dataLat.status == 'ok'){
        $.each(dataLat.articles, function(key, lat){
          latResponse +=  '<div class="content-side" data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">'
                          +'<img src="'+lat.urlToImage+'"alt="">'
                          +'<a href="#"> <h4>'+lat.title+'</h4> </a>'
                          +'<p>'+lat.description+'</p>'
                          +'<button class="btn side-content-btn">Read More &nbsp; <i class="fa fa-arrow-right"></i></button>'
                          +'<hr></hr>'
                          +'</div>'
          
          //console.log(latResponse)
        })
        $('#latest-post').html(latResponse)
      }else{
        console.log('get data from newsapi not sucess')
      }
        
    })

    

    //All news
    var datResponse = ''
   /*
    var datResponse = ''
    function renderData(data) {
      $.get(url,function(data){
        //console.log(data)
        if(data.status == 'ok'){
          $.each(data.articles, function(key, items){
            if(items.author == null){
              var author = 'Admin'
            }else{
              var author = items.author
            }
            
            datResponse +=  '<div id="post" class="post-content row" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom"><div class="col-md-5">'
                        +'<img src="'+items.urlToImage +'"alt="">'
                        +'</div>'
                        +'<div class="col-md-7">'
                        +'<a href="./post.html"> <h4>'+items.title+'</h4> </a>'
                        +'<p>'+items.description+'</p>'
                        +'<span class="author"><i class="fa fa-user text-gray"></i>&nbsp;&nbsp;'+author+'</span>'
                        +'<span class="date">'+items.publishedAt+'</span>'
                        +'</div>'
                        +'</div>'
                        +'<hr></hr>'
            
            //console.log(datResponse)
          })
          $('#post-news').html(datResponse)
         // console.log(items.urlToImage)
        }else{
          console.log('get data from newsapi not sucess')
        }
          
      })
    }
    */
      
  //index DB
  //Buat database
    
    var DbName    = 'db-news1';
    var db;
    var StoreName = 'NewsData';


   // function createDatabase() {
      var request = indexedDB.open(DbName, 1);
      request.onupgradeneeded = function(e) {             
          var db = e.target.result                     
          var objectStore = db.createObjectStore(StoreName, { keyPath: 'id' })
      }
      request.onsuccess = function(e) { 
        db = e.target.result;
        console.log('Database connection succesfully')  
        GetData()    
          
      }
      request.onerror=function(error){
        console.log('Database not open due to some errors!')
      }
     
      

   // }
   function GetData(){
      $.get(latesturl,function(data){
       // console.log(data)
        //con sole.log(data)
        if(data.status == 'ok'){
      
           var ItemData = {
            id : "1",
            data : data
          }
            addDB(ItemData) 
          // AddData(ItemData)
        }
      })
   }
         
        
    //fungsi tambah data 
    function addDB(data){
      var transaction = db.transaction([StoreName],'readwrite')
      var objectStore = transaction.objectStore(StoreName)
      var request = objectStore.add(data);
      request.onsuccess=function(){
        console.log('Data has been successfully Added to '+StoreName); 
              
       // window.location.reload();
      }
      request.onerror=function(error){
        console.log('some error occur during insertion! '+error);
      }
    }      

  // Register service worker
  if ('serviceWorker' in navigator) {  //mengecek apakah browser sudah support atau belum
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
      //meregister service worker
      .then(registration => {
        console.log('Service Worker is registered', registration);
        //jika register berhasil
      })
      .catch(err => {
        console.error('Registration failed:', err);
        //jika register gagal
      });
    });
  }


  //fetch data from online
 /*
  var getDataStatus = false
  var getData = fetch(url).then(function(response){
    return response.json()
  }).then(function(data){
    getDataStatus = true
    renderData(data)
  })


  //return data from cache
  caches.match(url).then(function(response){
    if(!response) throw Error('no data on cache')
    return response.json()
  }).then(function(data){
    if(!getDataStatus){
      renderData(data)
      console.log('render data fron cache')
    }
  }).catch(function(){
    return getData
  }) 
  */
});



//referensi 

// https://github.com/MuhammadHamza12/InventoryPWA/blob/master/js/myjs.js
// https://github.com/abdulhamidOumer/currency-converter
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb#opening_a_database
// https://developers.google.com/web/ilt/pwa/lab-indexeddb

