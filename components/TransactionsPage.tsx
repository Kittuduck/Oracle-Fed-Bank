import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, Search, Filter, ArrowUpRight, ArrowDownLeft, CreditCard, Zap, Smartphone, TrendingUp, Wallet, Receipt, Users, Heart, GraduationCap, Briefcase, Home, Coffee, Globe, AlertTriangle, FileText, BarChart3, PiggyBank, Target, ShoppingCart, Flame, Music, ShieldCheck, ScanLine } from 'lucide-react';
import { PersonaProfile, PersonaTransaction } from '../data/personas';

interface TransactionsPageProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    persona: PersonaProfile | null;
}

const iconMap: Record<string, any> = {
    CreditCard, Zap, Smartphone, TrendingUp, Wallet, Receipt, Users, Heart,
    GraduationCap, Briefcase, Home, Coffee, Globe, AlertTriangle, FileText,
    BarChart3, PiggyBank, Target, ShoppingCart, Flame, Music, ShieldCheck, ScanLine,
    ArrowUpRight, ArrowDownLeft
};

const TransactionsPage: React.FC<TransactionsPageProps> = ({ onBack, isDarkMode, toggleTheme, persona }) => {
    const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const transactions = persona?.transactions || [];

    const filtered = transactions.filter(tx => {
        const matchesFilter = filter === 'all' || tx.type === filter;
        const matchesSearch = searchQuery === '' || tx.name.toLowerCase().includes(searchQuery.toLowerCase()) || tx.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalCredit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
    const totalDebit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'}`}>
            <div className="bg-transparent min-h-screen font-sans">
                <nav className="sticky top-0 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl z-50 border-b border-[#E0E0E0] dark:border-zinc-800 transition-colors">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full hover:bg-[#F6F6F6] dark:hover:bg-slate-800/50 transition-colors">
                                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <span className="font-semibold text-lg text-[#333333] dark:text-white">Transactions</span>
                        </div>
                        <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-6 py-6 space-y-6 pb-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <ArrowDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Money In</span>
                            </div>
                            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">+₹{totalCredit.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <ArrowUpRight className="w-4 h-4 text-red-500 dark:text-red-400" />
                                <span className="text-xs font-medium text-red-600 dark:text-red-400">Money Out</span>
                            </div>
                            <p className="text-lg font-bold text-red-600 dark:text-red-300">-₹{totalDebit.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#F6F6F6] dark:bg-[#15161a] border border-[#E0E0E0] dark:border-zinc-800 rounded-xl text-sm text-[#333333] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-federalblue-500/30 focus:border-federalblue-500 transition-all"
                        />
                    </div>

                    <div className="flex gap-2">
                        {(['all', 'credit', 'debit'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${filter === f
                                    ? 'bg-federalblue-900 dark:bg-white text-white dark:text-federalblue-900 border-federalblue-900 dark:border-white'
                                    : 'bg-white dark:bg-[#15161a] text-slate-500 dark:text-slate-400 border-[#E0E0E0] dark:border-zinc-800 hover:border-federalblue-500'
                                }`}
                            >
                                {f === 'all' ? 'All' : f === 'credit' ? 'Income' : 'Expenses'}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        {filtered.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No transactions found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#E0E0E0] dark:divide-zinc-800">
                                {filtered.map((tx) => {
                                    const TxIcon = iconMap[tx.icon] || Receipt;
                                    return (
                                        <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F9F9F9] dark:hover:bg-zinc-800/30 transition-colors">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-100 dark:bg-zinc-800'}`}>
                                                <TxIcon className={`w-5 h-5 ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-zinc-400'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-[#333333] dark:text-white truncate">{tx.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[11px] text-slate-400 dark:text-zinc-500">{tx.date}</span>
                                                    <span className="text-slate-300 dark:text-zinc-700">·</span>
                                                    <span className="text-[11px] text-slate-400 dark:text-zinc-500">{tx.method}</span>
                                                    <span className="text-slate-300 dark:text-zinc-700">·</span>
                                                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-medium">{tx.category}</span>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold tabular-nums whitespace-nowrap ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#333333] dark:text-zinc-200'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TransactionsPage;
