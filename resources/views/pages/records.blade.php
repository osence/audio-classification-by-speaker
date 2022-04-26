@extends('layouts.main-layout')

@section('title', 'Records')

@section('content')
    @foreach ($records as $record)
        <div>
            {{ $record->author_name }}
        </div>
    @endforeach
@endsection
