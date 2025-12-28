
import React, { useState, useEffect } from 'react';
import { Bot, Book, Palette, Download, UploadCloud, RefreshCw, Check, Zap, MessageSquare, Mic, Trophy, Users } from 'lucide-react';

interface CourseEditorProps {
  initialContent: string;
  onSaveContent: (newContent: string) => void;
  initialVoiceSummary: string;
  onSaveVoiceSummary: (newSummary: string) => void;
  initialInstruction: string;
  onSaveInstruction: (newInstruction: string) => void;
  initialVoiceInstruction: string;
  onSaveVoiceInstruction: (newInstruction: string) => void;
  initialThemeColor: string;
  onSaveThemeColor: (newColor: string) => void;
  onResetAll?: () => void;
  profiles: any[];
  onRefreshProfiles?: () => void;
  lastSync?: Date | null;
}

type Tab = 'content' | 'instruction' | 'appearance' | 'stats';
type SubTab = 'master' | 'voice';

const themes = [
  { id: 'blue', name: 'Droit Administratif (Bleu)', class: 'bg-blue-600' },
  { id: 'emerald', name: 'Libertés Fondamentales (Vert)', class: 'bg-emerald-600' },
  { id: 'indigo', name: 'Droit International (Indigo)', class: 'bg-indigo-600' },
  { id: 'rose', name: 'Droit Public Toulousain (Rose Brique)', class: 'bg-[#ad5c51]' },
  { id: 'amber', name: 'Droit Fiscal (Ambre)', class: 'bg-amber-600' },
];

export const CourseEditor: React.FC<CourseEditorProps> = ({
  initialContent,
  onSaveContent,
  initialVoiceSummary,
  onSaveVoiceSummary,
  initialInstruction,
  onSaveInstruction,
  initialVoiceInstruction,
  onSaveVoiceInstruction,
  initialThemeColor,
  onSaveThemeColor,
  onResetAll,
  profiles,
  onRefreshProfiles,
  lastSync
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('master');

  const [content, setContent] = useState(initialContent);
  const [voiceSummary, setVoiceSummary] = useState(initialVoiceSummary);
  const [instruction, setInstruction] = useState(initialInstruction);
  const [voiceInstruction, setVoiceInstruction] = useState(initialVoiceInstruction);
  const [themeColor, setThemeColor] = useState(initialThemeColor);

  useEffect(() => {
    if (content === initialContent) return;
    const timer = setTimeout(() => onSaveContent(content), 1000);
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (voiceSummary === initialVoiceSummary) return;
    const timer = setTimeout(() => onSaveVoiceSummary(voiceSummary), 1000);
    return () => clearTimeout(timer);
  }, [voiceSummary]);

  useEffect(() => {
    if (instruction === initialInstruction) return;
    const timer = setTimeout(() => onSaveInstruction(instruction), 1000);
    return () => clearTimeout(timer);
  }, [instruction]);

  useEffect(() => {
    if (voiceInstruction === initialVoiceInstruction) return;
    const timer = setTimeout(() => onSaveVoiceInstruction(voiceInstruction), 1000);
    return () => clearTimeout(timer);
  }, [voiceInstruction]);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full transition-colors pb-10">

      {/* Tabs Header */}
      <div className="flex items-center gap-1 mb-0 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => setActiveTab('content')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'content' ? 'bg-white dark:bg-slate-900 text-blue-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Book size={18} /><span>Savoir (Cours)</span>
        </button>
        <button onClick={() => setActiveTab('instruction')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'instruction' ? 'bg-white dark:bg-slate-900 text-purple-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Bot size={18} /><span>IA (Instructions)</span>
        </button>
        <button onClick={() => setActiveTab('appearance')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'appearance' ? 'bg-white dark:bg-slate-900 text-emerald-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Palette size={18} /><span>Apparence</span>
        </button>
        <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'stats' ? 'bg-white dark:bg-slate-900 text-amber-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Trophy size={18} /><span>Tableau de bord</span>
        </button>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-b-xl rounded-tr-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-hidden">

        {/* Sub-Tabs Selector (Shared for Content and Instruction) */}
        {(activeTab === 'content' || activeTab === 'instruction') && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start mb-4">
            <button onClick={() => setActiveSubTab('master')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'master' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}><MessageSquare size={14} /> TEXTE</button>
            <button onClick={() => setActiveSubTab('voice')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'voice' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#ad5c51]' : 'text-slate-500'}`}><Mic size={14} /> ORAL</button>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="flex-1 flex flex-col space-y-2">
            {activeSubTab === 'master' ? (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Ce texte sera utilisé pour le chat textuel. Pas de limite de taille stricte.</p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
                  placeholder="Collez ici l'intégralité de vos cours..."
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Indispensable pour le Mode Oral. Résumez les points clés (max 150ko).</p>
                <textarea
                  value={voiceSummary}
                  onChange={(e) => setVoiceSummary(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad5c51]/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-[#fff5f4] dark:bg-slate-950"
                  placeholder="Résumez l'essentiel pour la conversation orale..."
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'instruction' && (
          <div className="flex-1 flex flex-col space-y-2">
            {activeSubTab === 'master' ? (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Consignes de comportement pour l'assistant textuel.</p>
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200">
                <p className="text-xs text-slate-500 mb-2 italic">Consignes pour l'oral (ex: renvoi vers le texte en cas de question complexe).</p>
                <textarea
                  value={voiceInstruction}
                  onChange={(e) => setVoiceInstruction(e.target.value)}
                  className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ad5c51]/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-[#fff5f4] dark:bg-slate-950"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setThemeColor(t.id); onSaveThemeColor(t.id); }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${themeColor === t.id ? 'border-slate-900 dark:border-white ring-2 ring-slate-400/20 shadow-md' : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${t.class} shadow-inner`}></div>
                  <span className={`text-sm font-medium ${themeColor === t.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{t.name}</span>
                  {themeColor === t.id && <Check size={16} className="ml-auto text-slate-900 dark:text-white" />}
                </button>
              ))}
            </div>
            <div className="pt-8 mt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Zone de danger</h4>
              <p className="text-xs text-slate-500 mb-4">Si vous avez fait trop de modifications et souhaitez revenir au cours d'origine du Professeur Coulibaly.</p>
              <button
                onClick={onResetAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 transition-all active:scale-95"
              >
                <RefreshCw size={16} />
                Réinitialiser Ada (Paramètres d'usine)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Suivi des Étudiants</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-slate-500">Aperçu anonymisé des performances de la promotion.</p>
                  {lastSync && (
                    <span className="text-[10px] text-slate-400 italic">
                      Dernière synchro : {lastSync.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onRefreshProfiles}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all active:scale-95"
                  title="Rafraîchir les données depuis le Cloud"
                >
                  <RefreshCw size={14} className={lastSync ? "" : "animate-spin"} />
                  Rafraîchir
                </button>
                <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-600 block uppercase tracking-wider">Moyenne Globale</span>
                  <span className="text-xl font-black text-amber-700">
                    {(() => {
                      const allScores = profiles.flatMap(p => p.scores).filter(s => s.total > 0);
                      if (allScores.length === 0) return '0%';
                      const sumPoints = allScores.reduce((acc, s) => acc + s.score, 0);
                      const sumTotal = allScores.reduce((acc, s) => acc + s.total, 0);
                      return `${Math.round((sumPoints / sumTotal) * 100)}%`;
                    })()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950 z-10">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Étudiant / Pseudo</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Identifiant Unique</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-center">Tests</th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 text-right">Moyenne Sc.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {profiles.filter(p => p.name !== 'Visiteur').map((p) => {
                    const validScores = p.scores.filter((s: any) => s.total > 0);
                    const avg = validScores.length > 0
                      ? Math.round((validScores.reduce((acc: number, s: any) => acc + s.score, 0) / validScores.reduce((acc: number, s: any) => acc + s.total, 0)) * 100)
                      : null;

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                              {p.name.slice(0, 2)}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-slate-500">{p.id}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${validScores.length > 0 ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                            {validScores.length} test(s)
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-bold ${avg !== null ? (avg >= 50 ? 'text-emerald-600' : 'text-amber-600') : 'text-slate-300'}`}>
                            {avg !== null ? `${avg}%` : 'Pas de test'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {profiles.filter(p => p.name !== 'Visiteur').length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-slate-400 italic">
                        Aucun étudiant enregistré pour le moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
