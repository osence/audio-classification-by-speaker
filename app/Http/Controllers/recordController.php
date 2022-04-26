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
        error_log('testerror');
        // error_log(request('username'));
        
        return redirect('/records');
    }
}
