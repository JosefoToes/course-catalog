function dataTable(){
  for (i=0;i<valueslist.length;i++) {
    domain = values[i].id === 'no' ? domain2 : domain;
    url = values[i].id === 'no' ? values[i].url : values[i].id
    document.getElementById('tablecontent').innerHTML += `
    <tr>
      <td>${values[i].id}</td>
      <td>${values[i].order}</td>
      <td><b><a href="${domain}/${url}" target="_blank">${values[i].title}</a></b></td>
      <td>${values[i].subtitle}</td>
      <td><p>${values[i].description}</p></td>
      <td>${values[i].img}</td>
      <td>${values[i].img_min}</td>
      <td>${values[i].date_created}</td>
      <td>${values[i].confidential}</td>
    </tr>
    `;
    document.getElementById('tablecontent').style.display = 'block';
  }
}
function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','
          line += array[i][index];
      }
      str += line + '\r\n';
  }
  return str;
}
function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }
  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);
  var csv = this.convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  }else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
function download(){
var headers = {
    id: 'ID',
    order: 'ORDER',
    title: 'TITLE',
    subtitle: 'SUBTITLE',
    description: 'DESCRIPTION',
    img: 'HERO IMAGE FILE',
    img_min: 'THUMBNAIL IMAGE FILE',
    date_created: 'DATE CREATED',
    confidential: 'CONFIDENTIAL'
};
var itemsFormatted = [];
// format the data
values.forEach(function(value){
  itemsFormatted.push({
    id: value.id,
    order: value.order,
    title: value.title.replace(/,/g, ''), 
    subtitle: value.subtitle.replace(/,/g, ''),
    description: value.description.replace(/,/g, ''),
    img: value.img,
    img_min: value.img_min,
    date_created: value.date_created,
    confidential: value.confidential
  });
});
var fileTitle = 'orders'; // or 'my-unique-title'
exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
}