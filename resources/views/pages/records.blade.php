@extends('layouts.main-layout')

@section('title', 'Records')

@section('content')
    <!-- &nbsp &emsp-->
    <div data-role="records">
    </div>
    <script>
            var listRecords = $('[data-role="records"]');
            if (null !== listRecords) {
                var records = {!! json_encode($records->toArray()) !!};
                $.each(records, function (index, value) {

                    var filename = Object.values(value)[3];
                    var src = 'recordsFolder/'+ filename;
                    var author_name = Object.values(value)[4];


                    // Prepare the playback
                    var audioObject = $('<audio controls></audio>')
                        .attr('src', src);

                    // Prepare the download link
                    var downloadObject = $('<a>&#9660;</a>')
                        .attr('href', src)
                        .attr('download', filename + '.wav');

                    // Wrap everything in a row
                    var holderObject = $('<div class="row-record"></div>')
                        .append(audioObject)
                        .append(downloadObject);
                    var authorNameObject = $('<p></p>').append(author_name);
                    // console.log(downloadObject.attr('href'));
                    // console.log(downloadObject.attr('download'));

                    // Append to the list
                    listRecords.append(authorNameObject);
                    listRecords.append(holderObject);
            });
    }
    </script>
@endsection
