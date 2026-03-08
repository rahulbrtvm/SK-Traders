'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    LogOut,
    Users,
    MessageSquare,
    Clock,
    CheckCircle2,
    Filter,
    Download,
    Search,
    MoreVertical,
    Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Lead {
    id: string;
    created_at: string;
    customer_name: string;
    phone: string;
    location: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchLeads();

        // Check auth
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) router.push('/admin/login');
        };
        checkAuth();
    }, [router]);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching leads:', error);
        else setLeads(data || []);
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: Lead['status']) => {
        setUpdating(id);
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) console.error('Error updating status:', error);
        else await fetchLeads();
        setUpdating(null);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const getStatusColor = (status: Lead['status']) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'contacted': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'closed': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white hidden md:flex flex-col">
                <div className="p-8">
                    <div className="flex items-center space-x-3 mb-1">
                        <img src="/logo.png" alt="SK" className="h-10 w-10 object-contain" />
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black text-primary italic tracking-tighter">SK</span>
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em] -mt-1 opacity-60">TRADERS</span>
                        </div>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold ml-[52px]">Management Portal</p>
                </div>



                <nav className="flex-grow px-4 space-y-2">
                    <button className="w-full flex items-center space-x-3 bg-primary text-secondary px-4 py-3 rounded-xl font-bold transition-all">
                        <Users size={20} />
                        <span>Customer Leads</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-bold transition-all">
                        <Download size={20} />
                        <span>Export Data</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-xl font-bold transition-all"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-neutral-200 px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-xl font-bold text-secondary">Customer Leads</h2>
                        <div className="bg-neutral-100 px-3 py-1 rounded-full text-xs font-bold text-secondary/40">
                            {leads.length} Total
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                className="pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
                            />
                        </div>
                        <button className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-secondary hover:bg-neutral-100 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </header>

                <div className="flex-grow overflow-auto p-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Project Info</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Message</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-secondary/40">
                                            <Loader2 className="animate-spin mx-auto mb-4" size={32} />
                                            <p className="font-bold">Loading entries...</p>
                                        </td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-secondary/40">
                                            <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                                            <p className="font-bold">No leads found.</p>
                                        </td>
                                    </tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="font-bold text-secondary">{lead.customer_name}</div>
                                            <div className="text-sm text-neutral-500">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-secondary/70 mb-1">
                                                <Clock size={14} className="mr-2 opacity-40" />
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-secondary/90 italic truncate max-w-[150px]">{lead.location}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm text-secondary/70 line-clamp-2 max-w-xs leading-relaxed" title={lead.message}>
                                                {lead.message || <span className="italic opacity-30">No message provided</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                                {lead.status.toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end space-x-2">
                                                <select
                                                    className="text-xs font-bold bg-neutral-100 border-none rounded-lg px-2 py-1 outline-none cursor-pointer"
                                                    value={lead.status}
                                                    disabled={updating === lead.id}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                                                >
                                                    <option value="new">Mark New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                                <button className="p-2 hover:bg-neutral-100 rounded-lg text-secondary/40">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
    return <Clock className={`animate-spin ${className}`} size={size} />;
}
