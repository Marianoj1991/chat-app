export function formatMessageTime(createdAt) {
    const now = new Date();
    const msgDate = new Date(createdAt);
    const diffMs = Number(now) - Number(msgDate);
    const diffMinutes = Math.floor(diffMs / 60000);
    // Si es muy reciente (< 1 minuto)
    if (diffMinutes < 1) {
        return 'Ahora';
    }
    // Normalizamos fechas para comparar solo día/mes/año
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const msgDay = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());
    // Si es hoy → mostrar hora
    if (msgDay.getTime() === today.getTime()) {
        return msgDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    // Si es ayer → mostrar "Ayer"
    if (msgDay.getTime() === yesterday.getTime()) {
        return 'Ayer';
    }
    // Si es más viejo → mostrar fecha
    return msgDate.toLocaleDateString();
}
