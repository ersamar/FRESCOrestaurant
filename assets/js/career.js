document.addEventListener('DOMContentLoaded', function () {
    var fileInput = document.getElementById('resumeLink');
    var fileNameInput = document.getElementById('fileName');
    var fileDisplay = document.getElementById('fileDisplay');

    fileDisplay.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        var fileName = event.target.files[0] ? event.target.files[0].name : 'Choose file';
        fileNameInput.value = fileName;
    });
    
    
    
    
});
