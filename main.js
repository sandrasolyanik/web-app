function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appvhXT17EwqV7ELl/Games?api_key=keysRd14BRX8ndZJX",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var games = record.fields["Games"];
          var images = record.fields["Images"];
          var logos = record.fields["Console"];
          var price = record.fields["Price"];
          var playersRange = record.fields["Players Range"];
          var storeLinks = record.fields["Store Links"]
          html.push(listView(id, games, images, logos, storeLinks));
        });
        $(".list-view").append(html);
      }
    );
  };
  function formattedString(value) {
    console.log(value)
    return value.split(" , ").map(function(link) { return `<a href="${link}">Buy here! </a> ` }).join("");
  }

  var listView = function(id, games, images, logos, storeLinks) {
    return ` <div class="col-sm-4">
      <div class="card" >
      ${images ? `<img src="${images[0].url}"  class="card-img-top">`  : ``}
  <div class="card-body">
    <h5 class="card-title">${games}</h5>
    
    ${logos[0] ? logos.map(function(logo) { return `<img src="${logo.url}" class="logo">`} ) : ``}
  
    <p class="card-text">${formattedString(storeLinks)}</p>
  </div>
</div> </div>
    `;
  };

  var id = getParameterByName("id");
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }