'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    LogOut,
    Users,
    MessageSquare,
    Clock,
    Filter,
    Download,
    Search,
    MoreVertical,
    Calendar,
    Menu,
    X,
    Trash2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Lead {
    id: string;
    created_at: string;
    updated_at: string;
    customer_name: string;
    phone: string;
    location: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [updating, setUpdating] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
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

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

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
        
        // Try with updated_at first
        const { error: firstError } = await supabase
            .from('leads')
            .update({ 
                status: newStatus,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        // If 'updated_at' doesn't exist yet (schema cache), fallback to status only
        if (firstError && (firstError.code === 'PGRST204' || firstError.message.includes('updated_at'))) {
            const { error: secondError } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id);
            
            if (secondError) {
                setNotification({ message: 'Failed to update status', type: 'error' });
            } else {
                setNotification({ message: 'Status updated successfully', type: 'success' });
            }
        } else if (firstError) {
            setNotification({ message: 'Failed to update status', type: 'error' });
        } else {
            setNotification({ message: 'Status updated successfully', type: 'success' });
        }

        await fetchLeads();
        setUpdating(null);
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const deleteLead = async (id: string) => {
        if (!id) return;
        setUpdating(id);
        const { error, count } = await supabase
            .from('leads')
            .delete({ count: 'exact' })
            .eq('id', id);

        if (error) {
            setNotification({ message: `Failed to delete: ${error.message}`, type: 'error' });
        } else if (count === 0) {
            setNotification({ message: 'Deletion failed: Permission denied', type: 'error' });
        } else {
            setNotification({ message: 'Lead deleted successfully', type: 'success' });
            await fetchLeads();
        }
        setUpdating(null);
        setDeletingId(null);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const handleExport = () => {
        if (filteredLeads.length === 0) return;

        // CSV Headers
        const headers = ["\"Customer Name\"", "\"Phone Number\"", "\"Location\"", "\"Message\"", "\"Created At\"", "\"Status Updated At\"", "\"Status\""];

        // Format Rows
        const rows = filteredLeads.map(lead => [
            `"${lead.customer_name.replace(/"/g, '""')}"`,
            `"${lead.phone.replace(/"/g, '""')}"`,
            `"${lead.location.replace(/"/g, '""')}"`,
            `"${(lead.message || "No message provided").replace(/"/g, '""')}"`,
            `"${new Date(lead.created_at).toLocaleDateString()}"`,
            `"${new Date(lead.updated_at || lead.created_at).toLocaleString()}"`,
            `"${lead.status.toUpperCase()}"`
        ]);

        // Build CSV String
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        // Create and Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().split('T')[0];

        link.setAttribute("href", url);
        link.setAttribute("download", `SK_Traders_Leads_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row relative">
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative z-50 w-72 h-screen bg-secondary text-white transform transition-transform duration-300 ease-in-out flex flex-col
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/logo.png" alt="SK" className="h-10 w-10 object-contain" />
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black text-primary italic tracking-tighter">SK</span>
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em] -mt-1 opacity-60">TRADERS</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg md:hidden text-white/40"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">Management Portal</p>
                </div>



                <nav className="flex-grow px-4 space-y-2">
                    <button className="w-full flex items-center space-x-3 bg-primary text-secondary px-4 py-3 rounded-xl font-bold transition-all">
                        <Users size={20} />
                        <span>Customer Leads</span>
                    </button>
                    {/* Export placeholder moved to leads page */}
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
                <header className="min-h-20 bg-white border-b border-neutral-200 px-4 md:px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 transition-all">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 -ml-2 hover:bg-neutral-100 rounded-lg md:hidden text-secondary"
                            >
                                <Menu size={24} />
                            </button>
                            <h2 className="text-xl font-bold text-secondary">Customer Leads</h2>
                            <div className="bg-neutral-100 px-3 py-1 rounded-full text-xs font-bold text-secondary/40">
                                {filteredLeads.length} { (searchTerm || statusFilter !== 'all') ? 'Found' : 'Total'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            onClick={handleExport}
                            disabled={filteredLeads.length === 0}
                            className="flex items-center justify-center space-x-2 bg-neutral-100 hover:bg-neutral-200 text-secondary px-4 py-2.5 rounded-xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Download size={18} />
                            <span className="text-sm">Export CSV</span>
                        </button>

                        <div className="relative flex-grow sm:w-64 lg:w-72">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search leads..."
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex items-center space-x-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                            <Filter size={14} className="text-secondary/40" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-transparent text-sm font-bold text-secondary focus:outline-none cursor-pointer py-1 flex-grow"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New leads</option>
                                <option value="contacted">Contacted</option>
                                <option value="closed">Closed cases</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-hidden flex flex-col p-4 md:p-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Location</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Message</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest whitespace-nowrap">Created At</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest whitespace-nowrap">Status Updated At</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-black text-secondary/40 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center text-secondary/40">
                                            <Loader2 className="animate-spin mx-auto mb-4" size={32} />
                                            <p className="font-bold">Loading entries...</p>
                                        </td>
                                    </tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center text-secondary/40">
                                            <Search className="mx-auto mb-4 opacity-20" size={48} />
                                            <p className="font-bold">No matches found for "{searchTerm}"</p>
                                        </td>
                                    </tr>
                                ) : filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="font-bold text-secondary">{lead.customer_name}</div>
                                            <div className="text-sm text-neutral-500">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <ExpandableText text={lead.location} />
                                        </td>
                                        <td className="px-6 py-5">
                                            <ExpandableText text={lead.message} fallback="No message provided" />
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-secondary/70">
                                                <Calendar size={14} className="mr-2 opacity-40" />
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-[10px] text-neutral-400 font-bold ml-6 uppercase">
                                                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-secondary/70">
                                                <Clock size={14} className="mr-2 opacity-40" />
                                                {new Date(lead.updated_at || lead.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-[10px] text-neutral-400 font-bold ml-6 uppercase">
                                                {new Date(lead.updated_at || lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(lead.status)}`}>
                                                {lead.status.toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end space-x-3">
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
                                                <button 
                                                    onClick={() => setDeletingId(lead.id)}
                                                    disabled={updating === lead.id}
                                                    className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors disabled:opacity-30"
                                                    title="Delete Lead"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {deletingId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div 
                            className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
                            onClick={() => setDeletingId(null)}
                        />
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl border border-neutral-100 animate-in zoom-in duration-200">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary text-center mb-2">Delete Lead?</h3>
                            <p className="text-secondary/60 text-center mb-8">This action cannot be undone. Are you sure you want to permanently remove this record?</p>
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => deleteLead(deletingId)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all"
                                >
                                    Delete Permanently
                                </button>
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-secondary font-bold py-3.5 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {notification && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-4 duration-300">
                        <div className={`flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl border ${
                            notification.type === 'success' 
                                ? 'bg-emerald-500 text-white border-emerald-400' 
                                : 'bg-red-500 text-white border-red-400'
                        }`}>
                            {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            <span className="font-bold text-sm tracking-tight">{notification.message}</span>
                            <button 
                                onClick={() => setNotification(null)}
                                className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
    return <Clock className={`animate-spin ${className}`} size={size} />;
}

function ExpandableText({ text, fallback = "N/A" }: { text: string | null, fallback?: string }) {
    const [expanded, setExpanded] = useState(false);
    const content = text || fallback;
    const isLong = content.length > 30;

    return (
        <div className="max-w-[200px] lg:max-w-xs">
            <div 
                className={`text-sm text-secondary/70 leading-relaxed cursor-pointer transition-all ${expanded ? '' : 'truncate'}`}
                onClick={() => isLong && setExpanded(!expanded)}
                title={isLong ? "Click to view more" : ""}
            >
                {content}
            </div>
            {isLong && (
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="text-[10px] font-bold text-primary hover:underline mt-1 uppercase tracking-tighter"
                >
                    {expanded ? 'Show Less' : 'Click to View'}
                </button>
            )}
        </div>
    );
}
