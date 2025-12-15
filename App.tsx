import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { RoutineDisplay } from './components/RoutineDisplay';
import { UserProfile, GeneratedRoutine } from './types';
import { generateRoutine } from './services/geminiService';
import { Button } from './components/Button';

// Mock data for fallback or preview if needed, but primarily relying on API.
// Icons provided by Heroicons via inline SVG.

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'form' | 'loading' | 'results'>('landing');
  const [routine, setRoutine] = useState<GeneratedRoutine | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setView('form');
    setError(null);
  };

  const handleSubmit = async (profile: UserProfile) => {
    setView('loading');
    setError(null);
    try {
      const generatedData = await generateRoutine(profile);
      setRoutine(generatedData);
      setView('results');
    } catch (err) {
      console.error(err);
      setError("The coach is having a smoke break (API Error). Please try again or check your API key.");
      setView('form');
    }
  };

  const handleReset = () => {
    setRoutine(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
       {/* Background Elements */}
       <div className="fixed inset-0 bg-[#0f172a] -z-20"></div>
       <div className="fixed inset-0 spotlight opacity-40 pointer-events-none -z-10"></div>
       
       {/* Header */}
       <header className="w-full py-6 px-4 md:px-8 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 bg-slate-900/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
                <div className="bg-amber-500 p-2 rounded-lg text-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Punchline<span className="text-amber-500">Pro</span></h1>
            </div>
          </div>
       </header>

       <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-80px)]">
          
          {error && (
            <div className="w-full max-w-md bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8 text-center">
              {error}
            </div>
          )}

          {view === 'landing' && (
             <div className="text-center space-y-8 max-w-3xl mx-auto animate-fade-in">
                <div className="inline-block">
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-500 text-xs font-bold border border-slate-700 tracking-wider">
                        AI-POWERED STAND-UP COACH
                    </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    Turn Your Life<br />
                    Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Comedy Gold</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Stop bombing and start killing. Our AI comedy coach analyzes your background, quirks, and style to generate a tight 10-bit routine tailored just for you.
                </p>
                <div className="pt-4">
                    <Button onClick={handleStart} className="text-lg px-8 py-4 shadow-amber-900/20">
                        Draft My Routine
                    </Button>
                </div>
                
                {/* Visual Flair */}
                <div className="grid grid-cols-3 gap-4 mt-16 opacity-30">
                    <div className="h-32 bg-slate-700 rounded-lg animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="h-32 bg-slate-700 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-32 bg-slate-700 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>
          )}

          {view === 'form' && (
             <div className="w-full animate-slide-up">
                 <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Tell Us About Yourself</h2>
                    <p className="text-slate-400 mt-2">The best comedy comes from truth.</p>
                 </div>
                 <InputForm onSubmit={handleSubmit} isLoading={false} />
             </div>
          )}

          {view === 'loading' && (
            <div className="text-center space-y-6 animate-pulse">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-3xl">🎤</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Writing Your Set...</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                    Analysing your trauma for punchlines...<br/>
                    Structuring call-backs...<br/>
                    Polishing the closer...
                </p>
            </div>
          )}

          {view === 'results' && routine && (
             <RoutineDisplay routine={routine} onReset={handleStart} />
          )}

       </main>
    </div>
  );
};

export default App;
