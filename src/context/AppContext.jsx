import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [residents, setResidents] = useState([]);
    const [familyFeed, setFamilyFeed] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [selectedSeniorId, setSelectedSeniorId] = useState(null);
    const [toast, setToast] = useState(null);

    // Initial Data Fetch
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch residents with medications
                const { data: resData, error: resError } = await supabase
                    .from('residents')
                    .select('*, medications(*)');
                if (resError) throw resError;

                // Map data to camelCase and sort medications
                const mappedResidents = resData.map(r => ({
                    ...r,
                    firstName: r.first_name,
                    lastName: r.last_name,
                    emergencyContact: r.emergency_contact,
                    medications: (r.medications || []).map(m => ({
                        ...m,
                        administeredAt: m.administered_at
                    })).sort((a, b) => a.id - b.id)
                })).sort((a, b) => a.id - b.id);

                setResidents(mappedResidents);

                // Fetch other data
                const { data: feedData } = await supabase.from('family_feed').select('*').order('created_at', { ascending: false });
                const { data: incData } = await supabase.from('incidents').select('*').order('created_at', { ascending: false });
                const { data: chatData } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: true });

                if (feedData) {
                    setFamilyFeed(feedData.map(f => ({
                        ...f,
                        seniorId: f.resident_id,
                        date: f.created_at
                    })));
                }
                if (incData) {
                    setIncidents(incData.map(i => ({
                        ...i,
                        residentId: i.resident_id,
                        date: i.created_at
                    })));
                }
                if (chatData) {
                    setChatMessages(chatData.map(m => ({
                        ...m,
                        senderName: m.sender_name,
                        timestamp: m.created_at
                    })));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                showToast('Błąd pobierania danych');
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        // Optional: Subscribe to Realtime changes (simplified for MVP)
        const subscription = supabase
            .channel('public:all')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'residents' }, () => fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'medications' }, () => fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'family_feed' }, () => fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, () => fetchData())
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const showToast = useCallback((message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2000);
    }, []);

    // Actions
    const toggleMeal = useCallback(async (residentId, mealType) => {
        const resident = residents.find(r => r.id === residentId);
        if (!resident) return;

        const newMeals = { ...resident.meals, [mealType]: !resident.meals[mealType] };

        // Optimistic update
        setResidents(prev => prev.map(r => r.id === residentId ? { ...r, meals: newMeals } : r));

        const { error } = await supabase
            .from('residents')
            .update({ meals: newMeals })
            .eq('id', residentId);

        if (error) {
            console.error('Error updating meal:', error);
            // Revert on error could be implemented here
            showToast('Błąd zapisu');
        } else {
            showToast('Zapisano ✓');
        }
    }, [residents, showToast]);

    const toggleADL = useCallback(async (residentId, adlType) => {
        const resident = residents.find(r => r.id === residentId);
        if (!resident) return;

        const newValue = !resident[adlType];

        // Optimistic update
        setResidents(prev => prev.map(r => r.id === residentId ? { ...r, [adlType]: newValue } : r));

        const { error } = await supabase
            .from('residents')
            .update({ [adlType]: newValue })
            .eq('id', residentId);

        if (error) {
            console.error('Error updating ADL:', error);
            showToast('Błąd zapisu');
        } else {
            showToast('Zapisano ✓');
        }
    }, [residents, showToast]);

    const administerMed = useCallback(async (residentId, medId) => {
        const now = new Date().toISOString();

        // Optimistic update
        setResidents(prev => prev.map(r =>
            r.id === residentId
                ? { ...r, medications: r.medications.map(m => m.id === medId ? { ...m, administeredAt: now } : m) }
                : r
        ));

        const { error } = await supabase
            .from('medications')
            .update({ administered_at: now })
            .eq('id', medId);

        if (error) {
            console.error('Error administering med:', error);
            showToast('Błąd zapisu');
        } else {
            showToast('Lek podany ✓');
        }
    }, [showToast]);

    const addFeedItem = useCallback(async (item) => {
        // Optimistic UI update (using temp ID)
        const tempItem = { ...item, id: Date.now() };
        setFamilyFeed(prev => [tempItem, ...prev]);

        const { data, error } = await supabase
            .from('family_feed')
            .insert([{
                resident_id: item.seniorId,
                content: item.content,
                type: item.type,
                created_at: item.date,
                author: item.author,
                photo_url: item.photoUrl
            }])
            .select();

        if (error) {
            console.error('Error adding feed item:', error);
            showToast('Błąd dodawania wpisu');
        } else {
            // Replace temp item with real one from DB
            setFamilyFeed(prev => [data[0], ...prev.filter(i => i.id !== tempItem.id)]);
            showToast('Wpis dodany ✓');
        }
    }, [showToast]);

    const addIncident = useCallback(async (incident) => {
        // Optimistic UI
        const tempIncident = { ...incident, id: Date.now() };
        setIncidents(prev => [tempIncident, ...prev]);

        const { data, error } = await supabase
            .from('incidents')
            .insert([{
                resident_id: incident.residentId,
                created_at: incident.date,
                description: incident.description,
                severity: incident.severity
            }])
            .select();

        if (error) {
            console.error('Error adding incident:', error);
            showToast('Błąd dodawania incydentu');
        } else {
            setIncidents(prev => [data[0], ...prev.filter(i => i.id !== tempIncident.id)]);
            showToast('Incydent zapisany ✓');
        }
    }, [showToast]);

    const addChatMessage = useCallback(async (message) => {
        // Optimistic UI
        const tempMsg = { ...message, id: Date.now() };
        setChatMessages(prev => [...prev, tempMsg]);

        const { error } = await supabase
            .from('chat_messages')
            .insert([{
                sender: message.sender,
                sender_name: message.senderName,
                content: message.content,
                created_at: message.timestamp
            }]);

        if (error) {
            console.error('Error sending message:', error);
        }
    }, []);

    return (
        <AppContext.Provider value={{
            residents,
            familyFeed,
            incidents,
            chatMessages,
            loading,
            role,
            setRole,
            selectedSeniorId,
            setSelectedSeniorId,
            toast,
            toggleMeal,
            toggleADL,
            administerMed,
            addFeedItem,
            addIncident,
            addChatMessage,
            showToast
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
