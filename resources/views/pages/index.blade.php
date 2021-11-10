@extends('layouts.main-layout')

@section('title', 'Speaker record')

@section('content')
    <div class="holder">
        <div data-role="controls">
            <button>Record</button>
        </div>
        <div data-role="recordings"></div>
    </div>
@endsection
