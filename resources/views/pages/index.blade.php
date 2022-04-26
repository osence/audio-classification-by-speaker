@extends('layouts.main-layout')

@section('title', 'Speaker record')

@section('content')
    <div>
        <h1 class="mt-5 mb-4 text-center">Start record</h1>
        <div class="holder">
            <div data-role="controls">
                <button>Record</button>
            </div>
                <div data-role="recordings"></div>
                <div data-role="submit"></div>
        </div>
</div>
@endsection
