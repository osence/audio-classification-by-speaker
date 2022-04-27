<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\record;
class recordController extends Controller
{
    public function index(){
        $records = Record::all();
        error_log($records);
        return view('pages.records', [
            'records' => $records,
        ]);
    }

    public function store(){
        $record = new Record();
        $record->author_name = request('username');
        $record->filename = request('filename');
        $record->save();
        error_log(request('username'));
        error_log(request('filename'));
        //return view('pages.index');
        // return redirect()->route('pages.about');
    }
}
