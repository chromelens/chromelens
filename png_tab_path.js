html2canvas(document.body).then(function(canvas) {
  console.log('done');
  canvas.toBlob(function(blob) {
    console.log(blob);
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'png.png';
    a.click();
    window.URL.revokeObjectURL(url);
  })
});
