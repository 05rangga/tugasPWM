$(document).ready(function () {
  
    //AOS library
    AOS.init();

    //Fetch API
    var url = "https://newsapi.org/v2/sources?apiKey=a2c7dc63403f47e49535eea916ed17ca";
    //var Api_Key = "a2c7dc63403f47e49535eea916ed17ca";
    var req = new Request(url);
    fetch(req)
        .then(function(response) {
        console.log(response.json());
    });



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

});