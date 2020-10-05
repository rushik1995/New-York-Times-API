//NavBar Creation
var nav = document.createElement('div');
nav.setAttribute("class","navbar navbar-expand-lg navbar-dark bg-dark justify-content-center");
document.body.appendChild(nav);
navibar("nav-link", "index.html", "HOME");
navibar("nav-link", "index.html", "WORLD");
navibar("nav-link", "politics.html", "POLITICS");
navibar("nav-link", "magazine.html", "MAGAZINE");
navibar("nav-link", "technology.html", "TECHNOLOGY");
navibar("nav-link", "science.html", "SCIENCE");
navibar("nav-link", "health.html", "HEALTH");
navibar("nav-link", "sports.html", "SPORTS");
navibar("nav-link", "arts.html", "ARTS");
navibar("nav-link", "fashion.html", "FASHION");
navibar("nav-link", "food.html", "FOOD");
navibar("nav-link", "travel.html", "TRAVEL");

function navibar(cls,link,text){
  var a = document.createElement('a');
  a.setAttribute("class", cls);
  a.setAttribute("href", link);
  a.innerText = text;
  nav.appendChild(a);
}


//Container Creation
var container = document.createElement('div');
container.setAttribute("class","container");
document.body.appendChild(container);



//Featching World Data
var getdataworld = function(){
    return new Promise(function(resolve,reject){
        let data = [];
        let request = new XMLHttpRequest();
        let urlrequest = "https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=ZN5Mx5zr98gINjsjZHm49H4kD0cAViZv";
        request.open('GET',urlrequest,true);
        request.send();
        request.onload = function() {
           data = JSON.parse(this.response)
           if (this.readyState == 4 && this.status == 200) {
                resolve(data)
                }
                else{
                reject('Error for Life')
                }
              }
            })
  }


// storing of data in varibles
getdataworld()
.then(function(data){
// console.log(data.results);
  for(i=0;i<data.results.length;i++)
  {

    if(data.results[i].title){
      var title =data.results[i].title;
      // console.log(title);
    }else{
      var title = "-";
    }
    if (data.results[i].abstract) {
        var abstract = data.results[i].abstract;
        // console.log(abstract);
    }else{
      var abstract = "-";
    }
    if (data.results[i].url) {
        var url = data.results[i].url;
        // console.log(url);
    }else{
      var abstract = "-";
    }
    if (data.results[i].multimedia[0].url) {
        var multimedia = data.results[i].multimedia[0].url;
        // console.log(multimedia);
    }else{
      var abstract = "-";
    }
    var dates = data.last_updated.split("T")[0];

    // if(i%2===0){
      createmain(title,abstract,url,multimedia ,dates);
  //   }else{
  //     createmainleft(title,abstract,url,multimedia ,dates);
  //   }
  }
})
.catch(function (error) {
    console.log(error);
  });


// Creating DOM Elements
function createmain(title,abstract,url,multimedia,dates){
var card = document.createElement('div');
card.setAttribute("class","card mb-3");
card.setAttribute("style","max-width: 100vw; margin-top: 20px; border: 1px solid black;");
container.appendChild(card);

var row = document.createElement('div');
row.setAttribute("class","row no-gutters");
card.appendChild(row);

var col = document.createElement('div');
col.setAttribute("class","col-md-8");
row.appendChild(col);

var card_body = document.createElement('div');
card_body.setAttribute("class","card-body");
col.appendChild(card_body);

var card_head = document.createElement('h5');
card_head.setAttribute("class","card-title section-card");
card_head.setAttribute("style","color: lightblue;");
card_head.innerText = "FASHION"
card_body.appendChild(card_head);

var card_title = document.createElement('p');
card_title.setAttribute("class","card-text titlecard");
card_title.setAttribute("style","font-family: 'Times New Roman', sans-serif; font-weight: bold; font-size: 22px; text-decoration: underline;");
card_title.innerText = title;
card_body.appendChild(card_title);

var card_date = document.createElement('p');
card_date.setAttribute("class","card-text text-muted date-card");
card_date.setAttribute("style","font-family: 'Times New Roman', sans-serif;");
card_date.innerText= dates;
card_body.appendChild(card_date);


var card_abstract = document.createElement('p');
card_abstract.setAttribute("class","card-text abstract-card");
card_abstract.setAttribute("style","  font-family: 'Times New Roman', sans-serif; font-size: 20px;");
card_abstract.innerText = abstract;
card_body.appendChild(card_abstract);

var button = document.createElement('a');
button.setAttribute("class","continueReading btn btn-link");
button.setAttribute("type","button");
button.setAttribute("target","_blank");
button.setAttribute("href", url);
button.innerText = "Continue Reading....";
card_body.appendChild(button);

// var img_div = document.createElement('div');
// img_div.setAttribute("class","col-md-4");
// row.appendChild(img_div);

var img = document.createElement('img');
img.setAttribute("class","img-thumbnail col-md-4");
img.setAttribute("src", multimedia);
// img.setAttribute("style", "height: 258px; width: 369px;");
img.setAttribute("style","border: 1px solid black;");
img.setAttribute("style","max-height: 310px;");
row.appendChild(img);

}

document.getElementsByTagName('body')[0].style.background = "lightgrey";
