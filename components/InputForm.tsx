import React, { useState } from 'react';
import { ComedyStyle, UserProfile } from '../types';
import { Button } from './Button';
import { Modal } from './Modal';

interface InputFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const TOP_COMEDIANS = [
  "Dave Chappelle", "George Carlin", "Richard Pryor", "Robin Williams", "Eddie Murphy", 
  "Jerry Seinfeld", "Chris Rock", "Louis C.K.", "Bill Burr", "Ricky Gervais", 
  "Mitch Hedberg", "John Mulaney", "Kevin Hart", "Steve Martin", "Sarah Silverman", 
  "Rodney Dangerfield", "Don Rickles", "Norm Macdonald", "Joan Rivers", "Patton Oswalt", 
  "Jim Gaffigan", "Conan O'Brien", "Amy Schumer", "Aziz Ansari", "Ali Wong", 
  "Bill Hicks", "Bo Burnham", "Tig Notaro", "Anthony Jeselnik", "Sebastian Maniscalco"
];

const DEMO_PROFILES: { title: string; desc: string; profile: UserProfile }[] = [
  {
    title: "The Corporate Cynic",
    desc: "A burned-out PM dealing with Jira tickets and dating apps.",
    profile: {
      name: "Chad GPT",
      age: "29",
      occupation: "Product Manager",
      hometown: "San Francisco, CA",
      style: ComedyStyle.OBSERVATIONAL,
      topics: "Tech culture, rent prices, microdosing, meeting that could have been emails",
      context: "I spend 10 hours a day optimizing workflows but can't optimize my love life. I live with 4 roommates in a house that costs $8k a month. I'm vegan but only when people are watching.",
      influences: ["Ricky Gervais", "Bill Burr"]
    }
  },
  {
    title: "The Overwhelmed Parent",
    desc: "Surviving toddlers, wine culture, and minivan life.",
    profile: {
      name: "Linda",
      age: "38",
      occupation: "Stay-at-home Mom",
      hometown: "Suburban Chicago",
      style: ComedyStyle.SELF_DEPRECATING,
      topics: "Tantrums, yoga pants, wine o'clock, husband's snoring",
      context: "I used to be cool. Now I get excited about a new sponge. My toddler negotiated a hostage situation with a cookie yesterday. I haven't slept since 2018.",
      influences: ["Jim Gaffigan", "Ali Wong"]
    }
  },
  {
    title: "The Gen Z Nihilist",
    desc: "Vibes, climate anxiety, and thrift stores.",
    profile: {
      name: "Kai",
      age: "22",
      occupation: "Barista / Content Creator",
      hometown: "Portland, OR",
      style: ComedyStyle.ABSURDIST,
      topics: "Climate change, thrifting, oat milk, generational trauma",
      context: "I work at a cafe where we judge you for ordering dairy. I own 12 plants and they are all dying, just like the planet. I make TikToks about my anxiety.",
      influences: ["Bo Burnham", "Mitch Hedberg"]
    }
  }
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    occupation: '',
    age: '',
    hometown: '',
    context: '',
    topics: '',
    style: ComedyStyle.OBSERVATIONAL,
    influences: []
  });

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleInfluence = (comedian: string) => {
    setProfile(prev => {
      const exists = prev.influences.includes(comedian);
      if (exists) {
        return { ...prev, influences: prev.influences.filter(c => c !== comedian) };
      }
      if (prev.influences.length >= 3) {
        return prev; // Max 3 selected
      }
      return { ...prev, influences: [...prev.influences, comedian] };
    });
  };

  const loadDemo = (demo: UserProfile) => {
    setProfile(demo);
    setIsDemoModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative">
      
      {/* Demo Button - Top Right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <button
          type="button"
          onClick={() => setIsDemoModalOpen(true)}
          className="text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest border border-amber-500/30 hover:border-amber-500 rounded-full px-3 py-1 transition-all flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Demo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300">Name / Stage Name</label>
            <input
              id="name"
              name="name"
              required
              value={profile.name}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. Jerry S."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-slate-300">Age Range</label>
            <input
              id="age"
              name="age"
              required
              value={profile.age}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. Early 30s"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="occupation" className="text-sm font-medium text-slate-300">Occupation</label>
            <input
              id="occupation"
              name="occupation"
              required
              value={profile.occupation}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="hometown" className="text-sm font-medium text-slate-300">Hometown/Current City</label>
            <input
              id="hometown"
              name="hometown"
              required
              value={profile.hometown}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. New York, NY"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="style" className="text-sm font-medium text-slate-300">Comedy Style</label>
          <select
            id="style"
            name="style"
            value={profile.style}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
          >
            {Object.values(ComedyStyle).map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex justify-between items-center">
             <span>Inspirational Comedians</span>
             <span className="text-xs text-slate-500">{profile.influences.length}/3 selected</span>
          </label>
          <div className="h-40 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg p-3 custom-scrollbar">
            <div className="flex flex-wrap gap-2">
                {TOP_COMEDIANS.map(comedian => {
                    const isSelected = profile.influences.includes(comedian);
                    return (
                        <button
                            key={comedian}
                            type="button"
                            onClick={() => toggleInfluence(comedian)}
                            disabled={!isSelected && profile.influences.length >= 3}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                                isSelected 
                                ? 'bg-amber-500 border-amber-600 text-slate-900 shadow-lg shadow-amber-500/20' 
                                : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed'
                            }`}
                        >
                            {comedian} {isSelected && '✓'}
                        </button>
                    )
                })}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="topics" className="text-sm font-medium text-slate-300">Preferred Topics (Comma separated)</label>
          <input
            id="topics"
            name="topics"
            value={profile.topics}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
            placeholder="e.g. Dating apps, traffic, cats, remote work"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="context" className="text-sm font-medium text-slate-300">Life Context / Bio Dump</label>
          <p className="text-xs text-slate-500">Tell us your story. The more weird details, the better the jokes.</p>
          <textarea
            id="context"
            name="context"
            required
            value={profile.context}
            onChange={handleChange}
            rows={5}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="I grew up in a cult but now I work in HR. I have a fear of balloons..."
          />
        </div>

        <div className="pt-4">
          <Button type="submit" isLoading={isLoading} className="w-full text-lg">
            Generate My Tight 10
          </Button>
        </div>
      </form>

      {/* Demo Selection Modal */}
      <Modal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)}
        title="Choose a Persona"
      >
        <div className="space-y-4">
            <p className="text-slate-400 text-sm mb-4">
                Select a profile to autofill the form with example data. 
                <span className="text-amber-500 font-bold ml-1">Warning: This will overwrite your current inputs.</span>
            </p>
            {DEMO_PROFILES.map((demo, idx) => (
                <div 
                    key={idx} 
                    className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 p-4 rounded-xl cursor-pointer transition-all group"
                    onClick={() => loadDemo(demo.profile)}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">{demo.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">{demo.desc}</p>
                        </div>
                        <div className="bg-slate-800 p-2 rounded-full group-hover:bg-amber-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </Modal>

    </div>
  );
};
