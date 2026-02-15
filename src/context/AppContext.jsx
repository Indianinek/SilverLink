import { createContext, useContext, useReducer, useCallback, useState } from 'react';
import { initialData } from '../data/mockData';

const AppContext = createContext(null);

function appReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_MEAL': {
            return {
                ...state,
                residents: state.residents.map(r =>
                    r.id === action.residentId
                        ? { ...r, meals: { ...r.meals, [action.mealType]: !r.meals[action.mealType] } }
                        : r
                )
            };
        }
        case 'TOGGLE_ADL': {
            return {
                ...state,
                residents: state.residents.map(r =>
                    r.id === action.residentId
                        ? { ...r, [action.adlType]: !r[action.adlType] }
                        : r
                )
            };
        }
        case 'ADMINISTER_MED': {
            return {
                ...state,
                residents: state.residents.map(r =>
                    r.id === action.residentId
                        ? {
                            ...r,
                            medications: r.medications.map(m =>
                                m.id === action.medId
                                    ? { ...m, administeredAt: new Date().toISOString() }
                                    : m
                            )
                        }
                        : r
                )
            };
        }
        case 'ADD_FEED_ITEM': {
            return {
                ...state,
                familyFeed: [action.item, ...state.familyFeed]
            };
        }
        case 'ADD_INCIDENT': {
            return {
                ...state,
                incidents: [action.incident, ...state.incidents]
            };
        }
        case 'ADD_CHAT_MESSAGE': {
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.message]
            };
        }
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialData);
    const [role, setRole] = useState(null);
    const [selectedSeniorId, setSelectedSeniorId] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2000);
    }, []);

    const toggleMeal = useCallback((residentId, mealType) => {
        dispatch({ type: 'TOGGLE_MEAL', residentId, mealType });
        showToast('Zapisano ✓');
    }, [showToast]);

    const toggleADL = useCallback((residentId, adlType) => {
        dispatch({ type: 'TOGGLE_ADL', residentId, adlType });
        showToast('Zapisano ✓');
    }, [showToast]);

    const administerMed = useCallback((residentId, medId) => {
        dispatch({ type: 'ADMINISTER_MED', residentId, medId });
        showToast('Lek podany ✓');
    }, [showToast]);

    const addFeedItem = useCallback((item) => {
        dispatch({ type: 'ADD_FEED_ITEM', item: { ...item, id: Date.now() } });
        showToast('Wpis dodany ✓');
    }, [showToast]);

    const addIncident = useCallback((incident) => {
        dispatch({ type: 'ADD_INCIDENT', incident: { ...incident, id: Date.now() } });
        showToast('Incydent zapisany ✓');
    }, [showToast]);

    const addChatMessage = useCallback((message) => {
        dispatch({ type: 'ADD_CHAT_MESSAGE', message: { ...message, id: Date.now() } });
    }, []);

    return (
        <AppContext.Provider value={{
            ...state,
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
