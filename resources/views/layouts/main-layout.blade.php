<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="/css/style.min.css">  {{--TODO insert css file--}}
    <script type="text/javascript" src="https://code.jquery.com/jquery.min.js"></script>
    <script src="https://markjivko.com/dist/recorder.js"></script>
    <script src="/js/script.min.js"></script>  {{--TODO insert js script--}}
</head>
<body>
<div class="container">
    <h1 class="mt-5 mb-4 text-center">@yield('title')</h1>
    @yield('content')
</div>
</body>
</html>
