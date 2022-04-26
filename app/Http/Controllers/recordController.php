<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\record;
class recordController extends Controller
{
    public function index(){
        $records = Record::all();
        return view('pages.records', [
            'records' => $records,
        ]);
    }

    public function store(){
        $record = new Record();
        $record->author_name = request('username');
        $record->blob_record = request('recordBlob');
        $record->save();
        //return view('pages.index');
        // return redirect()->route('pages.about');
    }
}
