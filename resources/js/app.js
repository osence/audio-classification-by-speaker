require('./bootstrap');

var currentFilename;
let ready = jQuery(document).ready(function () {
    var $ = jQuery;
    var myRecorder = {
        objects: {
            context: null,
            stream: null,
            recorder: null
        },
        init: function () {
            if (null === myRecorder.objects.context) {
                myRecorder.objects.context = new (
                    window.AudioContext || window.webkitAudioContext
                );
            }
        },
        start: function () {
            var options = {audio: true, video: false};
            navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                myRecorder.objects.stream = stream;
                myRecorder.objects.recorder = new Recorder(
                    myRecorder.objects.context.createMediaStreamSource(stream),
                    {numChannels: 1}
                );
                myRecorder.objects.recorder.record();
            }).catch(function (err) {});
        },
        stop: function (listObject) {
            if (null !== myRecorder.objects.stream) {
                myRecorder.objects.stream.getAudioTracks()[0].stop();
            }
            if (null !== myRecorder.objects.recorder) {
                myRecorder.objects.recorder.stop();

                // Validate object
                if (null !== listObject
                    && 'object' === typeof listObject
                    && listObject.length > 0) {
                    // Export the WAV file
                    myRecorder.objects.recorder.exportWAV(function (blob) {
                        
                        // HTTP запрос на отправку записаной аудиозаписи
                        var xhr=new XMLHttpRequest();
                        xhr.onload=function(e) {
                            if(this.readyState === 4) {
                                console.log("Server returned: ",e.target.responseText);
                            }
                        };
                        var fd=new FormData();
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mmmm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var hh = String(today.getHours() + 1).padStart(2, '0'); //January is 0!
                        var mm = String(today.getMinutes() + 1).padStart(2, '0'); //January is 0!
                        var ss = String(today.getSeconds() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        var filename = ss + '-' + mm + '-' + hh + '-' + dd + '-' + mmmm + '-' + yyyy
                        currentFilename = filename + '.wav';
                        //Постфикс для названий файлов по айди
                        fd.append("audio_data",blob, filename);
                        xhr.open("POST","upload.php",true);
                        xhr.send(fd);
                        
                        var url = (window.URL || window.webkitURL).createObjectURL(blob);
                        // Prepare the playback
                        var audioObject = $('<audio controls></audio>')
                            .attr('src', url);

                        // Prepare the download link
                        var downloadObject = $('<a>&#9660;</a>')
                            .attr('href', url)
                            .attr('download', filename + '.wav');

                        // Wrap everything in a row
                        var holderObject = $('<div class="row-record"></div>')
                            .append(audioObject)
                            .append(downloadObject);

                        // console.log(downloadObject.attr('href'));
                        // console.log(downloadObject.attr('download'));
                        // console.log(url);
                        
                        // Append to the list
                        listObject.empty();
                        listObject.append(holderObject);
                        
                    });
                }
            }
        }
    };

    // Prepare the recordings list
    var listObject = $('[data-role="recordings"]');
    var submitObject = $('[data-role="submit"]');
    // Prepare the record button
    $('[data-role="controls"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();
        // Get the button state
        var buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject);
            
            var submitButton = $('<button style="margin-left: 40px; margin-bottom: 10px;">Save Record</button>');
            //var labelObject = $('<label for="username" class="username" re>Your name:</label>');
            var inputObject = $('<input type="text" style="margin-left: 40px; margin-bottom: 10px;" id="username" name="username" placeholder="username"></input>')
            submitObject.empty();
            //submitObject.append(labelObject);
            submitObject.append(inputObject);
            submitObject.append(submitButton);
            $('[data-role="submit"] > button').click(function () {
                var username = $('#username').val();
                var formData = new FormData();
                formData.append("filename", currentFilename);
                formData.append("username", username);
                var xhr = new XMLHttpRequest();
                
                xhr.open('POST', '/', true);
                xhr.setRequestHeader("X-CSRF-TOKEN", document.head.querySelector("[name=csrf-token]").content );
                // xhr.onload = function(e) { alert(e) };
                xhr.send(formData);  // multipart/form-data
                
            })
        }
    });
});
