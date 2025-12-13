<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CollaboratorController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Collaborators/Index', [
            'collaborators' => User::select('id', 'name', 'email', 'created_at')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Collaborators/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.collaborators.index');
    }

    public function edit(User $collaborator)
    {
        return Inertia::render('Admin/Collaborators/Edit', [
            'collaborator' => $collaborator
        ]);
    }

    public function update(Request $request, User $collaborator)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class . ',email,' . $collaborator->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $collaborator->forceFill([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('password')) {
            $collaborator->password = Hash::make($request->password);
        }

        $collaborator->save();

        return redirect()->route('admin.collaborators.index');
    }

    public function destroy(User $collaborator)
    {
        if ($collaborator->id === auth()->id()) {
            throw ValidationException::withMessages([
                'error' => 'Você não pode excluir sua própria conta.',
            ]);
        }

        $collaborator->delete();

        return redirect()->route('admin.collaborators.index');
    }
}
